import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image, Picker } from 'react-native';
import DialogInput from 'react-native-dialog-input'

import AdvantagePicker from './AdvantagePicker.js';

class DiceInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {bonus: 0}
        this.state = {addAttackVisible: false}
        this.state = {diceType: 0}
        this.state = {numberOfDice: 0}
        this.state = {diceColor: 0}
        this.state = {diceList: []}
        this.state = {hitOrDamage: 0}
        //this.state = {possibleColors: []}
        //this.state = {possibleDice: []}
        //this.state = {dice: []}
        //this.state = {bonuses : []}
        
    }

    componentWillMount(){
        this.setState({bonus : 0})
        this.setState({addAttackVisible: false})
        this.setState({diceType : 0})
        this.setState({numberOfDice : 0})
        this.setState({hitOrDamage : 0})
        this.setState({diceColor : 0})
        this.setState({diceList: []})
        
          
    }

    validateState () {
      
      
      }
    
      rollDice = () => {
       
      }

      addDice = () => {
        
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
              <DialogInput isDialogVisible={this.state.addAttackVisible}
                title={"Add new attack"}
                message={"Select attack color"}
                hintInput ={""}
                //submitInput= { }
                closeDialog={ () => {this.setState({addAttackVisible : false})}}>
                  <Picker  style={{width: 170} } selectedValue = {this.state.diceColor} onValueChange = {this.updateDiceColor}>
                    <Picker.Item label = {this.props.possibleColors[0]} value = '0'/>
                    <Picker.Item label = {this.props.possibleColors[1]} value = '1'/>
                    <Picker.Item label = {this.props.possibleColors[2]} value = '2'/>
                    <Picker.Item label = {this.props.possibleColors[3]} value = '3'/>
                    <Picker.Item label = {this.props.possibleColors[4]} value = '4'/>
                    <Picker.Item label = {this.props.possibleColors[5]} value = '5'/>
                </Picker> }
              </DialogInput>

              <Button title="Add attack" onPress={() =>this.setState({addAttackVisible : true})}/>

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
      //backgroundColor : 'blue',
    },
  });

export default DiceInput