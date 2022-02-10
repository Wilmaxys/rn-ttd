import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectColors, selectTheme } from '../store/slices/user-slice';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const AppNavigator = ({}) => {
  const theme = useSelector(selectTheme);
  const colors = useSelector(selectColors);

  const style = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.secondaryLight,
    },
  });

  return (
    <View style={style.screen}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;
