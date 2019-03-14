import React from 'react';
import { createStackNavigator, createMaterialTopTabNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

import Attacking from "./Attacking";
import temp from "./temp";

//const MainNavigator = createStackNavigator ({
//  Attacking: {screen: Attacking},
//  temp: {screen: temp},
//});

const TabNavigator = createMaterialTopTabNavigator({
  Attacking: {screen: Attacking},
  temp: {screen: temp},
},
{
  tabBarOptions:{
    style: {
      paddingTop: 20,
    },
  }
}
);

//const App = createAppContainer(MainNavigator);
const App = createAppContainer(TabNavigator);
export default App;