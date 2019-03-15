import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';

import AdvantagePicker from './components/AdvantagePicker.js';
import Roll from './components/Roll.js';

export default class Attacking extends React.Component {

  static navigationOptions = {
    title: 'Attacking',
  };

  constructor(props) {
    super(props);
    this.state = {toHitBonus: 0};
    this.state = {damageBonus: 0};
    this.state = {damageDice: 0};
    this.state = {numberOfDice: 0};
    this.state = {numberOfAttacks: 0}
    this.state = {adjustment: 'None'}
    this.state = {outText : []};
  }

  rollDice = () => {      
    var temp = []
    for(i=0;i<this.state.numberOfAttacks;++i){
      var newText = [];
      const toHit1 = Math.ceil(Math.random() * 20);
      const toHit2 = Math.ceil(Math.random() * 20);
      var damageDice = [];
      var damage = this.state.damageBonus * 1;
      const toRoll = this.state.numberOfDice;
      for(j=0;j< toRoll; ++j){
        const rand = Math.ceil(Math.random() * this.state.damageDice);
        damageDice.push(rand);
        damage += rand;
      }
      //saving attack #
      newText.push((i+1))
      //handling to hit outcomes
      // 1. check for crits and fumbles
      // 2. calcualte and save hit totals
      // 3. save toHit dice and toHit bonus
      if(this.state.adjustment == 'Disadvantage'){
        if(toHit1 == 20 && toHit2 == 20){
          newText.push("Crit!")
        }
        else {
          if(toHit1 == 1 || toHit2 == 1){
            newText.push("Fumble!")
          }
          else {
            newText.push("")
          }
        }
        newText.push(Math.min(toHit1,toHit2) + this.state.toHitBonus*1)
        newText.push([toHit1,toHit2])
        newText.push(this.state.toHitBonus)
      }
      else { // Advantage or None
        if(this.state.adjustment == 'Advantage'){
          if(toHit1 == 20 || toHit2 == 20){
            newText.push("Crit!")
          }
          else {
            if(toHit1 == 1 && toHit2 == 1){
              newText.push("Fumble!")
            }
            else {
              newText.push("")
            }
          }
          newText.push(Math.max(toHit1,toHit2) + this.state.toHitBonus*1)
          newText.push([toHit1,toHit2])
          newText.push(this.state.toHitBonus)
        }
        else{ // None
          if(toHit1 == 20){
            newText.push("Crit!")
          }
          else {
            if(toHit1 == 1){
              newText.push("Fumble!")
            }
            else {
              newText.push("")
            }
          }
          newText.push(toHit1 + this.state.toHitBonus*1)
          newText.push(toHit1)
          newText.push(this.state.toHitBonus)
        }
      }
      //handling damage dice
      if(newText[1] == "Crit!"){ damage = damage *2 - this.state.damageBonus*1}
      newText.push(damage)
      newText.push(damageDice)
      newText.push(this.state.damageBonus)
      //console.log("Attack #: "+ newText[0] + " special: " + newText[1] + " to hit total: " + newText[2] + " to hit dice(s): " + newText[3] + " to hit bonus: " + newText[4] +
      //" damage total: " + newText[5] + " damage dice(s): " + newText[6] + " damage bonus: " + newText[7])
      temp.push(newText)
    }
    this.setState({outText : temp})
    /*
    for(var i= 0; i < this.state.numberOfAttacks; ++i){
      console.log("Attack #: "+ this.state.outText[i][0] + " special: " + this.state.outText[i][1] + " to hit total: " + this.state.outText[i][2] + 
      " to hit dice(s): " + this.state.outText[i][3] + " to hit bonus: " + this.state.outText[i][4] + " damage total: " + this.state.outText[i][5] + 
      " damage dice(s): " + this.state.outText[i][6] + " damage bonus: " + this.state.outText[i][7])
    }
    */
  }
      /*
      newText += "\nAttack "+ i;
      //Disadvantage
      if(this.state.adjustment == 'Disadvantage'){
        newText += ", Disadvantage";
        if(toHit1 == 20 && toHit2 == 20){
          damage = damage * 2 - this.state.damageBonus * 1
          newText += ": Crit!";
        }
        else if(toHit1 == 1 || toHit2 == 1){
          newText += ": Fumble!";
        }
        const toHitTotal = Math.min(toHit1, toHit2) + (this.state.toHitBonus * 1);
        newText += "\n    To Hit: " + toHitTotal + " ( " + Math.min(toHit1, toHit2) + " ( " + toHit1 + ", " + toHit2+ ") ";
      }
      else{
        //Advantage
        if(this.state.adjustment == 'Advantage'){
          newText += ", Advantage";
          if(toHit1 == 20 || toHit2 == 20){
            damage = damage * 2 - this.state.damageBonus * 1
            newText += ": Crit!";
          }
          else if(toHit1 == 1 && toHit2 == 1){
            newText += ": Fumble!";
          }
          const toHitTotal = Math.max(toHit1, toHit2) + (this.state.toHitBonus * 1);
          newText += "\n    To Hit: " + toHitTotal + " ( " + Math.max(toHit1, toHit2) + " ( " + toHit1 + ", " + toHit2 + ") "
        }
        //None
        else{
          if(toHit1 == 20){
            damage = damage * 2 - this.state.damageBonus * 1
            newText += ": Crit!";
          }
          else if(toHit1 == 1){
            newText += ": Fumble!";
          }
          const toHitTotal = toHit1 + (this.state.toHitBonus * 1);
          newText += "\n    To Hit: " + toHitTotal + " ( " + toHit1;
        } 
      }
      newText += " + " + this.state.toHitBonus + " )" + "\n" +
        "    Damage: "+ damage + " ( " + damageDice + " + " + this.state.damageBonus + " )\n";
    }
    this.setState({outText: newText})
    */

  myCallBack = (newAdjustment) => {
    this.setState({adjustment: newAdjustment})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text> Bonus to hit: </Text>
          <TextInput
            placeholder="___"
            onChangeText={(toHitBonus) => this.setState({toHitBonus})}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text> Bonus to damage: </Text>
          <TextInput
            placeholder="___"
            onChangeText={(damageBonus) => this.setState({damageBonus})}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text> Damage dice: </Text>
          <TextInput
            placeholder="___"
            onChangeText={(damageDice) => this.setState({damageDice})}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text> Number of dice: </Text>
          <TextInput
            placeholder="___"
            onChangeText={(numberOfDice) => this.setState({numberOfDice})}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text> Number of attacks: </Text>
          <TextInput
            placeholder="___"
            onChangeText={(numberOfAttacks) => this.setState({numberOfAttacks})}
          />
        </View>
        <AdvantagePicker callback={this.myCallBack}/>
        <Roll onRoll ={this.rollDice}/>
        <View style= {{ height: 400, width: 350}}>
        <ScrollView>
            {this.state.outText.map((item, key)=>(
            <Text key={key}> Attack #: {item[0]} special: {item[1]} to hit total: {item[2]} 
             to hit dice(s): {item[3]} to hit bonus: {item[4]} damage total: {item[5]} 
             damage dice(s): {item[6]} damage bonus: {item[7]} </Text>)
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