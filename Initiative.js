import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';


export default class Initiative extends React.Component {

  static navigationOptions = {
    title: 'Initiative',
  };

  constructor(props) {
    super(props);
    this.state = {nameToAdd: ''};
    this.state = {initiativeToAdd: 0};
    this.state = {initiativeOrder: []};
  }

  addNew = () =>{
    const newEntry = this.state.nameToAdd + "   initiative: " + this.state.initiativeToAdd;
    var orderCopy = this.state.initiativeOrder;
    orderCopy.push(newEntry);
    this.setState({initiativeOrder: orderCopy});
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text> Name: </Text>
        <TextInput
            placeholder="___"
            onChangeText={(nameToAdd) => this.setState({nameToAdd})}
        />
        <Text> Initiative: </Text>
        <TextInput
            placeholder="___"
            onChangeText={(initiativeToAdd) => this.setState({initiativeToAdd})}
        />
        <Button title= "Add" onPress={() => this.addNew(this)}/>
        </View>
        <ScrollView style={{ height: 800, width: 350}}>
        {this.state.initiativeOrder.map((item, key)=>(
         <Text key={key} > { item } </Text>)
         )}
        </ScrollView>
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