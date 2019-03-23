import { createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';

import Attacking from "./pages/Attacking";
import Initiative from "./pages/Initiative";
import Bestiary from "./pages/Bestiary";
import Monsters from "./pages/Monsters";

const TabNavigator = createMaterialTopTabNavigator({
  Attacking: {screen: Attacking},
  Initiative: {screen: Initiative},
  Bestiary: {screen: Bestiary},
  Monsters: {screen: Monsters},
},
{
  tabBarOptions:{
    style: {
      paddingTop: 20,
      backgroundColor: '#848991', //medium gray
    },
  }
});

const App = createAppContainer(TabNavigator);
export default App;