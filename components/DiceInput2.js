import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image } from 'react-native';

import AdvantagePicker from '../components/AdvantagePicker.js';

class DiceInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {bonus: 0}
        this.state = {diceType: 0}
        this.state = {numberOfDice: 0}
        this.state = {diceList: []}
        this.state = {diceColor: ''}
    }

    componentWillMount(){
        this.setState({bonus : 0})
        this.setState({diceType : 0})
        this.setState({numberOfDice : 0})
        this.setState({diceColor : ''})
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
        if(!this.validateState()){
          return
        }
        
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
              <Picker  style={{width: 170} } selectedValue = {this.state.diceT} onValueChange = {this.updateDiceColor}>
                <Picker.Item label = "Red" value = 'Red'/>
                <Picker.Item label = "White" value = 'White'/>
              </Picker>
              
              <Text style={styles.Text}>#: </Text>

              <Text style={styles.Text}>Bonus: </Text>   
            </View>
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