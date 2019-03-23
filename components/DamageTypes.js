import React from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import PropTypes from 'prop-types';


class DamageTypes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hide : true}
    }  

   render() {
        if(this.state.hide){
            return(
                <View>
                    <Button title= 'Show' onPress={() => {this.setState({hide : false})}}/>
                </View>
            )
        }
        return (
        <View>
            <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.Text}>Damage:  </Text>
                    <TextInput
                        placeholder="_"
                        nChangeText={(numberOfDice) => this.setState({numberOfDice})}
                    />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.Text}>D  </Text>
                    <TextInput
                        placeholder="_"
                        onChangeText={(damageDice) => this.setState({damageDice})}
                    />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', color:'white'}}>
                    <Text style={styles.Text}>+  </Text>
                    <TextInput
                        placeholder="_"
                        onChangeText={(damageBonus) => this.setState({damageBonus})}
                    />
                </View>
                <Button title= 'Hide' onPress={() => {this.setState({hide : true})}}/>
            </View>
        </View>
      )
   }
}
const styles = StyleSheet.create({
    Text: {
      fontSize: 16,
      padding: 5,
    }
  });

/*
const DamageTypes = (props) => {
  const {hide} = props;
  if (hide) {
    return null;
  }
  return (
    <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.Text}>Damage:  </Text>
            <TextInput
                placeholder="_"
                nChangeText={(numberOfDice) => this.setState({numberOfDice})}
            />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.Text}>D  </Text>
            <TextInput
                placeholder="_"
                onChangeText={(damageDice) => this.setState({damageDice})}
            />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', color:'white'}}>
            <Text style={styles.Text}>+  </Text>
            <TextInput
                placeholder="_"
                onChangeText={(damageBonus) => this.setState({damageBonus})}
            />
        </View>
    </View>
  );
};

DamageTypes.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
    ])),
  ]).isRequired,
  style: View.propTypes.style,
  hide: PropTypes.bool,
};*/

export default DamageTypes
/*
class DamageTypes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hide : true}
    }  

   render() {
        if(hide){
            return("")
        }
        return (
            <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.Text}>Damage:  </Text>
                <TextInput
                    placeholder="_"
                    nChangeText={(numberOfDice) => this.setState({numberOfDice})}
                />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.Text}>D  </Text>
                <TextInput
                    placeholder="_"
                    onChangeText={(damageDice) => this.setState({damageDice})}
                />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', color:'white'}}>
                <Text style={styles.Text}>+  </Text>
                <TextInput
                    placeholder="_"
                    onChangeText={(damageBonus) => this.setState({damageBonus})}
                />
            </View>
        </View>
      )
   }
}
const styles = StyleSheet.create({
    Text: {
      fontSize: 16,
      padding: 5,
    }
  });
 
export default DamageTypes
*/