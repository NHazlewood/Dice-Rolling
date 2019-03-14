import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';


export default class temp extends React.Component {

  static navigationOptions = {
    title: 'temp',
  };

  render() {
    return (
      <View style={styles.container} >
        <Text>TEMP PAGE</Text>
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