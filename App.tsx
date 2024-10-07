import { StatusBar } from 'react-native';
import React from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  type Theme as NavigationTheme,
} from '@react-navigation/native';
import Route from './src/navigation';
import colors from './src/utils/colors';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const App = () => {
  const navigationTheme: NavigationTheme = {
    dark: true,
    fonts: {},
    colors: {
      ...DefaultTheme.colors,
      background: colors.white.v1,
      // Add other color mappings here if necessary
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar backgroundColor={'#ff0000'} />
        <Route />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
