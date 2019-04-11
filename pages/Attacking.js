import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image, ImageBackground , Dimensions} from 'react-native';

import AdvantagePicker from '../components/AdvantagePicker.js';

export default class Attacking extends React.Component {

  static navigationOptions = {
    title: 'Dice',
  };

  constructor(props) {
    super(props);
    this.state = {toHitBonus: 0}
    this.state = {damageBonus: 0}
    this.state = {damageDice: 0}
    this.state = {numberOfDice: 0}
    this.state = {numberOfAttacks: 0}
    this.state = {adjustment: 'None'}
    this.state = {outText : []}
  }

  componentWillMount() {
    this.setState({toHitBonus : 0})
    this.setState({damageBonus : 0})
    this.setState({damageDice : 0})
    this.setState({numberOfDice : 0})
    this.setState({numberOfAttacks : 0})
    this.setState({outText : []})
  }

  validateState () {
    if(this.state.toHitBonus == ''){this.setState({toHitBonus : 0})}
    if(this.state.damageBonus == ''){this.setState({damageBonus : 0})}

    if(this.state.damageDice == '' || this.state.damageDice < 1){
      Alert.alert('Error','Invalid dice type',[{text:'Close'}])
      return 0
    }
    if(this.state.numberOfDice == '' || this.state.numberOfDice < 1){
      Alert.alert('Error','Invalid number of dice',[{text:'Close'}])
      return 0
    }
    if(this.state.numberOfAttacks == ''|| this.state.numberOfAttacks < 1){
      Alert.alert('Error','Invalid number of attacks',[{text:'Close'}])
      return 0
    }
    return 1
  }

  rollDice = () => {
    if(!this.validateState()){
      return
    }
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

      newText.push((i+1)) // newText[0] Attack#
      if(this.state.adjustment == 'Disadvantage'){
        if(toHit1 == 20 && toHit2 == 20){
          newText.push("Crit!") // newText[1] crit/fumble
        }
        else {
          if(toHit1 == 1 || toHit2 == 1){
            newText.push("Fumble!") // newText[1] crit/fumble
          }
          else {
            newText.push("") // newText[1] crit/fumble
          }
        }
        newText.push(Math.min(toHit1,toHit2) + this.state.toHitBonus*1) // newText[2] to hit
        newText.push([toHit1,toHit2]) // newText[3] hit dice rolls
        newText.push(this.state.toHitBonus) // newText[4] hit bonus
      }
      else { // Advantage or None
        if(this.state.adjustment == 'Advantage'){
          if(toHit1 == 20 || toHit2 == 20){
            newText.push("Crit!") // newText[1] 
          }
          else {
            if(toHit1 == 1 && toHit2 == 1){
              newText.push("Fumble!") // newText[1] 
            }
            else {
              newText.push("") // newText[1] 
            }
          }
          newText.push(Math.max(toHit1,toHit2) + this.state.toHitBonus*1) // newText[2] 
          newText.push([toHit1,toHit2]) // newText[3] 
          newText.push(this.state.toHitBonus) // newText[4] 
        }
        else{ // None
          if(toHit1 == 20){
            newText.push("Crit!") // newText[1] 
          }
          else {
            if(toHit1 == 1){
              newText.push("Fumble!") // newText[1] 
            }
            else {
              newText.push("") // newText[1]
            }
          }
          newText.push(toHit1 + this.state.toHitBonus*1) // newText[2]
          newText.push(toHit1) // newText[3]
          newText.push(this.state.toHitBonus) // newText[4]
        }
      }
      //handling damage dice
      if(newText[1] == "Crit!"){ damage = damage *2 - this.state.damageBonus*1}
      newText.push(damage) // newText[5] damage
      newText.push(damageDice) // newText[6] damage dice
      newText.push(this.state.damageBonus) // newText[7] damagebonus
      temp.push(newText)
    }
    this.setState({outText : temp})
  }

  adjustmentCallBack = (newAdjustment) => {
    this.setState({adjustment: newAdjustment})
  }

  render() {
    var tableWidth = (((Dimensions.get('window').width) *8) /9)
    var tableHeight = (((Dimensions.get('window').height) *9) /14)
    return (
      <ImageBackground source={require('../assets/background.png')} style={styles.container}>
        <View style = {styles.upper}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}>Bonus to hit: </Text>
            <TextInput
              placeholder="_"
              keyboardType='numeric'
              maxLength = {2}
              onChangeText={(toHitBonus) => this.setState({toHitBonus})}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.text}>Damage:  </Text>
              <TextInput
                placeholder="_"
                keyboardType='numeric'
                maxLength = {2}
                onChangeText={(numberOfDice) => this.setState({numberOfDice})}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.text}>D  </Text>
              <TextInput
                placeholder="_"
                keyboardType='numeric'
                maxLength = {3}
                onChangeText={(damageDice) => this.setState({damageDice})}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', color:'white'}}>
              <Text style={styles.text}>+  </Text>
              <TextInput
                placeholder="_"
                keyboardType='numeric'
                maxLength = {2}
                onChangeText={(damageBonus) => this.setState({damageBonus})}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}> Number of attacks: </Text>
            <TextInput
              placeholder="_"
              keyboardType='numeric'
              maxLength = {2}
              onChangeText={(numberOfAttacks) => this.setState({numberOfAttacks})}
            />
          </View>
          <AdvantagePicker callback={this.adjustmentCallBack}/>
          <TouchableHighlight onPress={() => this.rollDice()}>
              <Image style= {{padding: 5}} source={require('../assets/roll.png')}/>
          </TouchableHighlight>
        </View>
        <View style={styles.lower}>
        <View style={{width: tableWidth,height: tableHeight}}>
        <ScrollView style={styles.scrollingRolls}>
            {this.state.outText.map((item, key)=>(
            <Text key={key} style={[(item[1]) == "Crit!" ? styles.crit : [(item[1]) == "Fumble!" ? styles.fumble : styles.normal ]]} > 
              Attack #: {item[0]} {item[1]} 
              {"\n"}  To Hit {item[2]} ({[!(Array.isArray(item[3])) ? item[3] : item[3].map((item3, key)=>(<Text key={key}>{[(key*1+1 >= item[3].length) ? ", " : ""]}{item3}</Text>))]}) + {item[4]}) 
              {"\n"}  Damage: {item[5]} ({item[6].map((item6, key)=>(<Text key={key}>{item6}{[(key*1+1 < item[6].length) ? "+" : ""]}</Text>))}){[item[1] == "Crit!" ? "x2" : ""]} + {item[7]}) </Text>)
            )}
          </ScrollView>          
        </View>
        </View>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    width : '100%',
    height: '100%',
  },
  crit: {
    borderColor: '#06e83b', //green
    borderWidth: 2,
    padding: 5,
    fontSize: 16,
  },
  fumble : {
    borderColor: 'red',
    borderWidth: 2,
    padding: 5,
    fontSize: 16,
  },
  lower :{
    flexDirection : 'column-reverse',
    justifyContent: 'center',
  },
  normal : {
    borderColor: '#575a5e',
    borderWidth: 2,
    padding: 5,
    fontSize: 16,
  },
  scrollingRolls : {
    
  },
  text: {
    fontSize: 16,
    padding: 5,
  },
  upper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
    flexDirection : 'column',
  },
});