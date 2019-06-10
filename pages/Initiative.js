import React from 'react';
import {Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image } from 'react-native';
import initiativeDB from '../support classes/initiativeDB';
import DialogInput from 'react-native-dialog-input'

async function asyncSave(teamName, partyList, saveFunction, callback){
  await saveFunction(teamName,partyList).then(callback())
}

async function asyncLoad(teamName, loadFunction, callback){
  await loadFunction(teamName).then((values => response = values))
  callback(response)
}

async function asyncDelete(teamName, deleteFunction, callback){
  await deleteFunction(teamName).then(callback())
}


export default class Initiative extends React.Component {

  static navigationOptions = {
    title: 'Initiative',
  };

  constructor(props) {
    super(props);
    this.state = {nameToAdd: ''}
    this.state = {initiativeToAdd: 0}
    this.state = {ACToAdd: 0}
    this.state = {HPToAdd: 0}
    this.state = {passiveToAdd: 0}
    this.state = {initiativeOrder: []}
    this.state = {initiativeKey: 0}
    this.databaseReference = new initiativeDB
    this.state = {teamName: ''}
    this.state = {isSaveVisible: false}
    this.state = {isDeleteVisible: false}
    this.state = {isLoadVisible: false}
    this.staticCallback = this.staticCallback.bind(this)
    this.updateCallback = this.updateCallback.bind(this)
  }

  componentWillMount(){
    this.setState({nameToAdd : ''})
    this.setState({initiativeToAdd: -1})
    this.setState({initiativeKey : 0})
    this.setState({ACToAdd: 0})
    this.setState({HPToAdd: 0})
    this.setState({passiveToAdd: 0})
    this.setState({teamName:''})
    this.setState({isSaveVisible: false})
    this.setState({isDeleteVisible: false})
    this.setState({isLoadVisible: false})
    this.setState({initiativeOrder : []})
  }

  validateState(){
    if(this.state.nameToAdd == ''){
      Alert.alert('Error','New entree requires a name',[{text:'Close'}])
      return 0
    }
    if(this.state.initiativeToAdd == '' || this.state.initiativeToAdd < 0){
      Alert.alert('Error','Invalid initiative',[{text:'Close'}])
      return 0
    }
    return 1
  }

  resetState(){
    this.setState({nameToAdd : ''})
    this.setState({initiativeToAdd: -1})
  }

  addNew = () =>{
    if(!this.validateState()){return}
    const newEntry = [this.state.initiativeToAdd, this.state.nameToAdd,this.state.ACToAdd,this.state.HPToAdd,this.state.passiveToAdd,this.state.initiativeKey];
    this.setState({initiativeKey: (this.state.initiativeKey+1)})
    var orderCopy = this.state.initiativeOrder;
    orderCopy.push(newEntry);
    orderCopy.sort((a,b) => {return b[0]-a[0]});
    this.setState({initiativeOrder: orderCopy});
    this.resetState()
    this.textInput1.clear()
    this.textInput2.clear()
    this.textInput3.clear()
    this.textInput4.clear()
    this.textInput5.clear()
  }

  remove = (entry) =>{
    var initList = this.state.initiativeOrder
    for (i =0; i< initList.length;++i){
      if(initList[i][5] == entry[5]){
        initList.splice(i,1)
        this.setState({initiativeOrder: initList})
        return
      }
    }
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

  staticCallback () {
    this.setState({isSaveVisible : false})
    this.setState({isDeleteVisible: false})
  }

  updateCallback (newList){ 
    this.setState({initiativeOrder : newList})
    this.setState({isLoadVisible: false})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.container}>
          <DialogInput isDialogVisible={this.state.isSaveVisible}
            title={"Save"}
            message={"Enter Party Name"}
            hintInput ={""}
            submitInput={ (inputText) => {asyncSave(inputText, this.state.initiativeOrder, this.databaseReference.saveParty, this.staticCallback)}}
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
            submitInput={ (inputText) => {asyncDelete(inputText, this.databaseReference.deleteParty, this.staticCallback)}}
            closeDialog={ () => {this.setState({isDeleteVisible : false})}}>
          </DialogInput>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}> Name: </Text>
            <TextInput
              ref={input1 => { this.textInput1 = input1 }}
              placeholder="___"
              maxLength={20}
              onChangeText={(nameToAdd) => this.setState({nameToAdd})}
            />
            <Text style={styles.text}> Initiative: </Text>
            <TextInput
              ref={input2 => { this.textInput2 = input2 }}
              keyboardType='numeric'
              maxLength = {2}
              placeholder="___"
              onChangeText={(initiativeToAdd) => this.setState({initiativeToAdd})}
            />
            <Text style={styles.text}> AC: </Text>
            <TextInput
              ref={input3 => { this.textInput3 = input3 }}
              keyboardType='numeric'
              maxLength = {2}
              placeholder="___"
              onChangeText={(ACToAdd) => this.setState({ACToAdd})}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.text}> Max HP: </Text>
            <TextInput
              ref={input4 => { this.textInput4 = input4 }}
              keyboardType='numeric'
              maxLength = {4}
              placeholder="___"
              onChangeText={(HPToAdd) => this.setState({HPToAdd})}
            />
            <Text style={styles.text}> Passive Perception: </Text>
            <TextInput
              ref={input5 => { this.textInput5 = input5 }}
              keyboardType='numeric'
              maxLength = {2}
              placeholder="___"
              onChangeText={(passiveToAdd) => this.setState({passiveToAdd})}
            />
            <TouchableHighlight onPress={() => this.addNew(this)}>
              <Image source={require('../assets/plus.png')}/>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.lower}>
          <ScrollView style={styles.scrollList}>
            {this.state.initiativeOrder.map((item, key)=>(
            <View key={key} style={styles.initiativeItem}>
              <Text style={styles.number}>Init:{item[0]}</Text>
              <Text style={styles.word}>{item[1]}</Text>
              <Text style={styles.number}>AC:{[(item[2] > 0) ? item[2] : ' -']}</Text>
              <Text style={styles.number}>HP:{[(item[3] > 0) ? item[3] : ' -']}</Text>
              <Text style={styles.number}>PP:{[(item[4] > 0) ? item[4] : ' -']}</Text>
              <TouchableHighlight style={styles.imageButton} onPress={() => this.remove(item)}>
                <Image source={require('../assets/minusSlim.png')}/>
              </TouchableHighlight>
            </View>)
            )}
          </ScrollView>
        </View>
        <View style={{flexDirection: 'row'}}>
            <Button title="Save" onPress={() => this.save()}/>
            <Button title="Load" onPress={() => this.load()}/>
            <Button title="Clear" onPress={() => {this.setState({initiativeOrder : []})}}/>
            <Button title="Delete" onPress={() => this.delete()}/>
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