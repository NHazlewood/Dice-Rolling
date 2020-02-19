import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image, ImageBackground , Dimensions} from 'react-native';

import DiceInput from '../components/DiceInput.js';
import DiceInput2 from '../components/DiceInput2.js';

export default class Attacking extends React.Component {

  static navigationOptions = {
    title: 'Dice',
  };

  constructor(props) {
    super(props);
    this.state = {outText : []}
    //this.state = {coloredRolls : []}
    this.state = {possibleColors: []}
  }

  componentWillMount() {
    this.setState({outText : []})
    //this.setState({coloredRolls : []})
    this.setState({possibleColors: ['Black','Blue','Green','Purple','Red','White','Yellow']})
  }

  adjustmentCallBack = (newAdjustment) => {
    this.setState({adjustment: newAdjustment})
  }

  recieveRolls = (newRolls) => {
    this.setState({outText : newRolls})
  }

  recieveRolls2 = (newRolls) => {
    //this.setState({coloredRolls : newRolls})
    console.log("Recieved " + newRolls.length)
    temp = []
    console.log(newRolls[0]+ 'Rolls' + newRolls[1] +"damage | to hit" + newRolls[2])
    for(i=0;i<7;++i){
      if(newRolls[1][i] > 0) {
        if(newRolls[2][i] > 0) temp.push([this.state.possibleColors[i],newRolls[1][i], newRolls[2][i]])
        else temp.push([this.state.possibleColors[i],newRolls[1][i], newRolls[2][i]])
      }
    }
    this.setState({outText: temp})
    console.log(temp)
    //console.log("Recieved" + this.state.coloredRolls.length)
  }


  render() {
    return (
      <ImageBackground source={require('../assets/backgroundRolling.png')} style={styles.container}>
        <DiceInput2 callback={this.recieveRolls2}/> 
        <View style={styles.lower}>
          <View style={styles.table}>
          <ScrollView style={styles.scrollingRolls}>
              {this.state.outText.map((item, key)=>(
              <Text key={key} >  
                {"\n"}  Color: {item[0]} 
                {"\n"}  Damage: {item[1]}
                {"\n"}  To Hit: {item[2]}
              </Text>)
              )}
          </ScrollView>         
          </View>
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
  table: {
    width : '90%',
    height : '65%',
  }
});