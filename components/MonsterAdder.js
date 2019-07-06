import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image } from 'react-native';

class MonsterAdder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {monsterName: ''}
        this.state = {healthDice: 0}
        this.state = {numberOfDice: 0}
        this.state = {healthBonus: 0}
        this.state = {setHealth : 0}
        this.state = {monsterAC: 0}
        this.state = {index: 0}
      }

    componentWillMount(){
        this.setState({monsterName : ''})
        this.setState({healthDice: 0})
        this.setState({numberOfDice : 0})
        this.setState({healthBonus : 0})
        this.setState({setHealth : 0})
        this.setState({monsterAC : 0})
        this.setState({index : 0})
    }

    validateState () {
        if(this.state.healthBonus == ''){this.setState({healthBonus : 0})}
        if(this.state.setHealth == ''){this.setState({setHealth : 0})}
    
        if(this.state.monsterName == ''){
            Alert.alert('Error','Monster requires a name',[{text:'Close'}])
            return 0
        }
        if(this.state.monsterAC == '' || this.state.monsterAC < 1){
            Alert.alert('Error','Invalid AC',[{text:'Close'}])
            return 0
        }
        if(this.state.setHealth > 0){
            this.setState({healthDice: 0});
            this.setState({numberOfDice : 0});
            this.setState({healthBonus : 0});
        }
        else {
            if(this.state.healthDice == '' || this.state.healthDice < 1){
                Alert.alert('Error','Invalid dice type',[{text:'Close'}])
                return 0
            }
            if(this.state.numberOfDice == '' || this.state.numberOfDice < 1){
                Alert.alert('Error','Invalid number of dice',[{text:'Close'}])
                return 0
            }
        }
        return 1
    }

    clearInputs(){
        this.setState({monsterName : ''})
        this.setState({healthDice: 0})
        this.setState({numberOfDice : 0})
        this.setState({healthBonus : 0})
        this.setState({setHealth : 0})
        this.setState({monsterAC : 0})
        this.textInput1.clear()
        this.textInput2.clear()
        this.textInput3.clear()
        this.textInput4.clear()
        this.textInput5.clear()
        this.textInput6.clear()
    }

    addNewMonster(){
        if(!this.validateState()){
            return
        }
        var healthTotal = 0
        if(this.state.setHealth > 0){
            healthTotal = this.state.setHealth
        }
        else{
            for(i=0;i<(this.state.numberOfDice*1);++i){
                healthTotal += Math.ceil(Math.random() * this.state.healthDice)
            }
            healthTotal += parseInt(this.state.healthBonus)
        }

        newMonster = [this.state.monsterName, healthTotal, healthTotal, this.state.monsterAC,this.state.index]
        this.setState({index: (this.state.index+1)})
        this.clearInputs()
        this.props.callback(newMonster)

    }

    render () {
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text}>Monster Name:</Text>
                    <TextInput
                        ref={input1 => { this.textInput1 = input1}}
                        placeholder="___"
                        maxLength = {24}
                        onChangeText={(monsterName) => this.setState({monsterName})}
                    />
                    <Text style={styles.text}>AC:</Text>
                    <TextInput
                        ref={input2 => { this.textInput2 = input2}}
                        placeholder="__"
                        keyboardType='numeric'
                        maxLength = {2}
                        onChangeText={(monsterAC) => this.setState({monsterAC})}
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text}>Health:</Text>
                    <TextInput
                        ref={input3 => { this.textInput3 = input3}}
                        placeholder="___"
                        keyboardType='numeric'
                        maxLength = {4}
                        onChangeText={(setHealth) => this.setState({setHealth})}
                    />
                    <Text style={styles.text}> OR  Health dice:</Text>
                    <TextInput
                        ref={input4 => { this.textInput4 = input4}}
                        placeholder="__"
                        keyboardType='numeric'
                        maxLength = {2}
                        onChangeText={(numberOfDice) => this.setState({numberOfDice})}
                    />
                    <Text style={styles.text}> D</Text>
                    <TextInput
                        ref={input5 => { this.textInput5 = input5}}
                        placeholder="__"
                        keyboardType='numeric'
                        maxLength = {2}
                        onChangeText={(healthDice) => this.setState({healthDice})}
                    />
                    <Text style={styles.text}> + </Text>
                    <TextInput
                        ref={input6 => { this.textInput6 = input6}}
                        placeholder="__"
                        keyboardType='numeric'
                        maxLength = {4}
                        onChangeText={(healthBonus) => this.setState({healthBonus})}
                    />
                    <TouchableHighlight onPress={() => this.addNewMonster(this)}>
                        <Image source={require('../assets/plus.png')}/>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
      fontSize: 16,
      padding: 5,
    },
  });

export default MonsterAdder