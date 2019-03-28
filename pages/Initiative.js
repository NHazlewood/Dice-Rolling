import React from 'react';
import {Alert, StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';


export default class Initiative extends React.Component {

  static navigationOptions = {
    title: 'Initiative',
  };

  constructor(props) {
    super(props);
    this.state = {nameToAdd: ''}
    this.state = {initiativeToAdd: 0}
    this.state = {initiativeOrder: []}
    this.state = {initiativeKey: 0}
  }

  componentWillMount(){
    this.setState({nameToAdd : ''})
    this.setState({initiativeToAdd: -1})
    this.setState({initiativeKey : 0})
    this.setState({initiativeOrder : []})
  }

  validateState(){
    if(this.state.nameToAdd == ''){
      Alert.alert('Error','New entree requires a name',[{text:'Close'}])
      return 0
    }
    if(this.state.initiativeToAdd == '' || this.state.initiativeToAdd < 0){
      Alert.alert('Error','Invalid initiative',[{text:'Close'}])
      return 0
    }
    return 1
  }

  resetState(){
    this.setState({nameToAdd : ''})
    this.setState({initiativeToAdd: -1})
  }

  addNew = () =>{
    if(!this.validateState()){return}
    const newEntry = [this.state.initiativeToAdd, this.state.nameToAdd,this.state.initiativeKey];
    this.setState({initiativeKey: (this.state.initiativeKey+1)})
    var orderCopy = this.state.initiativeOrder;
    orderCopy.push(newEntry);
    orderCopy.sort((a,b) => {return b[0]-a[0]});
    this.setState({initiativeOrder: orderCopy});
    this.resetState()
    this.textInput1.clear()
    this.textInput2.clear()
  }

  remove = (entry) =>{
    var initList = this.state.initiativeOrder
    for (i =0; i< initList.length;++i){
      if(initList[i][2] == entry[2]){
        initList.splice(i,1)
        this.setState({initiativeOrder: initList})
        return
      }
    }
  }

  render() {
    return (
      <View style={styles.Container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text> Name: </Text>
        <TextInput
          ref={input1 => { this.textInput1 = input1 }}
          placeholder="___"
          maxLength={20}
          onChangeText={(nameToAdd) => this.setState({nameToAdd})}
        />
        <Text> Initiative: </Text>
        <TextInput
          ref={input2 => { this.textInput2 = input2 }}
          keyboardType='numeric'
          maxLength = {2}
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
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 900,
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