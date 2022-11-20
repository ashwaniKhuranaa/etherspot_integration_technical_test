import React from 'react';
import '@ethersproject/shims';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import 'react-native-get-random-values';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import GenerateWallet from './src/screens/GenerateWallet';
import RecoverWallet from './src/screens/RecoverWallet';
import walletReducer from './src/redux/Reducer/wallet';
import Wallet from './src/screens/Wallet';
import Home from './src/screens/Home';

const store = createStore(walletReducer);
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="welcome" component={Home} />
          <Stack.Screen name="walletGeneration" component={GenerateWallet} />
          <Stack.Screen name="walletRecovery" component={RecoverWallet} />
          <Stack.Screen name="wallet" component={Wallet} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
