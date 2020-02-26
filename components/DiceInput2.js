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
        this.state = {hitOrDamage: 0}
        //this.state = {possibleColors: []}
        //this.state = {possibleDice: []}
        this.state = {dice: []}
        this.state = {bonuses : []}
    }

    componentWillMount(){
        this.setState({bonus : 0})
        this.setState({diceType : 0})
        this.setState({numberOfDice : 0})
        this.setState({hitOrDamage : 0})
        this.setState({diceColor : 0})
        this.setState({diceList: []})
        //this.setState({possibleColors: ['Black','Blue','Green','Purple','Red','Yellow']})
        //this.setState({possibleDice: ['D4','D6','D8','D12','D20','D100']})
        /* tempA = []
        tempB = []
        tempC = []
        //console.log(this.props.possibleDice)
        //console.log(this.props.possibleColors)
        for(i=0;i<this.props.possibleDice;++i){
          tempA.push(['0','0'])
        }
        for(i=0;i<this.props.possibleColors;++i){
          tempB.push(tempA)
          tempC.push(['0','0'])
        }
        tempA = [0,0] */
        tempB = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
        tempC = [[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
                [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
                [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
                [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
                [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
                [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]]
        this.setState({dice : tempC})
        this.setState({bonuses : tempB})

        //console.log("Dice \n" + tempC + "\n-------------")
        //console.log("Bonses \n" + tempB + "\n-------------")  
    }

    validateState () {
      
        if(this.state.diceType == 0) this.setState({diceType: 0})
        if(this.state.numberOfDice < 1) return 0
        
        return 1
      }
    
      rollDice = () => {
       //getting all the dice rolls
        diceHolding = []
        damageHolding =[]
        toHitHolding = []

        colorDamageTotal = [0, 0, 0, 0, 0, 0]
        colorToHitTotal = [0, 0, 0, 0, 0, 0]

        for(i=0;i<this.props.possibleColors.length;++i){
          //rolling dice
          for(j=0;j<this.props.possibleDice.length;++j){
            //damage dice
            if(dice[i][j][0] > 0){
              for(k=0;k<dice[i][j][0];++k){
                temp = Math.ceil(Math.random() * this.props.possibleDice[j])
                colorDamageTotal[i] = temp + parseInt(colorDamageTotal)
                diceHolding.push([i,temp,k,0])
              }
            }
            //to hit dice
            if(dice[i][j][1] > 0){
              for(k=0;k<dice[i][j][1];++k){
                temp = Math.ceil(Math.random() * this.props.possibleDice[j])
                colorToHitTotal[i] = temp + parseInt(colorToHitTotal)
                diceHolding.push([i,temp,k,1])
              }
            }
          }
          //adding bonuses
          colorDamageTotal = parseInt(colorDamageTotal) + bonuses[i][0]
          colorToHitTotal = parseInt(colorToHitTotal) + bonuses[i][0]

        }

        /*
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
        colorDamageTotal = [0, 0, 0, 0, 0, 0]
        colorToHitTotal = [0, 0, 0, 0, 0, 0]

          for(j=0;j<damageHolding.length;++j){
            colorDamageTotal[damageHolding[j][1]] += damageHolding[j][0]
          }
          for(j=0;j<toHitHolding.length;++j){
            colorToHitTotal[toHitHolding[j][1]] += toHitHolding[j][0]
          }
          */
        temp = []
        //temp.push("Roll")
        temp.push(diceHolding)
        temp.push(colorDamageTotal)
        temp.push(colorToHitTotal)
 
        this.props.callback(temp)
      }

      addDice = () => {
        if(!this.validateState()) return 0

        var newDice = this.state.dice
        var newBonuses = this.state.bonuses

        newDice[this.state.diceColor][this.state.diceType][this.state.hitOrDamage] =  parseInt(this.state.numberOfDice) +  parseInt(newDice[this.state.diceColor][this.state.diceType][this.state.hitOrDamage])
        newBonuses[this.state.diceColor][this.state.hitOrDamage] = parseInt(this.state.bonus) +  parseInt(newBonuses[this.state.diceColor][this.state.hitOrDamage])

        //console.log("Black "+ newDice[0])
        
        //console.log("Old Dice \n" + this.state.dice + "\n-------------")
        //console.log("New Dice \n" + newDice + "\n-------------")

        //console.log("Old Bonuses\n" + this.state.bonuses + "\n-------------")
        //console.log("New Bonuses\n" + newBonuses + "\n-------------")        


        /*var newSet = [this.state.diceType,this.state.numberOfDice,this.state.diceColor,parseInt(this.state.bonus), (this.state.hitOrDamage === 'true')]
        var listCopy = this.state.diceList;
        listCopy.push(newSet);
        listCopy.sort((a,b) => {return b[0]-a[0]});
        temp = []
        temp.push("Dice")
        temp.push(listCopy)
        this.props.callback(temp)
        this.setState({diceList: listCopy});
        */
       this.props.callback2([newDice,newBonuses])
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
                <Picker.Item label = {this.props.possibleDice[0]} value = '0'/>
                <Picker.Item label = {this.props.possibleDice[1]} value = '1'/>
                <Picker.Item label = {this.props.possibleDice[2]} value = '2'/>
                <Picker.Item label = {this.props.possibleDice[3]} value = '3'/>
                <Picker.Item label = {this.props.possibleDice[4]} value = '4'/>
                <Picker.Item label = {this.props.possibleDice[5]} value = '5'/>
              </Picker>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.Text}>Color: </Text>        
              <Picker  style={{width: 170} } selectedValue = {this.state.diceColor} onValueChange = {this.updateDiceColor}>
                <Picker.Item label = {this.props.possibleColors[0]} value = '0'/>
                <Picker.Item label = {this.props.possibleColors[1]} value = '1'/>
                <Picker.Item label = {this.props.possibleColors[2]} value = '2'/>
                <Picker.Item label = {this.props.possibleColors[3]} value = '3'/>
                <Picker.Item label = {this.props.possibleColors[4]} value = '4'/>
                <Picker.Item label = {this.props.possibleColors[5]} value = '5'/>
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
                <Picker.Item label = "Damage" value = '0'/>
                <Picker.Item label = "To Hit" value = '1'/>
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
      //backgroundColor : 'blue',
    },
  });

export default DiceInput