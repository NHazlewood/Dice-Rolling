import React from 'react';

import { SQLite } from 'expo';

const bestiary = SQLite.openDatabase('bestiary.db');

async function addNewManager(newEntry){
    await addNew(newEntry)
    var beasts
    await retrieveAll().then((values) => beasts = values)
    return beasts
}

async function addNew (newEntry) {    
    return new Promise( (resolve,reject) =>
        bestiary.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Bestiary (id, name, setHealth, healthDiceNumber, healthDiceType, healthBonus, AC, description) VALUES (?,?,?,?,?,?,?,?)',
                [newEntry[0],newEntry[1],newEntry[2],newEntry[3],newEntry[4],newEntry[5],newEntry[6],newEntry[7]],
                (tx, results)=>{resolve()},
                (tx, results)=>{console.log('Failure on add ' + results); reject()}
            )
        })
    )
}

async function retrieveAll () {
    return new Promise ((resolve, reject) =>
        bestiary.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Bestiary;',
                [], 
                (tx, results) => {
                    var beasts = [];
                    var beast = [];
                    for(var i=0; i < results.rows.length;++i){
                    beast = [results.rows.item(i).name, results.rows.item(i).setHealth, results.rows.item(i).healthDiceNumber, results.rows.item(i).healthDiceType, results.rows.item(i).healthBonus, results.rows.item(i).AC, results.rows.item(i).description, results.rows.item(i).id]
                    beasts.push(beast)
                    }
                    beasts.sort()
                    resolve(beasts)
                },
                () => {console.log("Retrive all error"); reject()}
            )
        })
    )
}

async function nameSearch (name) {
    return new Promise ((resolve, reject) =>
        bestiary.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Bestiary WHERE name LIKE ?',
                [('%'+name+'%')],
                (tx, results) => {
                    var beasts = [];
                    var beast = [];
                    for(var i=0; i < results.rows.length;++i){
                        beast = [results.rows.item(i).name, results.rows.item(i).setHealth, results.rows.item(i).healthDiceNumber, results.rows.item(i).healthDiceType, results.rows.item(i).healthBonus, results.rows.item(i).AC, results.rows.item(i).description, results.rows.item(i).id]
                        beasts.push(beast)
                    }
                    beasts.sort()
                    resolve(beasts)
                },
                (tx, results) => {console.log("Name search error" + results); reject()}
            )
        })
    )
}

async function removeBeastManager (id){
    await removeBeastAsync(id)
    var beasts
    await retrieveAll().then((values) => beasts = values)
    return beasts
}

async function removeBeastAsync (id) {
    return new Promise ((resolve, reject) =>
        bestiary.transaction(tx => {
            tx.executeSql(
                'DELETE FROM Bestiary WHERE id = ?',
                [id],
                (tx,results) => {resolve()},
                (tx,results) => {console.log('Failure on delete ' + results);reject()}
            )
        })
    )
}

class BestiaryManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {index: 0}
        this.getNextIndex = this.getNextIndex.bind(this)
        this.addNewBeast = this.addNewBeast.bind(this)
    }

    componentWillMount(){    
        //uncommenting this command will drop the bestiary table and each restart
        /*
        bestiary.transaction(tx => {
        tx.executeSql(
            'DROP TABLE Beasts;'
            )
        })
        //*/
        bestiary.transaction(tx => {
        tx.executeSql(
            'create table if not exists Bestiary (id int(10) primary key not null, name varchar(24), setHealth int(4), healthDiceNumber int(2), healthDiceType int(2), healthBonus int(4), AC int(2), description varchar(255));'
            )
        })
        bestiary.transaction(tx => {
            tx.executeSql(
                'SELECT MAX(id) AS id FROM Bestiary;', 
                [],
                (tx, result) => {
                if( result.rows.item(0).id > 0){
                    this.setState({index: (result.rows.item(0).id+1)}) 
                }
                else {
                    this.setState({index: 1}) 
                }
                },
                () => {console.log("ID error")}
            )
        })
    }

    addNewBeast(newEntry){
        this.setState({index : this.state.index + 1})
        return new Promise((resolve, reject) =>
            resolve(addNewManager(newEntry))
        )
    }

    addNewBeastCallback(entries){
        return entries
    }

    retrieveBeasts(){
        return new Promise((resolve, reject) =>
            resolve(retrieveAll())
        )
    }

    getNextIndex (){
        return this.state.index
    }

    removeBeast (id){
        return new Promise((resolve, reject) =>
            resolve(removeBeastManager(id))
        )
    }

    getBeast(name){
        return new Promise ((resolve,reject)=>
            resolve(nameSearch(name))
        )
    }


    render(){
        return null
    }
}

export default BestiaryManager