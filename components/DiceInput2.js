import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image, Picker } from 'react-native';

import AdvantagePicker from '../components/AdvantagePicker.js';

class DiceInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {bonus: 0}
        this.state = {diceType: 0}
        this.state = {numberOfDice: 0}
        this.state = {diceColor: 0}
        this.state = {diceList: []}
        this.state = {hitOrDamage: true}
        this.state = {possibleColors: []}
        this.state = {possibleDice: []}
    }

    componentWillMount(){
        this.setState({bonus : 0})
        this.setState({diceType : 4})
        this.setState({numberOfDice : 0})
        this.setState({hitOrDamage : false})
        this.setState({diceColor : 0})
        this.setState({diceList: []})
        this.setState({possibleColors: ['Black','Blue','Green','Purple','Red','White','Yellow']})
        this.setState({possibleDice: ['D4','D6','D8','D12','D20','D100']})
    }

    validateState () {
      
        if(this.state.diceType == 0) this.setState({diceType: 6})
        if(this.state.numberOfDice < 1) return 0
        
        return 1
      }
    
      rollDice = () => {
       //getting all the dice rolls
        diceHolding = []
        damageHolding =[]
        toHitHolding = []
        for (i=0;i<this.state.diceList.length;++i){
          //allocating the bonus
          if(this.state.diceList[i][4]) toHitHolding.push([this.state.diceList[i][3],this.state.diceList[i][2]])
          else damageHolding.push([this.state.diceList[i][3],this.state.diceList[i][2]])

          for(j=0;j<this.state.diceList[i][1];++j){
            //rolling and allocating dice
            temp = Math.ceil(Math.random() * this.state.diceList[i][0])
            if(this.state.diceList[i][4]) toHitHolding.push([temp,this.state.diceList[i][2]])
            else damageHolding.push([temp,this.state.diceList[i][2]])
            diceHolding.push(temp, this.state.diceList[i][0], this.state.possibleColors[this.state.diceList[i][2]]) // roll , type, color
          }
        }
        colorDamageTotal = [0, 0, 0, 0, 0, 0, 0]
        colorToHitTotal = [0, 0, 0, 0, 0, 0, 0]

          for(j=0;j<damageHolding.length;++j){
            colorDamageTotal[damageHolding[j][1]] += damageHolding[j][0]
          }
          for(j=0;j<toHitHolding.length;++j){
            colorToHitTotal[toHitHolding[j][1]] += toHitHolding[j][0]
          }
        temp = []
        temp.push(diceHolding)
        temp.push(colorDamageTotal)
        temp.push(colorToHitTotal)
 
        this.props.callback(temp)
      }

      addDice = () => {
        if(!this.validateState()) return 0

        var newSet = [this.state.diceType,this.state.numberOfDice,this.state.diceColor,parseInt(this.state.bonus), (this.state.hitOrDamage === 'true')]
        var listCopy = this.state.diceList;
        listCopy.push(newSet);
        listCopy.sort((a,b) => {return b[0]-a[0]});
        this.setState({diceList: listCopy});
      }
    
      adjustmentCallBack = (newAdjustment) => {
        this.setState({adjustment: newAdjustment})
      }

      updateDiceType = (newDiceType) => {
        this.setState({diceType : newDiceType})
      }

      updateDiceColor = (newDiceColor) => {
        this.setState({diceColor : newDiceColor})
      }

      updateHitOrDamage = (newBool) => {
        this.setState({hitOrDamage : newBool})
      }

    render () {
        return(
            <View style = {styles.upper}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.Text}>Dice Type: </Text>        
              <Picker  style={{width: 170} } selectedValue = {this.state.diceType} onValueChange = {this.updateDiceType}>
                <Picker.Item label = {this.state.possibleDice[0]} value = '4'/>
                <Picker.Item label = {this.state.possibleDice[1]} value = '6'/>
                <Picker.Item label = {this.state.possibleDice[2]} value = '8'/>
                <Picker.Item label = {this.state.possibleDice[3]} value = '12'/>
                <Picker.Item label = {this.state.possibleDice[4]} value = '20'/>
                <Picker.Item label = {this.state.possibleDice[5]} value = '100'/>
              </Picker>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.Text}>Color: </Text>        
              <Picker  style={{width: 170} } selectedValue = {this.state.diceColor} onValueChange = {this.updateDiceColor}>
                <Picker.Item label = {this.state.possibleColors[0]} value = '0'/>
                <Picker.Item label = {this.state.possibleColors[1]} value = '1'/>
                <Picker.Item label = {this.state.possibleColors[2]} value = '2'/>
                <Picker.Item label = {this.state.possibleColors[3]} value = '3'/>
                <Picker.Item label = {this.state.possibleColors[4]} value = '4'/>
                <Picker.Item label = {this.state.possibleColors[5]} value = '5'/>
                <Picker.Item label = {this.state.possibleColors[6]} value = '6'/>
              </Picker>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>              
              <Text style={styles.Text}>#: </Text>
              <TextInput
                    placeholder="_"
                    keyboardType='numeric'
                    maxLength = {2}
                    onChangeText={(numberOfDice) => this.setState({numberOfDice})}
                />

              <Text style={styles.Text}>Bonus: </Text>
              <TextInput
                placeholder="_"
                keyboardType='numeric'
                maxLength = {3}
                onChangeText={(bonus) => this.setState({bonus})}
              />
      
              <Picker  style={{width: 170} } selectedValue = {this.state.hitOrDamage} onValueChange = {this.updateHitOrDamage}>
                <Picker.Item label = "Damage" value = 'false'/>
                <Picker.Item label = "To Hit" value = 'true'/>
              </Picker>

              
              <TouchableHighlight onPress={() => this.addDice()}>
                <Text>Add</Text>
              </TouchableHighlight> 
            </View>
            <TouchableHighlight onPress={() => this.rollDice()}>
                <Image style= {{padding: 5}} source={require('../assets/roll.png')}/>
            </TouchableHighlight>
          </View>
        )
    }
}

const styles = StyleSheet.create({
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

export default DiceInput