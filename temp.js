import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class temp extends React.Component {

  static navigationOptions = {
    title: 'temp',
  };

  render() {
    const {navigate} = this.props.navigation;
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