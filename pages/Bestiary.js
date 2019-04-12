import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image } from 'react-native';
import BestiaryManager from '../components/BestiaryManager.js';

async function asyncHelper(newEntry, targetFuntion, callback){
  await targetFuntion(newEntry).then((values => response = values))
  callback(response)
}

async function asyncHelperNoArg(targetFuntion, callback){
  await targetFuntion().then((values => response = values))
  callback(response)
}


export default class Bestiary extends React.Component {

  static navigationOptions = {
    title: 'Bestiary',
  };

  constructor(props) {
    super(props);
    this.state = {entries : []}
    this.state = {beastName: ''}
    this.state = {healthDice: 0}
    this.state = {numberOfDice: 0}
    this.state = {healthBonus: 0}
    this.state = {setHealth : 0}
    this.state = {beastAC: 0}
    this.state = {beastDescription: ''}
    this.updateCallback = this.updateCallback.bind(this)
    this.state = {searchName : ''}   
  }

  componentWillMount(){
    this.setState({entries: []})
  }

  validateState () {
    if(this.state.beastName == ''){
      Alert.alert('Error','The beast requires a name',[{text:'Close'}])
      return 0
    }
    if(this.state.beastAC == ''){
      Alert.alert('Error','Invalid AC',[{text:'Close'}])
      return 0
    }
    if(this.state.setHealth == '' || this.state.setHealth < 1){
      Alert.alert('Error','Invalid health',[{text:'Close'}])
      return 0
    }
    if(this.state.numberOfDice == '' || this.state.numberOfDice < 1){
      Alert.alert('Error','Invalid number of dice',[{text:'Close'}])
      return 0
    }    
    if(this.state.healthDice == '' || this.state.healthDice < 1){
      Alert.alert('Error','Invalid dice type',[{text:'Close'}])
      return 0
    }
    if(this.state.healthBonus == '' || this.state.healthBonus < 1){
      Alert.alert('Error','Invalid health bonus',[{text:'Close'}])
      return 0
    }
    return 1
  }

  resetState(){
    this.setState({beastName : ''})
    this.setState({healthDice: 0})
    this.setState({numberOfDice : 0})
    this.setState({healthBonus : 0})
    this.setState({setHealth : 0})
    this.setState({beastAC : 0})
    this.setState({beastDescription : ''})
  }

  addNewBeast() {
    if(!this.validateState()){
      return
    }
    const index = this.databaseReference.getNextIndex()
    const beast = [index, this.state.beastName,this.state.setHealth,this.state.numberOfDice,this.state.healthDice,this.state.healthBonus,this.state.beastAC,this.state.beastDescription]
    asyncHelper(beast, this.databaseReference.addNewBeast, this.updateCallback)
  }

  updateCallback(beasts) {
    this.setState({entries : beasts})    
    this.resetState()
    this.textInput1.clear()
    this.textInput2.clear()
    this.textInput3.clear()
    this.textInput4.clear()
    this.textInput5.clear()
    this.textInput6.clear()
    this.textInput7.clear()
  }

  removeBeast = (entry) => {
    asyncHelper(entry[7], this.databaseReference.removeBeast, this.updateCallback)
  }

  searchBeastNames = () => {
    beast = this.state.searchName
    if(beast == ''){
      asyncHelperNoArg(this.databaseReference.retrieveBeasts, this.updateCallback)
    }
    else {
      asyncHelper(beast, this.databaseReference.getBeast, this.updateCallback)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <BestiaryManager ref={databaseReference => {this.databaseReference = databaseReference}}/>
        <View style={styles.upper}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>Beast's Name:</Text>
            <TextInput
              ref={input1 => { this.textInput1 = input1}}
              placeholder="___"
              maxLength = {24}
              onChangeText={(beastName) => this.setState({beastName})}
            />
            <Text style={styles.text}>AC:</Text>
            <TextInput
              ref={input2 => { this.textInput2 = input2}}
              placeholder="__"
              keyboardType='numeric'
              maxLength = {2}
              onChangeText={(beastAC) => this.setState({beastAC})}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>Health:</Text>
            <TextInput
              ref={input3 => { this.textInput3 = input3}}
              placeholder="___"
              keyboardType='numeric'
              maxLength = {4}
              onChangeText={(setHealth) => this.setState({setHealth})}
            />
            <Text style={styles.text}> OR  Health dice:</Text>
            <TextInput
              ref={input4 => { this.textInput4 = input4}}
              placeholder="__"
              keyboardType='numeric'
              maxLength = {2}
              onChangeText={(numberOfDice) => this.setState({numberOfDice})}
            />
            <Text style={styles.text}> D</Text>
            <TextInput
              ref={input5 => { this.textInput5 = input5}}
              placeholder="__"
              keyboardType='numeric'
              maxLength = {2}
              onChangeText={(healthDice) => this.setState({healthDice})}
            />
            <Text style={styles.text}> + </Text>
            <TextInput
              ref={input6 => { this.textInput6 = input6}}
              placeholder="__"
              keyboardType='numeric'
              maxLength = {4}
              onChangeText={(healthBonus) => this.setState({healthBonus})}
            />
            <TouchableHighlight onPress={() => this.addNewBeast(this)}>
              <Image source={require('../assets/plus.png')}/>
            </TouchableHighlight>
          </View>
          <View><Text style={styles.text}>Descripition:</Text></View>
          <View>
            <TextInput
              ref={input7 => { this.textInput7 = input7}}
              placeholder="__"
              maxLength = {255}
              onChangeText={(beastDescription) => this.setState({beastDescription})}
            />
          </View>
          <View style={{flexDirection : 'row'}}>
            <TextInput
              ref={input8 => { this.textInput8 = input8}}
              placeholder="__"
              maxLength = {24}
              onChangeText={(searchName) => this.setState({searchName})}
            />
            <TouchableHighlight onPress={() => this.searchBeastNames(this)}>
              <Image source={require('../assets/search.png')}/>
            </TouchableHighlight>
          </View>
        </View>
          <View style={styles.lower}>
          <ScrollView style={styles.scrollList}>
          {this.state.entries.map((item, key)=>(
            <View key={key} style={styles.entries}>
              <Text style={styles.text}>{item[0]}</Text>
              <Text style={styles.text}>AC {item[5]}</Text>
              <Text style={styles.text}>Health {item[1]} ({item[2]} d {item[3]} + {item[4]})</Text>
              <View style={{flexDirection : 'row'}}>
                <Text style={styles.text}>Descripition:</Text>
                <TouchableHighlight style={styles.imageButton} onPress={() => this.removeBeast(item)}>
                  <Image source={require('../assets/minusSlim.png')}/>
                </TouchableHighlight>
              </View>
              <Text style={styles.text}>{item[6]}</Text>
            </View>
            ))}                   
          </ScrollView>
        </View>
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  ac: {
    flex: 2,
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
    height: 900,
  },
  entries : {
    borderColor: '#575a5e',
    borderWidth: 2,
    padding: 5,
  },
  health: {
    flex: 2,
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