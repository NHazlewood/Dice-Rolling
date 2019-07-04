import React from 'react';

import { SQLite } from 'expo';

const encounters = SQLite.openDatabase('encounters.db');

async function saveEncounterManager(encounterName,monsterList){
    await removeEncounter(encounterName)
    await addNewEncounter(encounterName)
    await addMonsters(encounterName, monsterList)

    return await getEncounters()
}

async function addNewEncounter(encounterName){
    return new Promise ((resolve, reject) =>
        encounters.transaction(tx => {
            tx.executeSql(
                'INSERT INTO EncounterList (EncounterName) VALUES (?)',
                [encounterName],
                (tx,results) => {resolve()},
                (tx,results) => {console.log('Failure on addNewEncounter ' + results); reject()}
            )
        })
    )
}

async function addMonsters(encounterName, monsterList){
    return new Promise((resolve, reject) =>
        encounters.transaction(tx => {
            tx.executeSql(
                'SELECT EncounterID as ID FROM EncounterList WHERE EncounterName = ?',
                [encounterName],
                (tx,results) => {
                    monsterList.map((monster,key) =>(
                        encounters.transaction(tx => {
                            tx.executeSql(
                                'INSERT INTO MonsterList (MonsterName, AC, CurrentHP, MaxHP, EncounterID) VALUES (?,?,?,?,?)',
                                [monster[0],monster[1],monster[2],monster[3],results.rows.item(0).ID],
                                (tx, results)=>{resolve()},
                                (tx, results)=>{console.log('Failure on addMonsters ' + results); reject()}
                            )
                        })
                    ))
                },
                (tx,results) => {console.log('Failure on addMonsters' + results); reject()}
            )
        })
    )
}

async function removeEncounterManger(encounterName){
    await removeEncounter(encounterName)
    return await getEncounters()
}

async function removeEncounter(encounterName){
    return new Promise ((resolve, reject) =>
        encounters.transaction(tx => {
            tx.executeSql(
                'DELETE FROM EncounterList WHERE EncounterName = ?',
                [encounterName],
                (tx,results) => {resolve()},
                (tx,results) => {console.log('Failure on delete ' + results); reject()}
            )
        })
    )
}

async function loadManager(encounterName){
    return new Promise ((resolve, reject) =>
        encounters.transaction(tx => {
            tx.executeSql(
                'SELECT * ' +
                'FROM MonsterList ML, (' + 
                    'SELECT EncounterID as ID ' + 
                    'FROM EncounterList ' +
                    'WHERE EncounterName = ?' +
                    ') Encounter ' +
                'WHERE ML.EncounterID = Encounter.ID',
                [encounterName],
                (tx,results) => {
                    var monsters = [];
                    var monster = [];
                    for(var i=0; i < results.rows.length;++i){
                        monster = [results.rows.item(i).MonsterName, results.rows.item(i).AC, results.rows.item(i).CurrentHP, results.rows.item(i).MaxHP,results.rows.item(i).MonsterID]
                        monsters.push(monster)
                    }
                    monsters.sort()
                    resolve(monsters)
                },
                (tx,results) => {console.log('Failure on loadManager  ' + results);reject()},
            )
        })
    )
}

async function getEncounters(){
    return new Promise ((resolve, reject) =>
        encounters.transaction(tx => {
            tx.executeSql(
                'SELECT EncounterName FROM EncounterList',
                [],
                (tx,results) => {
                    var encounters = [];
                    var encounter = '';
                    for(var i=0; i < results.rows.length;++i){
                        encounter = [results.rows.item(i).EncounterName]
                        encounters.push(encounter)
                    }
                    encounters.sort()
                    resolve(encounters)},
                (tx,results) => {console.log('Failure on getEncounters ' + results); reject()}
            )
        })
    )
}

export default class encountersDB {
    constructor (){
        ///*
        encounters.transaction(tx => {
            tx.executeSql(
                'DROP TABLE EncounterList;'
            )
        })
        encounters.transaction(tx => {
            tx.executeSql(
                'DROP TABLE MonsterList;'
            )
        })
        //*/
        encounters.transaction(tx => {
            tx.executeSql(
                'create table if not exists EncounterList (EncounterID INTEGER primary key AUTOINCREMENT, EncounterName VARCHAR Unique);'
            )
        })
        encounters.transaction(tx => {
            tx.executeSql(
                'create table if not exists MonsterList (MonsterID INTEGER primary key AUTOINCREMENT, EncounterID INTEGER, MonsterName VARCHAR, AC INTEGER, CurrentHP INTEGER, MaxHP INTEGER, FOREIGN KEY ( EncounterID ) REFERENCES EcnounterList ( EncounterID ));'
            )
        })
    }

    saveEncounter(encounterName, encounter){
        return new Promise ((resolve, reject) =>
            resolve(saveEncounterManager(encounterName, encounter))
        )
    }


    loadEncounter(encounterName){
        return new Promise ((resolve, reject) =>
            resolve(loadManager(encounterName))
        )
    }

    deleteEncounter(encounterName){
        return new Promise ((resolve, reject) =>
            resolve(removeEncounterManger(encounterName))       
        )
    }

    async getMonsterIndex(){
        return new Promise ((resolve,reject) =>
            encounters.transaction(tx => {
                tx.executeSql(
                    'SELECT MAX(MonsterID) AS ID FROM MonsterList;', 
                    [],
                    (tx, results) => { resolve(results.rows.item(0).ID)},
                    () => {console.log("ID error")}
                )
            })        
        )
    }
}