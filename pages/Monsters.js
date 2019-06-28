import React from 'react'
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image } from 'react-native'
import DialogInput from 'react-native-dialog-input'
import MonsterAdder from '../components/MonsterAdder.js'


export default class Monsters extends React.Component {

  static navigationOptions = {
    title: 'Monsters',
  };

  constructor(props) {
    super(props);
    this.state = {monsterList: []}
    this.state = {targetID: 0}
    this.state = {isHealVisible : false}
    this.state = {isDamageVisible : false}
    this.state = {isTempVisible : false}
    this.state = {adjustType: ''}
  }

  componentWillMount(){
    this.setState({isHealVisible : false})
    this.setState({isDamageVisible : false})
    this.setState({isTempVisible : false})
    this.setState({monsterList : []})
  }

  addNewMonster = (newMonster) =>{
    var monsters = this.state.monsterList
    monsters.push(newMonster)
    monsters.sort()
    this.setState({monsterList: monsters})
  }

  removeMonster = (entry) => {
    var monsters = this.state.monsterList
    for (i =0; i< monsters.length;++i){
      if(monsters[i][4] == entry[4]){
        monsters.splice(i,1)
        this.setState({monserList: monsters})
        return
      }
    }
  }

  adjustHealth = (amount) => {
    this.setState({isHealVisible : false})
    this.setState({isDamageVisible : false})
    this.setState({isTempVisible : false})
    var monsters = this.state.monsterList
    for (i =0; i< monsters.length;++i){
      if(monsters[i][4] == this.state.targetID){
        if(this.state.adjustType == 'damage'){
          monsters[i][1] -= amount
        }
        else { 
          monsters[i][1] -= (amount*-1)
          if(this.state.adjustType == 'heal'){
            monsters[i][1] = Math.min(monsters[i][1], monsters[i][2])
          }          
        }
        this.setState({monserList: monsters})
        return
      }
    }
  }  
  
  healMonster = (entry) => {
    this.setState({targetID : entry[4]})
    this.setState({adjustType : 'heal'})
    this.setState({isHealVisible : true})
  }

  damageMonster = (entry) => {
    this.setState({targetID : entry[4]})
    this.setState({adjustType : 'damage'})
    this.setState({isDamageVisible : true})
  }

  temporaryHealthMonster = (entry) => {
    this.setState({targetID : entry[4]})
    this.setState({adjustType : 'temp'})
    this.setState({isTempVisible : true})
  }

  listerHandler (entry, mode) {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.upper}>          
          <MonsterAdder callback={this.addNewMonster} />
        </View>
        <DialogInput isDialogVisible={this.state.isDamageVisible}
            title={"Damaging"}
            message={"Input damage amount"}
            textInputProps = {{keyboardType:'numeric'}}
            hintInput ={""}
            submitInput={ (inputText) => {this.adjustHealth(inputText)} }
            closeDialog={ () => {this.setState({isDamageVisible : false})}}>
        </DialogInput>
        <DialogInput isDialogVisible={this.state.isHealVisible}
            title={"Healing"}
            message={"Input healing amount"}
            textInputProps = {{keyboardType:'numeric'}}
            hintInput ={""}
            submitInput={ (inputText) => {this.adjustHealth(inputText)} }
            closeDialog={ () => {this.setState({isHealVisible : false})}}>
        </DialogInput>
        <DialogInput isDialogVisible={this.state.isTempVisible}
            title={"Temporary Health"}
            message={"Input temporary health amount"}
            textInputProps = {{keyboardType:'numeric'}}
            hintInput ={""}
            submitInput={ (inputText) => {this.adjustHealth(inputText)} }
            closeDialog={ () => {this.setState({isTempVisible : false})}}>
        </DialogInput>
        <View style={styles.lower}>
        <ScrollView style={styles.scrollList}>
          {this.state.monsterList.map((monster, key)=>(
            <View key={key} style={{flexDirection : 'row'}}>
              <Text style={styles.name}>{monster[0]}</Text>
              <Text style={styles.health}>{monster[1]} / {monster[2]}</Text>
              <Text style={styles.ac}>AC: {monster[3]}</Text>
              <TouchableHighlight style={styles.imageButton} onPress={() => this.removeMonster(monster)}>
                <Image source={require('../assets/grave.png')}/>
              </TouchableHighlight>
              <TouchableHighlight style={styles.imageButton} onPress={() => this.damageMonster(monster)}>
                <Image source={require('../assets/sword.png')}/>
              </TouchableHighlight>
              <TouchableHighlight style={styles.imageButton} onPress={() => this.healMonster(monster)}>
                <Image source={require('../assets/heart.png')}/>
              </TouchableHighlight>
              <TouchableHighlight style={styles.imageButton} onPress={() => this.temporaryHealthMonster(monster)}>
                <Image source={require('../assets/hourGlass.png')}/>
              </TouchableHighlight>
             </View>)
          )}            
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