import React from 'react';
import {Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image, ImageBackground } from 'react-native';
import initiativeDB from '../support classes/initiativeDB'
import DialogInput from 'react-native-dialog-input'
import CharacterAdder from '../components/CharacterAdder.js'
import InitiativeTabs from '../components/InitiativeTabs.js'

async function asyncSave(teamName, partyList, saveFunction, callback){
  if(!teamName) return
  await saveFunction(teamName,partyList).then((values => response = values))
  callback(response)
}

async function asyncLoad(teamName, loadFunction, callback){
  if(!teamName) return
  await loadFunction(teamName).then((values => response = values))
  callback(response)
}

async function asyncDelete(teamName, deleteFunction, callback){
  if(!teamName) return
  await deleteFunction(teamName).then((values => response = values))
  callback(response)
}


export default class Initiative extends React.Component {

  static navigationOptions = {
    title: 'Initiative',
  };

  constructor(props) {
    super(props);
    this.state = {initiativeOrder: []}
    this.state = {savedParties: []}
    this.state = {activeTab : 1}
    this.databaseReference = new initiativeDB
    this.state = {isSaveVisible: false}
    this.updateCharactersCallback = this.updateCharactersCallback.bind(this)
    this.updatePartiesCallback = this.updatePartiesCallback.bind(this)
    this.tabManager = this.tabManager.bind(this)
  }

  componentWillMount(){
    this.setState({isSaveVisible: false})
    this.setState({initiativeOrder : []})
    this.setState({savedParties : []})
    this.setState({activeTab : 1})
    asyncDelete('LoadAllParties', this.databaseReference.deleteParty, this.updatePartiesCallback) //doing this to populate the parities list, hopefully
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
    this.setState({activeTab: mode})
  }

  save () {
    this.setState({isSaveVisible : true})
  }

  updateCharactersCallback (newCharacters){
    newCharacters.sort((a,b) => {return b[0]-a[0]});
    this.setState({initiativeOrder : newCharacters})
  }

  updatePartiesCallback (newParties){ 
    this.setState({savedParties: newParties})
    this.setState({isSaveVisible : false})
  }

  render() {
    return (
      <ImageBackground source={require('../assets/backgroundInitiativeHD.png')} style={styles.container}>
        <View style = {styles.upper}>
          <DialogInput isDialogVisible={this.state.isSaveVisible}
            title={"Save as New"}
            message={"Enter Party Name"}
            hintInput ={""}
            submitInput={ (inputText) => {asyncSave(inputText, this.state.initiativeOrder, this.databaseReference.saveParty, this.updatePartiesCallback)}}
            closeDialog={ () => {this.setState({isSaveVisible : false})}}>
          </DialogInput>      
            
          <CharacterAdder callback={this.addNew} />
          <InitiativeTabs callback={this.tabManager}/>
        </View>

        <View style={styles.lower}>
          {(this.state.activeTab) == 1 ?
          <View>
            <View style={styles.topBar}>
              <Text style={styles.word}>Name</Text>
              <Text style={styles.number}>Init</Text>
              <Text style={styles.number}>AC</Text>
              <Text style={styles.number}>HP</Text>
              <Text style={styles.number}>PP</Text>
              <Text style={styles.imageButtonBorderless}></Text>
            </View>
            <ScrollView style = {styles.scrollList}>
              {this.state.initiativeOrder.map((item, key)=>(
                <View key={key} style={styles.initiativeItem}>
                  <TextInput
                    style = {styles.word}
                    placeholder= {item[1]}
                    maxLength={24}
                    onChangeText={(updateName) => item[1] = updateName}
                    placeholderTextColor = 'black'
                  />
                  <TextInput
                    style = {styles.number}
                    placeholder={item[0].toString()}
                    keyboardType='numeric'
                    maxLength = {2}
                    onChangeText={(updateInitiative) => item[0] = updateInitiative}
                    placeholderTextColor = 'black'
                  />
                  <TextInput
                    style = {styles.number}
                    placeholder={(item[2] > 0) ? item[2].toString() : '-'}
                    keyboardType='numeric'
                    maxLength = {2}
                    onChangeText={(updateAC) => item[2] = updateAC}
                    placeholderTextColor = 'black'
                  />
                  <TextInput
                    style = {styles.number}
                    placeholder={(item[3] > 0) ? item[3].toString() : '-'}
                    keyboardType='numeric'
                    maxLength = {4}
                    onChangeText={(updateHP) => item[3] = updateHP}
                    placeholderTextColor = 'black'
                  />
                  <TextInput
                    style = {styles.number}
                    placeholder={(item[4] > 0) ? item[4].toString() : '-'}
                    keyboardType='numeric'
                    maxLength = {2}
                    onChangeText={(updatePP) => item[4] = updatePP}
                    placeholderTextColor = 'black'
                  />
                  <TouchableHighlight style={styles.imageButtonBorderless} onPress={() => this.removeCharacter(item)}>
                    <Image source={require('../assets/minusSlim.png')}/>
                  </TouchableHighlight>
                </View>
              ))}
            </ScrollView>
            </View>
          :
            <View>
            <View style={styles.topBar}>
              <Text style={styles.word}>Saved Parties</Text>
            </View>
            <ScrollView style = {styles.scrollList}>
              {this.state.savedParties.map((item, key)=>(
                <View key={key} style={{flexDirection: 'row'}}>
                  <Text style={styles.word}>{item[0]}</Text>
                  <TouchableHighlight style={styles.imageButton} onPress={() => asyncDelete(item[0], this.databaseReference.deleteParty, this.updatePartiesCallback)}>
                    <Text>Remove</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.imageButton} onPress={() => asyncLoad(item[0], this.databaseReference.loadParty, this.updateCharactersCallback)}>
                    <Text>Load</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.imageButton} onPress={() => asyncSave(item[0], this.state.initiativeOrder, this.databaseReference.saveParty, this.updatePartiesCallback)}>
                    <Text>Save</Text>
                  </TouchableHighlight>
                </View>
              ))}
            </ScrollView>
            </View>
          }    
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 5, backgroundColor: 'transparent'}}>
          <TouchableHighlight style = {styles.bottomButton} onPress={() => {this.setState({initiativeOrder : []})}} >
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableHighlight>
          <TouchableHighlight style = {styles.bottomButton} onPress={() => this.save()} >
            <Text style={styles.buttonText}>Save as New</Text>
          </TouchableHighlight>
        </View>
        
        </View>


      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  bottomButton: {
    backgroundColor : 'white',
    borderWidth : 1,
    borderColor: 'black',
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  buttonText: {
    fontSize: 18,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 2,
    borderColor: 'black',
    borderWidth: 1,
  },
  imageButtonBorderless: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 2,
  },
  initiativeItem:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lower :{
    flexDirection : 'column',
    justifyContent: 'flex-start',
    width: '90%',
    height: '75%',
  },
  number: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 16,
    padding: 2,
  },
  scrollList : {
    padding: 5,
    height: '95%',
  },
  text: {
    fontSize: 16,
  },
  topBar:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  upper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '15%',
    width: '90%',
    flexDirection : 'column',
  },
  word: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 16,
    padding: 2,
  },
});