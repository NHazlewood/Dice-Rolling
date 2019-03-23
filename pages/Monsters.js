import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';


export default class Monsters extends React.Component {

  static navigationOptions = {
    title: 'Monsters',
  };

  constructor(props) {
    super(props);
    this.state = {monsterName: 0}
    this.state = {healthDice: 0}
    this.state = {numberOfDice: 0}
    this.state = {healthBonus: 0}
    this.state = {setHealth : 0}
    this.state = {monsterAC: 0}
    this.state = {monstersKey: 0}
    this.state = {monsterList: []}
  }

  componentWillMount(){
    this.setState({monstersKey : 0});
  }

  addNewMonster = () =>{
    var newMonster
    if(this.state.setHealth){
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
    var monsters = this.state.monsterList;
    monsters.push(newMonster);
    monsters.sort();
    this.setState({monsterList: monsters});
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

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Text>Monster Name:</Text>
          <TextInput
            ref={input1 => { this.textInput1 = input1}}
            placeholder="___"
            onChangeText={(monsterName) => this.setState({monsterName})}
          />
          <Text>AC:</Text>
          <TextInput
            ref={input2 => { this.textInput2 = input2}}
            placeholder="___"
            onChangeText={(monsterAC) => this.setState({monsterAC})}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Health:</Text>
          <TextInput
            ref={input3 => { this.textInput3 = input3}}
            placeholder="___"
            onChangeText={(setHealth) => this.setState({setHealth})}
          />
          <Text> OR  Health dice:</Text>
          <TextInput
            ref={input4 => { this.textInput4 = input4}}
            placeholder="___"
            onChangeText={(healthDice) => this.setState({healthDice})}
          />
          <Text> D</Text>
          <TextInput
            ref={input5 => { this.textInput5 = input5}}
            placeholder="___"
            onChangeText={(numberOfDice) => this.setState({numberOfDice})}
          />
          <Button title= "Add" onPress={() => this.addNewMonster(this)}/>
        </View>
        <View><Text>Load from Bestiary</Text></View>
        <View style={{height: 600}}>
          <ScrollView>
          {this.state.monsterList.map((monster, key)=>(
            <View key={key} style={{flexDirection : 'row'}}>
              <Text>{monster[0]} {monster[1]} / {monster[2]} AC: {monster[3]}</Text>
              <Button color='red' title="Remove" onPress={() => this.removeMonster(monster)}/>
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
  TextInput: {
    height: 40,
  },
});