import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { CenterScreen, ModuleScreen, ProfilScreen } from "../screens";
import { StyleSheet, View } from "react-native";
import { useColors, useTheme } from "../hooks";

const Tab = createBottomTabNavigator();

const AppNavigator = ({}) => {
  const theme = useTheme();
  const colors = useColors();

  const style = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.secondaryLight,
    },
  });

  return (
    <View style={style.screen}>
      <NavigationContainer theme={theme}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.border,
            headerShown: false,
            tabBarStyle: {
              elevation: 0,
              borderColor: "transparent",
              shadowColor: "transparent",
              backgroundColor: colors.card,
              borderRadius: 6,
              marginHorizontal: 20,
              marginVertical: 10,
            },
          }}
        >
          <Tab.Screen
            name="Centre"
            component={CenterScreen}
            options={{
              tabBarLabel: "Centre",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="apps" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Module"
            component={ModuleScreen}
            options={{
              tabBarLabel: "Module",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="browsers" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Profil"
            component={ProfilScreen}
            options={{
              tabBarLabel: "Profil",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="body-sharp" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;
