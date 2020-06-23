import React from 'react';
import {Modal, Text, TouchableHighlight, View, Alert,  StyleSheet, TextInput, ScrollView, Button, Image, ImageBackground , Dimensions, TouchableHighlightBase} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


class AttackInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {modalVisible : false}
        this.state = {advantageOptions : []}
        this.state = {advantage: 0}  
    }

    componentWillMount(){
        this.setState({advantageOptions: [
            {label: 'Advantage', value: 1},
            {label: 'Disadvantage', value: -1},
            {label: 'Straight', value: 0}
        ]})
        this.setState({modalVisible : false})
    }

    setModalVisible(visible){
        this.setState({modalVisible : visible})
    }

    render(){
        return(
            <View>
                <Button title="Add attack" onPress={() =>this.setModalVisible(true)}/>

                <Modal visible ={this.state.modalVisible}>
                    <Text>Add Attack</Text>
                    <Text>Attack name:</Text>
                    <Button title="Close" color = 'Red' onPress={() =>this.setModalVisible(false)}/>
                    <RadioForm
                        radio_props = {this.props.advantageOptions}
                        onPress = {(value) => {this.setState({advantage: value})}}
                    />
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
      fontSize: 16,
      padding: 5,
    },
    upper: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 2,
      flexDirection : 'column',
      //backgroundColor : 'blue',
    },
  });

export default AttackInput