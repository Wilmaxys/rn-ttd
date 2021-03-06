import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from '../store/slices/user-slice';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import { AppButton } from '../components/global';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { QuestionsScreen, ThemeScreen } from '../screens';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const AppNavigator = ({}) => {
  const theme = useSelector(themeSelector);
  const { colors } = theme;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={({ navigation, route }) => ({
            headerLeft: () => (
              <AppButton
                style={{ padding: 13 }}
                variant='secondary'
                onPress={() => navigation.goBack()}
              >
                <MaterialCommunityIcons
                  name='arrow-left'
                  size={20}
                  color={colors.text}
                />
              </AppButton>
            ),
            headerTitle: getFocusedRouteNameFromRoute(route),
            headerTitleStyle: {
              fontFamily: 'montserrat',
              color: colors.text,
              fontSize: 24,
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: colors.background,
              elevation: 0,
            },
          })}
        >
          <Stack.Screen
            name='Home'
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='QuestionsStart'
            component={QuestionsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Themes'
            component={ThemeScreen}
            options={{ headerTitle: 'Themes' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigator;
