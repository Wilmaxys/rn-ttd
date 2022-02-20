import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { ActivityScreen, ModulesScreen, ProfileScreen } from '../screens';
import { Ionicons } from '@expo/vector-icons';
import { themeSelector } from '../store/slices/user-slice';

type Screen = {
  key: string;
  component: ({}) => JSX.Element;
  displayName: string;
  icon: 'apps' | 'browsers' | 'body-sharp';
};

const Tab = createBottomTabNavigator();

const TabNavigator = ({}) => {
  const { colors } = useSelector(themeSelector);

  const screens: Screen[] = [
    {
      key: 'Activity',
      component: ActivityScreen,
      displayName: 'Centre',
      icon: 'apps',
    },
    {
      key: 'Module',
      component: ModulesScreen,
      displayName: 'Module',
      icon: 'browsers',
    },
    {
      key: 'Profile',
      component: ProfileScreen,
      displayName: 'Profil',
      icon: 'body-sharp',
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.border,
        headerShown: false,
        tabBarStyle: {
          elevation: 0,
          borderColor: 'transparent',
          shadowColor: 'transparent',
          backgroundColor: colors.card,
          borderRadius: 6,
          marginHorizontal: 20,
          marginVertical: 10,
        },
      }}
    >
      {screens.map((screen) => (
        <Tab.Screen
          key={screen.key}
          name={screen.key}
          component={screen.component}
          options={{
            tabBarLabel: screen.displayName,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={screen.icon} color={color} size={size} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
