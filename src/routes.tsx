import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../src/pages/SignIn';
import Home from '../src/pages/Home';
import Recyclers from '../src/pages/Recyclers';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f0f0f5',
          },
        }}
      >
        <AppStack.Screen name="SignIn" component={SignIn} />
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Recyclers" component={Recyclers} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
