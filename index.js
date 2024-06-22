/**
 * @format
 */

import {AppRegistry} from 'react-native';
import MapScreen from './src/mapscreen/ui/MapScreen';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/redux/store'

const app = () => {
  return (
    <Provider store={store}>
      <MapScreen />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => app);
