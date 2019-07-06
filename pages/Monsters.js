import React from 'react'
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image, ImageBackground } from 'react-native'
import DialogInput from 'react-native-dialog-input'
import MonsterAdder from '../components/MonsterAdder.js'
import encounterDB from  '../support classes/encounterDB'
import EncounterTabs from '../components/EncounterTabs.js'


async function asyncSave(ecnounterName, encounterList, saveFunction, callback){
  if(!ecnounterName) return
  await saveFunction(ecnounterName,encounterList).then((values => response = values))
  callback(response)
}

async function asyncLoad(ecnounterName, loadFunction, callback){
  if(!ecnounterName) return
  await loadFunction(ecnounterName).then((values => response = values))
  callback(response)
}

async function asyncDelete(ecnounterName, deleteFunction, callback){
  if(!ecnounterName) return
  await deleteFunction(ecnounterName).then((values => response = values))
  callback(response)
}


export default class Monsters extends React.Component {

  static navigationOptions = {
    title: 'Monsters',
  };

  constructor(props) {
    super(props);
    this.state = {monsterList: []}
    this.state = {savedEncounters: []}
    this.state = {activeTab : 1}
    this.databaseReference = new encounterDB
    this.state = {isSaveVisible: false}
    this.updateMonstersCallback = this.updateMonstersCallback.bind(this)
    this.updateEncountersCallback = this.updateEncountersCallback.bind(this)
    this.tabManager = this.tabManager.bind(this)

  }

  componentWillMount(){
    this.setState({monsterList : []})
    this.setState({activeTab : 1})
    this.setState({savedEncounters : []})
    asyncDelete('LoadAllParties', this.databaseReference.deleteEncounter, this.updateEncountersCallback) //doing this to populate the parities list, hopefully

  }

  addNewMonster = (newMonster) =>{
    var monsters = this.state.monsterList
    monsters.push(newMonster)
    monsters.sort()
    this.setState({monsterList: monsters})
  }

  removeMonster = (entry) => {
    var monsters = this.state.monsterList
    for (i =0; i< monsters.length;++i){
      if(monsters[i][4] == entry[4]){
        monsters.splice(i,1)
        this.setState({monserList: monsters})
        return
      }
    }
  }

  tabManager (mode) {
    this.setState({activeTab: mode})
  }

  save () {
    this.setState({isSaveVisible : true})
  }

  updateMonstersCallback (newMonsters){
    newMonsters.sort((a,b) => {return b[0]-a[0]});
    this.setState({monsterList : newMonsters})
  }

  updateEncountersCallback (newEncounters){ 
    this.setState({savedEncounters : newEncounters})
    this.setState({isSaveVisible : false})
  }

  render() {
    return (
      <ImageBackground source={require('../assets/backgroundInitiative.png')} style={styles.container}>
        <View style = {styles.upper}>          
          <DialogInput isDialogVisible={this.state.isSaveVisible}
            title={"Save as New"}
            message={"Enter Encounter Name"}
            hintInput ={""}
            submitInput={ (inputText) => {asyncSave(inputText, this.state.monsterList, this.databaseReference.saveEncounter, this.updateEncountersCallback)}}
            closeDialog={ () => {this.setState({isSaveVisible : false})}}>
          </DialogInput>

          <MonsterAdder callback={this.addNewMonster} />
          <EncounterTabs callback={this.tabManager}/>
        </View>
        
        <View style={styles.lower}>
          {(this.state.activeTab) == 1 ?
            <View>
            <View style={styles.topBar}>
              <Text style={styles.name}>Monster</Text>
              <Text style={styles.health}>Health</Text>
              <Text style={styles.ac}>AC</Text>
              <Text style={styles.imageButton}></Text>
            </View>
            <ScrollView style={styles.scrollList}>
              {this.state.monsterList.map((monster, key)=>(
                <View key={key} style={{flexDirection : 'row'}}>
                  <TextInput
                    style = {styles.name}
                    placeholder= {monster[0]}
                    maxLength={24}
                    onChangeText={(updateName) => monster[0] = updateName}
                    placeholderTextColor = 'black'
                  />
                  <View style = {styles.health}>
                  <TextInput
                    style = {styles.text}
                    placeholder= {monster[1].toString()}
                    keyboardType='numeric'
                    maxLength = {2}
                    onChangeText={(updateName) => monster[1] = updateName}
                    placeholderTextColor = 'black'
                  />
                  <Text style = {styles.text}> / </Text>
                  <TextInput
                    style = {styles.text}
                    placeholder= {monster[2].toString()}
                    keyboardType='numeric'
                    maxLength = {2}
                    onChangeText={(updateName) => monster[2] = updateName}
                    placeholderTextColor = 'black'
                  />
                  </View>
                  <TextInput
                    style = {styles.ac}
                    placeholder= {monster[3].toString()}
                    keyboardType='numeric'
                    maxLength = {2}
                    onChangeText={(updateName) => monster[3] = updateName}
                    placeholderTextColor = 'black'
                  />
                  <TouchableHighlight style={styles.imageButton} onPress={() => this.removeMonster(monster)}>
                    <Image source={require('../assets/minusSlim.png')}/>
                  </TouchableHighlight>
                </View>)
              )}            
            </ScrollView>
          </View>
        :
          <View>
            <View style={styles.topBar}>
              <Text style={styles.name}>Saved Ecnounters</Text>
            </View>
            <ScrollView style = {styles.scrollList}>
              {this.state.savedEncounters.map((item, key)=>(
                <View key={key} style={{flexDirection : 'row'}}>
                  <Text style={styles.name}>{item[0]}</Text>
                  <TouchableHighlight style={styles.imageButton} onPress={() => asyncDelete(item[0], this.databaseReference.deleteEncounter, this.updateEncountersCallback)}>
                    <Text>Remove</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.imageButton} onPress={() => asyncLoad(item[0], this.databaseReference.loadEncounter, this.updateMonstersCallback)}>
                    <Text>Load</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.imageButton} onPress={() => asyncSave(item[0], this.state.monsterList, this.databaseReference.saveEncounter, this.updateEncountersCallback)}>
                    <Text>Save</Text>
                  </TouchableHighlight>
                </View>
              ))}
            </ScrollView>
          </View>
        }  
      </View>

        <View style={{flexDirection: 'row'}}>
          <Button title="Clear" onPress={() => {this.setState({monsterList : []})}}/>
          <Button title="Save as New" onPress={() => this.save()}/>
        </View>  
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  ac: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 16,
    padding: 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  health: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 16,
    padding: 2,
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 2,
    alignItems: 'center',
  },
  lower :{
    flex: 5,
    flexDirection : 'column-reverse',
    justifyContent: 'flex-end',
    width: 350,
  },
  name: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 16,
    padding: 2,
  },
  text: {
    fontSize: 16,
    padding: 5,
  },
  topBar:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  scrollList : {
    padding: 5,

  },
  upper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
    flexDirection : 'column',
  },  
});