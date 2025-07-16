import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import HomePage from "../../pages/HomePage";
import FavoritePage from "../../pages/FavoritePage";
import CaptainsPage from "../../pages/CaptainsPage";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Favorite") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Captain") {
            iconName = focused ? "man" : "man-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerTintColor: "black",
          headerStyle: {
            backgroundColor: "#00a8a8",
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoritePage}
        options={{
          headerTintColor: "black",
          headerStyle: {
            backgroundColor: "#00a8a8",
          },
        }}
      />
      <Tab.Screen
        name="Captain"
        component={CaptainsPage}
        options={{
          headerTintColor: "black",
          headerStyle: {
            backgroundColor: "#00a8a8",
          },
        }}
      />
    </Tab.Navigator>
  );
}
