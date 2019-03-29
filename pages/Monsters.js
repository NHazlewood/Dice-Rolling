import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image } from 'react-native';


export default class Monsters extends React.Component {

  static navigationOptions = {
    title: 'Monsters',
  };

  constructor(props) {
    super(props);
    this.state = {monsterName: ''}
    this.state = {healthDice: 0}
    this.state = {numberOfDice: 0}
    this.state = {healthBonus: 0}
    this.state = {setHealth : 0}
    this.state = {monsterAC: 0}
    this.state = {monstersKey: 0}
    this.state = {monsterList: []}
    this.state = {damageOrHealing: 0}
  }

  componentWillMount(){
    this.setState({monsterName : ''});
    this.setState({healthDice: 0});
    this.setState({numberOfDice : 0});
    this.setState({healthBonus : 0});
    this.setState({setHealth : 0});
    this.setState({monsterAC : 0});
    this.setState({monstersKey : 0});
    this.setState({monsterList : []})
  }

  resetState(){
    this.setState({monsterName : ''});
    this.setState({healthDice: 0});
    this.setState({numberOfDice : 0});
    this.setState({healthBonus : 0});
    this.setState({setHealth : 0});
    this.setState({monsterAC : 0});
  }

  validateState () {
    if(this.state.healthBonus == ''){this.setState({healthBonus : 0})}
    if(this.state.setHealth == ''){this.setState({setHealth : 0})}

    if(this.state.monsterName == ''){
      Alert.alert('Error','Monster requires a name',[{text:'Close'}])
      return 0
    }
    if(this.state.monsterAC == '' || this.state.monsterAC < 1){
      Alert.alert('Error','Invalid AC',[{text:'Close'}])
      return 0
    }
    if(this.state.setHealth > 0){
      this.setState({healthDice: 0});
      this.setState({numberOfDice : 0});
      this.setState({healthBonus : 0});
    }
    else {
      if(this.state.healthDice == '' || this.state.healthDice < 1){
        Alert.alert('Error','Invalid dice type',[{text:'Close'}])
        return 0
      }
      if(this.state.numberOfDice == '' || this.state.numberOfDice < 1){
        Alert.alert('Error','Invalid number of dice',[{text:'Close'}])
        return 0
      }
    }
    return 1
  }

  addNewMonster = () =>{
    if(!this.validateState()){
      return
    }
    var newMonster
    if(this.state.setHealth > 0){
      newMonster = [this.state.monsterName, this.state.setHealth, this.state.setHealth, this.state.monsterAC, this.state.monstersKey]
      this.setState({monstersKey : (this.state.monstersKey+1)})
      this.state.setHealth = null
    }
    else{
      var healthTotal = 0
      for(i=0;i<(this.state.numberOfDice*1);++i){
        healthTotal += Math.ceil(Math.random() * this.state.healthDice)
      }
      newMonster = [this.state.monsterName, healthTotal, healthTotal, this.state.monsterAC, this.state.monstersKey*1]
      this.setState({monstersKey : (this.state.monstersKey*1+1)})
    }
    var monsters = this.state.monsterList
    monsters.push(newMonster)
    monsters.sort()
    this.setState({monsterList: monsters})
    this.resetState()
    this.textInput1.clear()
    this.textInput2.clear()
    this.textInput3.clear()
    this.textInput4.clear()
    this.textInput5.clear() 
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

  loadMonster = (entry) => {

  }

  adjustHealth = (entry) => {
    var monsters = this.state.monsterList
    for (i =0; i< monsters.length;++i){
      if(monsters[i][4] == entry[4]){
        monsters[i][1] -= this.state.damageOrHealing
        this.setState({monserList: monsters})
        return
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>Monster Name:</Text>
          <TextInput
            ref={input1 => { this.textInput1 = input1}}
            placeholder="___"
            maxLength = {24}
            onChangeText={(monsterName) => this.setState({monsterName})}
          />
          <Text style={styles.text}>AC:</Text>
          <TextInput
            ref={input2 => { this.textInput2 = input2}}
            placeholder="__"
            keyboardType='numeric'
            maxLength = {2}
            onChangeText={(monsterAC) => this.setState({monsterAC})}
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
          <TouchableHighlight onPress={() => this.addNewMonster(this)}>
            <Image source={require('../assets/plus.png')}/>
          </TouchableHighlight>
        </View>
        <View style={{ height: 600, width: 350}}>
          <ScrollView style={styles.scrollList}>
          {this.state.monsterList.map((monster, key)=>(
            <View key={key} style={{flexDirection : 'row'}}>
              <Text style={styles.name}>{monster[0]}</Text>
              <Text style={styles.health}>{monster[1]} / {monster[2]}</Text>
              <Text style={styles.ac}>AC: {monster[3]}</Text>
              <TouchableHighlight style={styles.imageButton} onPress={() => this.removeMonster(monster)}>
                <Image source={require('../assets/minus.png')}/>
              </TouchableHighlight>
              <TouchableHighlight style={styles.imageButton} onPress={() => this.adjustHealth(monster)}>
                <Image source={require('../assets/heart.png')}/>
              </TouchableHighlight>
             </View>)
          )}            
          </ScrollView>
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
    height: 900,
  },
  text: {
    fontSize: 16,
    padding: 5,
  },
  name: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 16,
    padding: 2,
  },
  ac: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 16,
    padding: 2,
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
  scrollList : {
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 3,
    padding: 5,
    shadowColor: 'black',
  },
  
});