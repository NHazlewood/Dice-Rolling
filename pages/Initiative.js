import React from 'react';
import {Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image } from 'react-native';
import initiativeDB from '../support classes/initiativeDB';
import DialogInput from 'react-native-dialog-input'
import CharacterAdder from '../components/CharacterAdder.js'
import InitiativeTabs from '../components/InitiativeTabs.js'

async function asyncSave(teamName, partyList, saveFunction, callback){
  await saveFunction(teamName,partyList).then((values => response = values))
  callback(response[0],response[1])
}

async function asyncLoad(teamName, loadFunction, callback){
  await loadFunction(teamName).then((values => response = values))
  callback(response[0],response[1])
}

async function asyncDelete(teamName, deleteFunction, callback){
  await deleteFunction(teamName).then((values => response = values))
  callback(response[0],response[1])
}


export default class Initiative extends React.Component {

  static navigationOptions = {
    title: 'Initiative',
  };

  constructor(props) {
    super(props);
    this.state = {initiativeOrder: []}
    this.state = {savedParties: []}
    this.state = {activeTab : 0}
    //this.state = {initiativeKey: 0}
    this.databaseReference = new initiativeDB
    this.state = {teamName: ''}
    this.state = {isSaveVisible: false}
    this.state = {isDeleteVisible: false}
    this.state = {isLoadVisible: false}
    //this.staticCallback = this.staticCallback.bind(this)
    this.updateCallback = this.updateCallback.bind(this)
    this.tabManager = this.tabManager.bind(this)
  }

  componentWillMount(){
    //this.setState({nameToAdd : ''})
    //this.setState({initiativeToAdd: -1})
    //this.setState({initiativeKey : 0})
    //this.setState({ACToAdd: 0})
    //this.setState({HPToAdd: 0})
    //this.setState({passiveToAdd: 0})
    this.setState({teamName:''})
    this.setState({isSaveVisible: false})
    this.setState({isDeleteVisible: false})
    this.setState({isLoadVisible: false})
    this.setState({initiativeOrder : []})
    this.setState({savedParties : []})
    this.setState({activeTab : 0})
  }

  resetState(){
    this.setState({nameToAdd : ''})
    this.setState({initiativeToAdd: -1})
  }

  addNew = (newEntry) =>{
    var orderCopy = this.state.initiativeOrder;
    orderCopy.push(newEntry);
    orderCopy.sort((a,b) => {return b[0]-a[0]});
    this.setState({initiativeOrder: orderCopy});
  }

  removeCharacter = (entry) =>{
    var initList = this.state.initiativeOrder
    for (i =0; i< initList.length;++i){
      if(initList[i][5] == entry[5]){
        initList.splice(i,1)
        this.setState({initiativeOrder: initList})
        return
      }
    }
  }

  tabManager (mode) {
    console.log(mode)
    //mode = 0 show characters, mode = 1 show parties
    // logic bug for displaying have to reserve it
    this.setState({activeTab: mode})
  }

  save () {
    this.setState({isSaveVisible : true})
  }

  load () {
    this.setState({isLoadVisible: true})
  }

  delete () {
    this.setState({isDeleteVisible: true})
  }
/*
  staticCallback () {
    this.setState({isSaveVisible : false})
    this.setState({isDeleteVisible: false})
  }
*/
  updateCallback (newCharacters, newParties){ 
    this.setState({initiativeOrder : newCharacters})
    this.setState({savedParties: newParties})
    this.setState({isLoadVisible: false})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.container}>
          <DialogInput isDialogVisible={this.state.isSaveVisible}
            title={"Save as New"}
            message={"Enter Party Name"}
            hintInput ={""}
            submitInput={ (inputText) => {asyncSave(inputText, this.state.initiativeOrder, this.databaseReference.saveParty, this.updateCallback)}}
            closeDialog={ () => {this.setState({isSaveVisible : false})}}>
          </DialogInput>
          <DialogInput isDialogVisible={this.state.isLoadVisible}
            title={"Load"}
            message={"Enter Party Name"}
            hintInput ={""}
            submitInput={ (inputText) => {asyncLoad(inputText, this.databaseReference.loadParty, this.updateCallback)}}
            closeDialog={ () => {this.setState({isLoadVisible : false})}}>
          </DialogInput>
          <DialogInput isDialogVisible={this.state.isDeleteVisible}
            title={"Delete"}
            message={"Enter Party Name"}
            hintInput ={""}
            submitInput={ (inputText) => {asyncDelete(inputText, this.databaseReference.deleteParty, this.updateCallback)}}
            closeDialog={ () => {this.setState({isDeleteVisible : false})}}>
          </DialogInput>          
          <View style = {styles.upper}>
            <CharacterAdder callback={this.addNew} />
            <InitiativeTabs callback={this.tabManager}/>
          </View>
        </View>

        <View style={styles.lower}>
          {(this.state.activeTab) == 1 ?
            <ScrollView style = {styles.scrollList}>
              {this.state.initiativeOrder.map((item, key)=>(
                <View key={key} style={styles.initiativeItem}>
                  <Text style={styles.number}>Init:{item[0]}</Text>
                  <Text style={styles.word}>{item[1]}</Text>
                  <Text style={styles.number}>AC:{[(item[2] > 0) ? item[2] : ' -']}</Text>
                  <Text style={styles.number}>HP:{[(item[3] > 0) ? item[3] : ' -']}</Text>
                  <Text style={styles.number}>PP:{[(item[4] > 0) ? item[4] : ' -']}</Text>
                  <TouchableHighlight style={styles.imageButton} onPress={() => this.removeCharacter(item)}>
                    <Image source={require('../assets/minusSlim.png')}/>
                  </TouchableHighlight>
                </View>
              ))}
            </ScrollView>
          :
            <ScrollView style = {styles.scrollList}>
              {this.state.savedParties.map((item, key)=>(
                <View key={key} style={styles.initiativeItem}>
                  <Text style={styles.number}>Party:{item}</Text>
                  <TouchableHighlight style={styles.imageButton} onPress={() => asyncDelete(item, this.databaseReference.deleteParty, this.updateCallback)}>
                    <Text>Remove</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.imageButton} onPress={() => asyncLoad(item, this.databaseReference.loadParty, this.updateCallback)}>
                    <Text>Save</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.imageButton} onPress={() => asyncSave(item, this.state.initiativeOrder, this.databaseReference.saveParty, this.updateCallback)}>
                    <Text>Load</Text>
                  </TouchableHighlight>
                </View>
              ))}
            </ScrollView>
          }    
        </View>

        <View style={{flexDirection: 'row'}}>
          <Button title="Clear" onPress={() => {this.setState({initiativeOrder : []})}}/>
          <Button title="Save as New" onPress={() => this.save()}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 1000,
  },
  initiativeItem:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  number: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 16,
    padding: 2,
  },
  lower :{
    flex: 5,
    flexDirection : 'column-reverse',
    width: 350,
  },
  word: {
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
  },
  text: {
    fontSize: 16,
    padding: 5,
  },
  activeScrollList : {
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 3,
    padding: 5,
    shadowColor: 'black',
  },
  inactiveScrollList : {
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 3,
    padding: 5,
    shadowColor: 'black',
  },
  scrollList : {
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 3,
    padding: 5,
    shadowColor: 'black',
  },
  upper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
    flexDirection : 'column',
  },
});