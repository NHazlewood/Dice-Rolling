import React from 'react';

import { SQLite } from 'expo';

const partyList = SQLite.openDatabase('parties.db');

export default class initiativeDB {
    constructor (){
        partyList.transaction(tx => {
            tx.executeSql(
                'DROP TABLE PartyList;'
            )
        })
        partyList.transaction(tx => {
            tx.executeSql(
                'DROP TABLE CharacterList;'
            )
        })
        partyList.transaction(tx => {
            tx.executeSql(
                'create table if not exists PartyList (PartID INTEGER primary key AUTOINCREMENT, PartyName VARCHAR Unique);'
            )
        })
        partyList.transaction(tx => {
            tx.executeSql(
                'create table if not exists CharacterList (CharacterID INTEGER primary key AUTOINCREMENT, CharacterName VARCHAR, initiative INTEGER, AC INTEGER, MaxHP INTEGER, PassivePerception INTEGER, PartyID Foreign Key References PartyList(PartyID) On Delete Cascade);'
            )
        })
    }

    async saveParty(teamName,team){
        await removeParty(teamName)

        return new Promise ((resolve, reject) =>
            partyList.transaction(tx => {
                tx.executeSql(
                    'SELECT PartyID as ID FROM PartyList WHERE PartyName = ?',
                    [teamName],
                    (tx,results) => {
                        team.map((character,key) =>(
                            partyList.transaction(tx => {
                                tx.executeSql(
                                    'INSERT INTO CharacterList (CharacterName, Initiative, AC, MaxHP, PassivePerception, PartyID) VALUES (?,?,?,?,?,?)',
                                    [character[key][1],character[key][2],character[key][3],character[key][4],character[key][5],results.rows.item(0).ID],
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

    async loadParty(teamName){
        return new Promise ((resolve, reject) =>
            partyList.transaction(tx => {
                tx.executeSql(
                    'SELECT PartyID as ID FROM PartyList WHERE PartyName = ?',
                    [teamName],
                    (tx,results) => {
                        partyList.transaction(tx => {
                            tx.executeSql(
                                'SELECT * FROM CharacterList WHERE PartyID = ?',
                                [results.rows.item(0).ID],
                                (tx,results) => {resolve(results)},
                                (tx,results) => {console.log('Failure on load ' + results);reject()}
                            )
                        })
                    },
                    (tx,results) => {console.log('Failure on load  ' + results);reject()}
                )
            })
        )
    }

    async removeParty(teamName){
        return new Promise ((resolve, reject) =>
            partyList.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM PartyList WHERE PartyName = ?',
                    [teamName],
                    (tx,results) => {resolve()},
                    (tx,results) => {console.log('Failure on delete ' + results);reject()}
                )
            })
        )
    }

    async getCharacterIndex(){
        return new Promise ((resolve,reject) =>
            partyList.transaction(tx => {
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