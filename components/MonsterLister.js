import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableHighlight, Image } from 'react-native';

class MonsterLister extends React.Component {

    constructor(props) {
        super(props);

      }

    componentWillMount(){
       
    }   

    render () {
        return (
          <ScrollView style={styles.scrollList}>
          {this.props.list.map((monster, key)=>(
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
        )
    }
}

const styles = StyleSheet.create({
    text: {
      fontSize: 16,
      padding: 5,
    },
  });

export default MonsterLister