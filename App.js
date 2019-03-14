import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Attacking from "./Attacking";
import temp from "./temp";

const MainNavigator = createStackNavigator ({
  Attacking: {screen: Attacking},
  temp: {screen: temp},
});

const App = createAppContainer(MainNavigator);
export default App;