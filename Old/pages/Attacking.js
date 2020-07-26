import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image, ImageBackground , Dimensions, TouchableHighlightBase} from 'react-native';

import DiceInput from '../../components/DiceInput.js';
import DiceInput2 from '../../components/DiceInput2.js';
import DiceInput3 from '../../components/DiceInput3.js';
import AttackInput from './components/AttackInput.js'

export default class Attacking extends React.Component {

  static navigationOptions = {
    title: 'Dice',
  };

  constructor(props) {
    super(props);
    this.state = {outText : []}
    //this.state = {coloredRolls : []}
    this.state = {possibleColors: []}
    this.state = {outTextTotals : []}
    this.state = {outTextInput : []}
    this.state = {possibleDice: []}
    this.state = {diceLog: []}
  }

  componentWillMount() {
    this.setState({outText : []})
    this.setState({outTextInput : []})
    //this.setState({coloredRolls : []})
    this.setState({possibleColors: ['Black','Blue','Green','Purple','Red','Yellow']})
    this.setState({possibleDice: ['D4','D6','D8','D12','D20','D100']})
    this.setState({outTextTotals : []})
    this.setState({diceLog : []})
  }

  adjustmentCallBack = (newAdjustment) => {
    this.setState({adjustment: newAdjustment})
  }

  recieveRolls = (newRolls) => {
    this.setState({outText : newRolls})
  }

  recieveRolls2 = (callReturn) => {
    //this.setState({coloredRolls : newRolls})
    /*
    console.log("Recieved " + callReturn[0])
    if(callReturn[0] == "Dice"){
      //callReturn.pop()
      this.setState({outTextInput : callReturn})
      console.log(callReturn)
    }
    else{
      temp = []
      //console.log(callReturn[0]+ 'Rolls' + callReturn[1] +"damage | to hit" + callReturn[2])
      for(i=0;i<6;++i){
        if(callReturn[2][i] > 0) {
          if(callReturn[3][i] > 0) temp.push([this.state.possibleColors[i],callReturn[1][i], callReturn[2][i]])
          else temp.push([this.state.possibleColors[i],callReturn[1][i], callReturn[2][i]])
        }
      }
      this.setState({outTexTotals: temp})
      //console.log(temp)
      //console.log("Recieved" + this.state.coloredRolls.length)
      */

    //}
    
  }

  recieveRolls3 = (callReturn) => {
    tempA = ['','','','','','']
    tempB = ['','','','','','']
    //tempC = [['',''],['',''],['',''],['',''],['','']]
    for(i=0;i<this.state.possibleColors.length;++i){
      temp0 = ''
      temp1 = ''
      for(j=0;j<this.state.possibleDice.length;++j){
        if(callReturn[0][i][j][0] > 0 ) {
          if(temp0 != '') temp0 += ' + '
          temp0 += callReturn[0][i][j][0] + "D" + this.state.possibleDice[j]
        }
        if(callReturn[0][i][j][1] > 0 ) {
          if(temp1 != '') temp1 += ' + '
          temp1 += callReturn[0][i][j][1] + "D"  + this.state.possibleDice[j]
        }
      }
      if(temp0 != ''){
        if(callReturn[1][i][0] != 0) temp0 += " + " + callReturn[1][i][0]
        tempA[i] = "Damage: " + temp0
      }
      if(temp1 != ''){
        if(callReturn[1][i][0] != 0) temp1 += " + " + callReturn[1][i][1]
        tempB[i] = "To hit: " + temp1
      } 
    }


    this.setState({outTextInput : [tempA,tempB]})

    console.log("return: \n" + callReturn + '\n' + "formated:\n" + tempA + '\n' + tempB)    
  }


  render(){
    return (
      <ImageBackground source={require('../assets/backgroundRolling.png')} style={styles.container}>
        <AttackInput/> 
        <View style={styles.lower}>
          
            <ScrollView style={styles.topScroll}>
            {this.state.outTextTotals.map((item, key)=>(
                <Text key={key} style={
                  [(item[0]) == "Black" ? styles.black :
                  [(item[0]) == "Blue" ? styles.blue :
                  [(item[0]) == "Green" ? styles.green :
                  [(item[0]) == "Purple" ? styles.purple :
                  [(item[0]) == "Red" ? styles.red : styles.yellow]]]]]}>  
                  {"\n"} Damage:
                  {"\n"} To Hit: 
                </Text>)
                )}

            </ScrollView>

            <ScrollView style={styles.middleScroll}>
                {this.state.outTextTotals.map((item, key)=>(
                <Text key={key} style={
                  [(item[0]) == "Black" ? styles.black :
                  [(item[0]) == "Blue" ? styles.blue :
                  [(item[0]) == "Green" ? styles.green :
                  [(item[0]) == "Purple" ? styles.purple :
                  [(item[0]) == "Red" ? styles.red : styles.yellow]]]]]}>  
                  {"\n"}  Damage: {item[1]}
                  {"\n"} {[(item[2] > 0) ? "To Hit: "+ item[2] : ""]} 
                </Text>)
                )}
            </ScrollView>

            <ScrollView style={styles.bottomScroll}>
                  <Text style={{alignSelf:'center'}}>-- No Rolls --</Text>
            </ScrollView>       

          
        </View>
      </ImageBackground>
    );
  }
}

//dice input 1 scrollview
/*
<ScrollView style={styles.scrollingRolls}>
              {this.state.outText.map((item, key)=>(
              <Text key={key} style={[(item[1]) == "Crit!" ? styles.crit : [(item[1]) == "Fumble!" ? styles.fumble : styles.normal ]]} > 
                Attack #: {item[0]} {item[1]} 
                {"\n"}  To Hit {item[2]} ({[!(Array.isArray(item[3])) ? item[3] : item[3].map((item3, key)=>(<Text key={key}>{[(key*1+1 >= item[3].length) ? ", " : ""]}{item3}</Text>))]}) + {item[4]}) 
                {"\n"}  Damage: {item[5]} ({item[6].map((item6, key)=>(<Text key={key}>{item6}{[(key*1+1 < item[6].length) ? "+" : ""]}</Text>))}){[item[1] == "Crit!" ? "x2" : ""]} + {item[7]}) </Text>)
              )}
          </ScrollView>
*/


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    width : '100%',
    height: '100%',
  },
  topScroll : {
    height: '40%',
    //borderColor: 'black',
    //borderWidth: 2,
  },
  middleScroll : {
    height: '30%',
    //borderColor: 'red',
    //borderWidth: 2,
  },
  bottomScroll : {
    height: '30%',
    //borderColor: 'yellow',
    //borderWidth: 2,
  },
  black: {
    //padding: 5,
    fontSize: 16,
    color: 'black',
  },
  blue: {
    //padding: 5,
    fontSize: 16,
    color: 'blue',
  },
  green: {
    //padding: 5,
    fontSize: 16,
    color: 'green',
  },
  purple: {
    //padding: 5,
    fontSize: 16,
    color: 'purple',
  },
  red: {
    //padding: 5,
    fontSize: 16,
    color: 'red',
  },
  yellow: {
    //padding: 5,
    fontSize: 16,
    color: 'yellow',
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
    flexDirection : 'column',
    justifyContent: 'center',
    //backgroundColor: 'pink',
    width : '90%',
    height : '71.1%',
  },
  normal : {
    borderColor: '#575a5e',
    borderWidth: 2,
    padding: 5,
    fontSize: 16,
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
    //backgroundColor: 'blue',
  },
  //table: {
   // width : '90%',
  //  height : '70%',
  //  backgroundColor: 'green',
  //}
});