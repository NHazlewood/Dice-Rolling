import React from 'react';

import { SQLite } from 'expo';

const parties = SQLite.openDatabase('parties.db');

async function savePartyManager(teamName,team){
    await removeParty(teamName)
    await addNewParty(teamName)
    await addMembers(teamName, team)

    return await getParties()
}

async function addNewParty(teamName){
    return new Promise ((resolve, reject) =>
        parties.transaction(tx => {
            tx.executeSql(
                'INSERT INTO PartyList (PartyName) VALUES (?)',
                [teamName],
                (tx,results) => {resolve()},
                (tx,results) => {console.log('Failure on adding team ' + results); reject()}
            )
        })
    )
}

async function addMembers(teamName, team){
    return new Promise((resolve, reject) =>
        parties.transaction(tx => {
            tx.executeSql(
                'SELECT PartyID as ID FROM PartyList WHERE PartyName = ?',
                [teamName],
                (tx,results) => {
                    team.map((character,key) =>(
                        parties.transaction(tx => {
                            tx.executeSql(
                                'INSERT INTO CharacterList (CharacterName, Initiative, AC, MaxHP, PassivePerception, PartyID) VALUES (?,?,?,?,?,?)',
                                [character[1],character[0],character[2],character[3],character[4],results.rows.item(0).ID],
                                (tx, results)=>{resolve()},
                                (tx, results)=>{console.log('Failure on save ' + results); reject()}
                            )
                        })
                    ))
                },
                (tx,results) => {console.log('Failure on save ' + results); reject()}
            )
        })
    )
}

async function removePartyManger(teamName){
    await removeParty(teamName)
    return await getParties()
}

async function removeParty(teamName){
    return new Promise ((resolve, reject) =>
        parties.transaction(tx => {
            tx.executeSql(
                'DELETE FROM PartyList WHERE PartyName = ?',
                [teamName],
                (tx,results) => {resolve()},
                (tx,results) => {console.log('Failure on delete ' + results); reject()}
            )
        })
    )
}

async function loadManager(teamName){
    return new Promise ((resolve, reject) =>
        parties.transaction(tx => {
            tx.executeSql(
                'SELECT * ' +
                'FROM CharacterList CH, (' + 
                    'SELECT PartyID as ID ' + 
                    'FROM PartyList ' +
                    'WHERE PartyName = ?' +
                    ') Party ' +
                'WHERE CH.PartyID = Party.ID',
                [teamName],
                (tx,results) => {
                    var members = [];
                    var member = [];
                    for(var i=0; i < results.rows.length;++i){
                        member = [results.rows.item(i).Initiative, results.rows.item(i).CharacterName, results.rows.item(i).AC, results.rows.item(i).MaxHP, results.rows.item(i).PassivePerception,results.rows.item(i).CharacterID]
                        members.push(member)
                    }
                    members.sort()
                    resolve(members)
                },
                (tx,results) => {console.log('Failure on load  ' + results);reject()},
            )
        })
    )
}

async function getParties(){
    return new Promise ((resolve, reject) =>
        parties.transaction(tx => {
            tx.executeSql(
                'SELECT PartyName FROM PartyList',
                [],
                (tx,results) => {
                    var parties = [];
                    var party = '';
                    for(var i=0; i < results.rows.length;++i){
                        party = [results.rows.item(i).PartyName]
                        parties.push(party)
                    }
                    parties.sort()
                    resolve(parties)},
                (tx,results) => {console.log('Failure on getParties ' + results); reject()}
            )
        })
    )
}

export default class initiativeDB {
    constructor (){
        /*
        parties.transaction(tx => {
            tx.executeSql(
                'DROP TABLE PartyList;'
            )
        })
        parties.transaction(tx => {
            tx.executeSql(
                'DROP TABLE CharacterList;'
            )
        })
        */
        parties.transaction(tx => {
            tx.executeSql(
                'create table if not exists PartyList (PartyID INTEGER primary key AUTOINCREMENT, PartyName VARCHAR Unique);'
            )
        })
        parties.transaction(tx => {
            tx.executeSql(
                'create table if not exists CharacterList (CharacterID INTEGER primary key AUTOINCREMENT, PartyID INTEGER, CharacterName VARCHAR, Initiative INTEGER, AC INTEGER, MaxHP INTEGER, PassivePerception INTEGER, FOREIGN KEY ( PartyID ) REFERENCES PartyList ( PartID ));'
            )
        })
    }

    saveParty(teamName, team){
        return new Promise ((resolve, reject) =>
            resolve(savePartyManager(teamName, team))
        )
    }


    loadParty(teamName){
        return new Promise ((resolve, reject) =>
            resolve(loadManager(teamName))
        )
    }

    deleteParty(teamName){
        return new Promise ((resolve, reject) =>
            resolve(removePartyManger(teamName))       
        )
    }

    async getCharacterIndex(){
        return new Promise ((resolve,reject) =>
            parties.transaction(tx => {
                tx.executeSql(
                    'SELECT MAX(CharacterID) AS ID FROM CharacterList;', 
                    [],
                    (tx, results) => { resolve(results.rows.item(0).ID)},
                    () => {console.log("ID error")}
                )
            })        
        )
    }


}