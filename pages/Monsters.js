import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image } from 'react-native';
import DialogInput from 'react-native-dialog-input';


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
    this.state = {targetID: 0}
    this.state = {isHealVisible : false}
    this.state = {isDamageVisible : false}
    this.state = {isTempVisible : false}
    this.state = {adjustType: ''}
  }

  componentWillMount(){
    this.setState({isHealVisible : false})
    this.setState({isDamageVisible : false})
    this.setState({isTempVisible : false})
    this.setState({monsterName : ''})
    this.setState({healthDice: 0})
    this.setState({numberOfDice : 0})
    this.setState({healthBonus : 0})
    this.setState({setHealth : 0})
    this.setState({monsterAC : 0})
    this.setState({monstersKey : 0})
    this.setState({monsterList : []})
  }

  resetState(){
    this.setState({monsterName : ''})
    this.setState({healthDice: 0})
    this.setState({numberOfDice : 0})
    this.setState({healthBonus : 0})
    this.setState({setHealth : 0})
    this.setState({monsterAC : 0})
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

  adjustHealth = (amount) => {
    this.setState({isHealVisible : false})
    this.setState({isDamageVisible : false})
    this.setState({isTempVisible : false})
    var monsters = this.state.monsterList
    for (i =0; i< monsters.length;++i){
      if(monsters[i][4] == this.state.targetID){
        if(this.state.adjustType == 'damage'){
          monsters[i][1] -= amount
        }
        else { 
          monsters[i][1] -= (amount*-1)
          if(this.state.adjustType == 'heal'){
            monsters[i][1] = Math.min(monsters[i][1], monsters[i][2])
          }          
        }
        this.setState({monserList: monsters})
        return
      }
    }
  }

  healMonster = (entry) => {
    this.setState({targetID : entry[4]})
    this.setState({adjustType : 'heal'})
    this.setState({isHealVisible : true})
  }

  damageMonster = (entry) => {
    this.setState({targetID : entry[4]})
    this.setState({adjustType : 'damage'})
    this.setState({isDamageVisible : true})
  }

  temporaryHealthMonster = (entry) => {
    this.setState({targetID : entry[4]})
    this.setState({adjustType : 'temp'})
    this.setState({isTempVisible : true})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.upper}>
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
        </View>
        <DialogInput isDialogVisible={this.state.isDamageVisible}
            title={"Damaging"}
            message={"Input damage amount"}
            textInputProps = {{keyboardType:'numeric'}}
            hintInput ={""}
            submitInput={ (inputText) => {this.adjustHealth(inputText)} }
            closeDialog={ () => {this.setState({isDamageVisible : false})}}>
        </DialogInput>
        <DialogInput isDialogVisible={this.state.isHealVisible}
            title={"Healing"}
            message={"Input healing amount"}
            textInputProps = {{keyboardType:'numeric'}}
            hintInput ={""}
            submitInput={ (inputText) => {this.adjustHealth(inputText)} }
            closeDialog={ () => {this.setState({isHealVisible : false})}}>
        </DialogInput>
        <DialogInput isDialogVisible={this.state.isTempVisible}
            title={"Temporary Health"}
            message={"Input temporary health amount"}
            textInputProps = {{keyboardType:'numeric'}}
            hintInput ={""}
            submitInput={ (inputText) => {this.adjustHealth(inputText)} }
            closeDialog={ () => {this.setState({isTempVisible : false})}}>
        </DialogInput>
        <View style={styles.lower}>
          <ScrollView style={styles.scrollList}>
          {this.state.monsterList.map((monster, key)=>(
            <View key={key} style={{flexDirection : 'row'}}>
              <Text style={styles.name}>{monster[0]}</Text>
              <Text style={styles.health}>{monster[1]} / {monster[2]}</Text>
              <Text style={styles.ac}>AC: {monster[3]}</Text>
              <TouchableHighlight style={styles.imageButton} onPress={() => this.removeMonster(monster)}>
                <Image source={require('../assets/grave.png')}/>
              </TouchableHighlight>
              <TouchableHighlight style={styles.imageButton} onPress={() => this.damageMonster(monster)}>
                <Image source={require('../assets/sword.png')}/>
              </TouchableHighlight>
              <TouchableHighlight style={styles.imageButton} onPress={() => this.healMonster(monster)}>
                <Image source={require('../assets/heart.png')}/>
              </TouchableHighlight>
              <TouchableHighlight style={styles.imageButton} onPress={() => this.temporaryHealthMonster(monster)}>
                <Image source={require('../assets/hourGlass.png')}/>
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