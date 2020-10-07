import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TimerScreen from "../screens/TimerScreen";
import StreaksScreen from "../screens/StreaksScreen";
import TabThreeScreen from "../screens/HistoryScreen";

import { Image, StyleSheet, Text } from "react-native";
import NotFoundScreen from "../screens/NotFoundScreen";
import FeedScreen from "../screens/FeedScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import FindFriendsScreen from "../screens/FindFriendsScreen";

const BottomTab = createBottomTabNavigator<any>();

export default function BottomTabNavigator(user: any) {
  const colorScheme = useColorScheme();

  if (!user) return null;
  return (
    <BottomTab.Navigator
      initialRouteName="Meditate"
      // tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
      tabBarOptions={{ activeTintColor: Colors["light"].tint }}
    >
      <BottomTab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/icons/social.png")}
              style={styles.icon}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Meditate"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/images/Official_Logo.png")}
              style={styles.icon}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/icons/profile_main.png")}
              style={styles.icon}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="Logs"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/icons/time_machine.png")}
              style={styles.icon}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<any>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name=" "
        component={TimerScreen}
        options={{
          headerTransparent: true,
          headerBackTitle: "Back",
        }}
      />
    </TabOneStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<any>();

function TabTwoNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name=" "
        component={StreaksScreen}
        options={{
          headerTransparent: true,
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerTransparent: true,
          headerTintColor: Colors.mauve,
          headerTitle: "Edit Profile",
          headerBackTitle: "Profile",
        }}
      />
      <ProfileStack.Screen
        name="FindFriends"
        component={FindFriendsScreen}
        options={{
          headerTransparent: true,
          headerTintColor: Colors.mauve,
          headerTitle: "Find Friends",
          headerBackTitle: "Profile",
        }}
      />
    </ProfileStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<any>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name=" "
        component={TabThreeScreen}
        options={{ headerTransparent: true }}
      />
    </TabThreeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginTop: 10,
    height: 25,
    width: 25,
  },
});
