import { createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';

import Attacking from "./Attacking";
import Initiative from "./Initiative";

const TabNavigator = createMaterialTopTabNavigator({
  Attacking: {screen: Attacking},
  Initiative: {screen: Initiative},
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