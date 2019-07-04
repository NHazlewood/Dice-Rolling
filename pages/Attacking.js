import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image, ImageBackground , Dimensions} from 'react-native';

import DiceInput from '../components/DiceInput.js';

export default class Attacking extends React.Component {

  static navigationOptions = {
    title: 'Dice',
  };

  constructor(props) {
    super(props);
    this.state = {outText : []}
  }

  componentWillMount() {
    this.setState({outText : []})
  }

  adjustmentCallBack = (newAdjustment) => {
    this.setState({adjustment: newAdjustment})
  }

  recieveRolls = (newRolls) => {
    this.setState({outText : newRolls})
  }

  render() {
    //var tableWidth = (((Dimensions.get('window').width) *8) /9)
    //var tableHeight = (((Dimensions.get('window').height) *9) /14)
    //{width: tableWidth,height: tableHeight}
    return (
      <ImageBackground source={require('../assets/backgroundRolling.png')} style={styles.container}>
        <DiceInput callback={this.recieveRolls}/> 
        <View style={styles.lower}>
          <View style={styles.table}>
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
  table: {
    width : '90%',
    height : '65%',
  }
});