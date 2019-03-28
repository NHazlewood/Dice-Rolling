import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';


export default class Bestiary extends React.Component {

  static navigationOptions = {
    title: 'Bestiary',
  };

  constructor(props) {
    super(props);
    
  }

  addNewBeast = () =>{
    
  }

  removeBeast = (entry) => {
    
  }

  searchBeast = (entry) => {

  }

  render() {
    return (
      <View style={styles.container}>
        <View><Text>Comming Soon</Text></View>
        <View><Text>Browse and add monsters for reference</Text></View>     
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
    height: 900,
  },
  TextInput: {
    height: 40,
  },
});