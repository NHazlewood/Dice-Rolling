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
    const newEntry = [this.state.initiativeToAdd, this.state.nameToAdd];
    var orderCopy = this.state.initiativeOrder;
    orderCopy.push(newEntry);
    orderCopy.sort((a,b) => {return b[0]-a[0]});
    this.setState({initiativeOrder: orderCopy});
    this.textInput1.clear()
    this.textInput2.clear()
  }

  remove = (entry) =>{
    var initList = this.state.initiativeOrder
    for (i =0; i< initList.length;++i){
      if(initList[i][1] == entry[1] && initList[i][0] == entry[0]){
        initList.splice(i,1)
        this.setState({initiativeOrder: initList})
        return
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text> Name: </Text>
        <TextInput
          ref={input1 => { this.textInput1 = input1 }}
          placeholder="___"
          onChangeText={(nameToAdd) => this.setState({nameToAdd})}
        />
        <Text> Initiative: </Text>
        <TextInput
          ref={input2 => { this.textInput2 = input2 }}
          placeholder="___"
          onChangeText={(initiativeToAdd) => this.setState({initiativeToAdd})}
        />
        <Button title= "Add" onPress={() => this.addNew(this)}/>
        </View>
        <View style={{ height: 500, width: 350}}>
          <ScrollView>
            {this.state.initiativeOrder.map((item, key)=>(
            <View key={key} style={styles.InitiativeItem}>
              <Text style={styles.LeftSide}>{item[0]} {item[1]}</Text>
              <Button style={styles.LeftSide} color='red' title="Remove" onPress={() => this.remove(item)}/>
            </View>)
            )}
          </ScrollView>
        </View>
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
  InitiativeItem:{
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  LeftSide: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  RightSide: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});