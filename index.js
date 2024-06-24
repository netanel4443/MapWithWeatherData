import {AppRegistry} from 'react-native';
import MapScreen from './src/mapscreen/ui/MapScreen';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SavedDataScreen from './src/saveddatascreen/SavedDataScreen';
import { useEffect } from 'react';
import { PERMISSIONS, request } from 'react-native-permissions';


const Stack = createNativeStackNavigator();





const app = () => {

  useEffect(() => {
    const requestLocationPermission = async () => {
      let permission;
      if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      } else if (Platform.OS === 'android') {
        permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      }
      const requestResult = await request(permission).t;
      
    }
     requestLocationPermission()
   
}, []);

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
