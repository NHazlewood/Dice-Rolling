import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native'

class AdvantagePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {adjustment :'None'}
    }

   updateAdjustment = (adjustment) => {
      this.setState({ adjustment: adjustment })
      this.props.callback(adjustment)
   }

   render() {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Adjustment: </Text>        
            <Picker  style={{width: 170} } selectedValue = {this.state.adjustment} onValueChange = {this.updateAdjustment}>
               <Picker.Item label = "Advantage" value = "Advantage"/>
               <Picker.Item label = "None" value = "None"/>
               <Picker.Item label = "Disadvantage" value = "Disadvantage"/>
            </Picker>
        </View>
      )
   }
}
export default AdvantagePicker