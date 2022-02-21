import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { themeSelector } from '../store/slices/user-slice';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import { AppButton, AppText } from '../components/global';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const AppNavigator = ({}) => {
  const theme = useSelector(themeSelector);
  const { colors } = theme;

  return (
    <View style={{ flex: 1, backgroundColor: colors.secondaryLight }}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={({ navigation, route }) => ({
            headerLeft: () => (
              <AppButton
                style={{
                  borderRadius: 50,
                  backgroundColor: colors.transparent,
                  padding: 25,
                }}
                onPress={() => navigation.goBack()}
              >
                <MaterialCommunityIcons name='arrow-left' size={20} />
              </AppButton>
            ),
            headerTitle: (props) => {
              console.log('route', getFocusedRouteNameFromRoute, route);
              return (
                <AppText type='title'>
                  {getFocusedRouteNameFromRoute(route)}
                </AppText>
              );
            },
            headerTitleAlign: 'center',
          })}
        >
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
