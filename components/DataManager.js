import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image } from 'react-native';
import { SQLite } from 'expo';

const bestiary = SQLite.openDatabase('bestiary.db');

async function addNew (newEntry) {    
    await (
        bestiary.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Monsters (id, name, setHealth, healthDiceNumber, healthDiceType, healthBonus, AC, description) VALUES (?,?,?,?,?,?,?,?)',
                [newEntry[0],newEntry[1],newEntry[2],newEntry[3],newEntry[4],newEntry[5],newEntry[6],newEntry[7]],
                (tx, results)=>{console.log('Success on add' + results.rowsAffected)},
                (tx, results)=>{console.log('Failure on add' + results)}
            )
        })
    )
}

async function retrieveAll () {
    var monsters = []
    var monster = []
    await(
        bestiary.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM Monsters;', [], (tx, results) => {
                for(var i=0; i < results.rows.length;++i){
                  monster = [results.rows.item(i).name, results.rows.item(i).setHealth, results.rows.item(i).healthDiceNumber, results.rows.item(i).healthDiceType, results.rows.item(i).healthBonus, results.rows.item(i).AC, results.rows.item(i).description, results.rows.item(i).id]
                  console.log(monster)
                  monsters.push(monster)
                }
                monsters.sort()
                console.log('Monster success')
              }
              , () => {console.log("Monsters error")}
            )
        })
    )
    return monsters
}

class DataManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {index: 0}
    }

    componentWillMount(){    
        //run this line when changes are made to the structure of the monsters tables to remove the old version of the table
        /*
        bestiary.transaction(tx => {
        tx.executeSql(
            'DROP TABLE Monsters;'
            )
        })
        */
        bestiary.transaction(tx => {
        tx.executeSql(
            'create table if not exists Monsters (id int(10) primary key not null, name varchar(24), setHealth int(4), healthDiceNumber int(2), healthDiceType int(2), healthBonus int(4), AC int(2), description varchar(255));'
            )
        })
        bestiary.transaction(tx => {
            tx.executeSql(
                'SELECT MAX(id) AS id FROM Monsters;', 
                [],
                (tx, result) => {
                if( result.rows.item(0).id > 0){
                    this.setState({index: (result.rows.item(0).id+1)}) 
                }
                else {
                    this.setState({index: 1}) 
                }
                //console.log("ID success: " + result.rows.item(0).id)
                console.log("ID success")
                },
                () => {console.log("ID error")}
            )
        })
    }

    addNewMonster (newEntry){
        addNew(newEntry)
        this.setState({index : (this.state.index + 1)})
        return retrieveAll()
    }

    retrieveMonsters (){
        return retrieveAll()
    }

    getNextIndex (){
        return this.state.index
    }

    render(){
        return null
    }
}

export default DataManager