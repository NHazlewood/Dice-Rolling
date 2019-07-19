import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

class InitiativeTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {mode: 0}
      }

    componentWillMount(){
        this.setState({mode : 0})
    }

    flipState(){
        if(this.state.mode == 0){
            this.setState({mode : 1})
        }
        else {
            this.setState({mode : 0})
        }
    }
    validateState(){
        if(this.state.mode == 0 || this.state.mode == 1){
            return 1
        }
        else {
            console.log("Invalid state in InitiaveTab.js")
            this.setState({mode : 0})
        }
        return 0
    }

    updateTab(){
        if(!this.validateState()){
            return
        }
        this.flipState()
        this.props.callback(this.state.mode)
    }

    render () {
        return (
            <View style= {styles.container}>
                <TouchableHighlight
                underlayColor = {'transparent'} 
                disabled = {(this.state.mode) == 0 ? true : false}
                onPress={() => this.updateTab()}>
                    <Text style={[(this.state.mode) == 0 ? styles.active : styles.inactive]}>Characters</Text>
                </TouchableHighlight>

                <TouchableHighlight
                underlayColor = {'transparent'} 
                disabled = {(this.state.mode) == 1 ? true : false}
                onPress={() => this.updateTab()}>
                    <Text style={[(this.state.mode) == 1 ? styles.active : styles.inactive]}>Parties</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    active:{
        fontSize: 18,
        padding: 5,
        textDecorationLine: 'underline',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
    },
    inactive: {
        fontSize: 18,
        padding: 5,
    },
    text: {
        fontSize: 18,
        padding: 5,
    },
  });

export default InitiativeTabs