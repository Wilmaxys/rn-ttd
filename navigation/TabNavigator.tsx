import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { selectColors } from '../store/slices/user-slice';
import { useSelector } from 'react-redux';
import { ActivityScreen, ModuleScreen, ProfileScreen } from '../screens';
import { Ionicons } from '@expo/vector-icons';

type Screen = {
  key: string;
  component: ({}) => JSX.Element;
  displayName: string;
  icon: 'apps' | 'browsers' | 'body-sharp';
};

const Tab = createBottomTabNavigator();

const TabNavigator = ({}) => {
  const colors = useSelector(selectColors);

  const screens: Screen[] = [
    {
      key: 'Activity',
      component: ActivityScreen,
      displayName: 'Centre',
      icon: 'apps',
    },
    {
      key: 'Module',
      component: ModuleScreen,
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
