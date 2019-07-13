import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image } from 'react-native';

class CharacterAdder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {nameToAdd: ''}
        this.state = {initiativeToAdd: 0}
        this.state = {ACToAdd: 0}
        this.state = {HPToAdd: 0}
        this.state = {passiveToAdd: 0}
      }

    componentWillMount(){
        this.setState({nameToAdd : 0})
        this.setState({initiativeToAdd : 0})
        this.setState({ACToAdd : 0})
        this.setState({HPToAdd : 0})
        this.setState({passiveToAdd : 0})
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
        if(this.state.ACToAdd == '' ){
            this.setState({ACToAdd : 0})
        }
        if(this.state.HPToAdd == ''){
            this.setState({HPToAdd : 0})
        }
        if(this.state.passiveToAdd == ''){
            this.setState({passiveToAdd : 0})
        }
        return 1
      }
    

    clearState(){
        this.setState({nameToAdd : 0})
        this.setState({initiativeToAdd : -1})
        this.setState({ACToAdd : 0})
        this.setState({HPToAdd : 0})
        this.setState({passiveToAdd : 0})
        this.textInput1.clear()
        this.textInput2.clear()
        this.textInput3.clear()
        this.textInput4.clear()
        this.textInput5.clear()
    }

    addNew(){
        if(!this.validateState()){
            return
        }

        newCharacter = [this.state.initiativeToAdd, this.state.nameToAdd, this.state.ACToAdd, this.state.HPToAdd, this.state.passiveToAdd]
        //console.log(newCharacter)
        this.clearState()
        this.props.callback(newCharacter)
    }

    render () {
        return (
            <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex:3, flexDirection: 'row'}} >
                        <Text style={styles.text}> Name: </Text>
                        <TextInput
                            ref={input1 => { this.textInput1 = input1 }}
                            placeholder="            "
                            maxLength={20}
                            onChangeText={(nameToAdd) => this.setState({nameToAdd})}
                        />
                    </View>
                    <View style={{flex:2, flexDirection: 'row'}} >
                        <Text style={styles.text}> Initiative: </Text>
                        <TextInput
                            ref={input2 => { this.textInput2 = input2 }}
                            keyboardType='numeric'
                            maxLength = {2}
                            placeholder="  "
                            onChangeText={(initiativeToAdd) => this.setState({initiativeToAdd})}
                        />
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}} >
                        <Text style={styles.text}> AC: </Text>
                        <TextInput
                            ref={input3 => { this.textInput3 = input3 }}
                            keyboardType='numeric'
                            maxLength = {2}
                            placeholder="  "
                            onChangeText={(ACToAdd) => this.setState({ACToAdd})}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.text}> Max HP: </Text>
                    <TextInput
                        ref={input4 => { this.textInput4 = input4 }}
                        keyboardType='numeric'
                        maxLength = {4}
                        placeholder="    "
                        onChangeText={(HPToAdd) => this.setState({HPToAdd})}
                    />
                    <Text style={styles.text}> Passive Perception: </Text>
                    <TextInput
                        ref={input5 => { this.textInput5 = input5 }}
                        keyboardType='numeric'
                        maxLength = {2}
                        placeholder="  "
                        onChangeText={(passiveToAdd) => this.setState({passiveToAdd})}
                    />
                    <TouchableHighlight onPress={() => this.addNew(this)}>
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

export default CharacterAdder