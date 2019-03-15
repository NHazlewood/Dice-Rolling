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
    this.state = {outText : ''};
  }

  rollDice = () => {
    var newText = ''; 
    for(i=0;i<this.state.numberOfAttacks;++i){
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
  }

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
            <Text> {this.state.outText} </Text>
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