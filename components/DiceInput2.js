import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image } from 'react-native';

import AdvantagePicker from '../components/AdvantagePicker.js';

class DiceInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {bonus: 0}
        this.state = {diceType: 0}
        this.state = {numberOfDice: 0}
        this.state = {diceColor: 0}
        this.state = {diceList: []}
        this.state = {hitOrDamage: false}
        this.state = {outPut: []}
    }

    componentWillMount(){
        this.setState({bonus : 0})
        this.setState({diceType : 0})
        this.setState({numberOfDice : 0})
        this.setState({hitOrDamage : false})
        this.setState({diceColor : 0})
        this.setState({diceList: []})
        this.setState({outPut: []})
    }

    validateState () {
      /*
        if(this.state.bonus == ''){this.setState({bonus : 0})}
    
        if(this.state.diceType == '' || this.state.diceType < 1){
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
        */
        return 1
      }
    
      rollDice = () => {
        /*if(!this.validateState()){
          return
        }
        don't need to validate at this step since we validate when adding dice
        */
       //getting all the dice rolls
        //possibleColors = ['White','Red']
        diceHolding = []
        damageHolding =[]
        toHitHolding = []
        for (i=0;i<diceList.length();++i){
          //allocating the bonus
          if(diceList[i][4]) toHitHolding.push([diceList[i][3],diceList[i][2]])
          else damageHolding.push([diceList[i][3],diceList[i][2]])

          for(j=0;j<diceList[i][1];++j){
            //rolling and allocating dice
            temp = Math.ceil(Math.random() * diceList[i][0])
            if(diceList[i][4]) toHitHolding.push([temp,diceList[i][2]])
            else damageHolding.push([temp,diceList[i][2]])
            diceHolding.push(temp, diceList[i][0], diceList[i][2]) // roll , type, color
          }
        }
        colorDamageTotal = [0 , 0]
        colorToHitTotal = [0 , 0]
        //getting all the totals based on color
        for(i=0;i<possibleColors.length;++i){
          for(j=0;j<damageHolding;++j){
            colorDamageTotal[damageHolding[j][1]] += damageHolding[j][0]
          }
          for(j=0;j<toHitHolding;++j){
            colorToHitTotal[toHitHolding[j][1]] += toHitHolding[j][0]
          }
        }

        this.setState({outPut : [diceHolding,colorDamageTotal,colorToHitTotal]})
      }

      addDice = () => {
        //validate state
        var newSet = [this.state.diceType,this.state.numberOfDice,this.state.diceColor,this.state.bonus, this.state.hitOrDamage]
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
                <Picker.Item label = "D6" value = '6'/>
                <Picker.Item label = "D4" value = '4'/>
              </Picker>

              <Text style={styles.Text}>Color: </Text>        
              <Picker  style={{width: 170} } selectedValue = {this.state.diceColor} onValueChange = {this.updateDiceColor}>
                <Picker.Item label = "White" value = '0'/>
                <Picker.Item label = "Red" value = '1'/>
              </Picker>
              
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