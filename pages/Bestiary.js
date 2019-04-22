import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image } from 'react-native';
import BestiaryManager from '../components/BestiaryManager.js';
import BeastInput from '../components/BeastInput.js';

async function asyncHelper(newEntry, targetFuntion, callback){
  await targetFuntion(newEntry).then((values => response = values))
  callback(response)
}

async function asyncHelperNoArg(targetFuntion, callback){
  await targetFuntion().then((values => response = values))
  callback(response)
}


export default class Bestiary extends React.Component {

  static navigationOptions = {
    title: 'Bestiary',
  };

  constructor(props) {
    super(props);
    this.state = {entries : []}
    this.updateCallback = this.updateCallback.bind(this)
    this.state = {searchName : ''}   
  }

  componentWillMount(){
    this.setState({entries: []})
  }

  addNewBeast = (newBeast) => {
    const index = this.databaseReference.getNextIndex()
    newBeast.unshift(index)
    asyncHelper(newBeast, this.databaseReference.addNewBeast, this.updateCallback)
  }

  updateCallback(beasts) {
    this.setState({entries : beasts})    
  }

  removeBeast = (entry) => {
    asyncHelper(entry[7], this.databaseReference.removeBeast, this.updateCallback)
  }

  searchBeastNames = () => {
    beast = this.state.searchName
    if(beast == ''){
      asyncHelperNoArg(this.databaseReference.retrieveBeasts, this.updateCallback)
    }
    else {
      asyncHelper(beast, this.databaseReference.getBeast, this.updateCallback)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <BestiaryManager ref={databaseReference => {this.databaseReference = databaseReference}}/>
        <View style={styles.upper}>
          <BeastInput callback={this.addNewBeast}/>
          <View style={{flexDirection : 'row'}}>
            <TextInput
              ref={input8 => { this.textInput8 = input8}}
              placeholder="__"
              maxLength = {24}
              onChangeText={(searchName) => this.setState({searchName})}
            />
            <TouchableHighlight onPress={() => this.searchBeastNames(this)}>
              <Image source={require('../assets/search.png')}/>
            </TouchableHighlight>
          </View>
        </View>
          <View style={styles.lower}>
          <ScrollView style={styles.scrollList}>
          {this.state.entries.map((item, key)=>(
            <View key={key} style={styles.entries}>
              <Text style={styles.text}>{item[0]}</Text>
              <Text style={styles.text}>AC {item[5]}</Text>
              <Text style={styles.text}>Health {item[1]} ({item[2]} d {item[3]} + {item[4]})</Text>
              <View style={{flexDirection : 'row'}}>
                <Text style={styles.text}>Descripition:</Text>
                <TouchableHighlight style={styles.imageButton} onPress={() => this.removeBeast(item)}>
                  <Image source={require('../assets/minusSlim.png')}/>
                </TouchableHighlight>
              </View>
              <Text style={styles.text}>{item[6]}</Text>
            </View>
            ))}                   
          </ScrollView>
        </View>
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  ac: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 16,
    padding: 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 900,
  },
  entries : {
    borderColor: '#575a5e',
    borderWidth: 2,
    padding: 5,
  },
  health: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 16,
    padding: 2,
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 2,
    alignItems: 'center',
  },
  lower :{
    flex: 5,
    flexDirection : 'column-reverse',
    width: 350,
  },
  name: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 16,
    padding: 2,
  },
  text: {
    fontSize: 16,
    padding: 5,
  },
  scrollList : {
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 3,
    padding: 5,
    shadowColor: 'black',
  },
  upper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
    flexDirection : 'column',
  },  
});