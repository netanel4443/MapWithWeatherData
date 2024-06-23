import {AppRegistry} from 'react-native';
import MapScreen from './src/mapscreen/ui/MapScreen';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SavedDataScreen from './src/saveddatascreen/SavedDataScreen';

const Stack = createNativeStackNavigator();

const app = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MapScreen">
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MarkersData"
            component={SavedDataScreen}
            options={{title: 'Markers Data'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => app);
