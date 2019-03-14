import { createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';

import Attacking from "./Attacking";
import temp from "./temp";

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
});

const App = createAppContainer(TabNavigator);
export default App;