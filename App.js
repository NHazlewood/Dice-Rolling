import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import Roll from './components/Roll';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {toHitBonus: 0};
    this.state = {damageBonus: 0};
    this.state = {damageDice: 0};
    this.state = {numberOfDice: 0};
    this.state = {numberOfAttacks: 0};
    this.state = {advantage: 0};
    this.state = {outText : ''};
  }

  rollDice = () => {
    const toHit = Math.ceil(Math.random() * 20);
    var damageDice = [];
    var damage = this.state.damageBonus * 1;
    const toRoll = this.state.numberOfDice;
    for(i=0;i< toRoll; ++i){
      const rand = Math.ceil(Math.random() * this.state.damageDice);
      damageDice.push(rand);
      damage += rand;
    }

    const toHitTotal = toHit + (this.state.toHitBonus * 1);
    const newText = "To Hit: " + toHitTotal + " ( " + toHit + " + " + this.state.toHitBonus + " )" + "\n" +
      "Damage: "+ damage + " ( " + damageDice + " + " + this.state.damageBonus + " )";   
    
    this.setState({outText: newText})
    console.log (this.state.outText);

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text> Bonus to hit: </Text>
          <TextInput
            style={{height: 40}}
            placeholder=" "
            onChangeText={(toHitBonus) => this.setState({toHitBonus})}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text> Bonus to damage: </Text>
          <TextInput
            style={{height: 40}}
            placeholder=" "
            onChangeText={(damageBonus) => this.setState({damageBonus})}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text> Damage dice: </Text>
          <TextInput
            style={{height: 40}}
            placeholder=" "
            onChangeText={(damageDice) => this.setState({damageDice})}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text> Number of dice: </Text>
          <TextInput
            style={{height: 40}}
            placeholder=" "
            onChangeText={(numberOfDice) => this.setState({numberOfDice})}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text> Number of attacks: </Text>
          <TextInput
            style={{height: 40}}
            placeholder=" "
            onChangeText={(numberOfAttacks) => this.setState({numberOfAttacks})}
          />
        </View>  
        <Roll onRoll ={this.rollDice}/>
        <Text> {this.state.outText} </Text>
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
  },
});
