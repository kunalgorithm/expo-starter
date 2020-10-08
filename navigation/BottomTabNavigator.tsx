import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TimerScreen from "../screens/TimerScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import HistoryScreen from "../screens/HistoryScreen";

import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import NotFoundScreen from "../screens/NotFoundScreen";
import FeedScreen from "../screens/FeedScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import FindFriendsScreen from "../screens/FindFriendsScreen";
import CongratsScreen from "../screens/CongratsScreen";
import JournalScreen from "../screens/JournalScreen";
import UserScreen from "../screens/UserScreen";

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
        component={TabZeroNavigator}
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
const FeedStack = createStackNavigator<any>();

function TabZeroNavigator() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name=" "
        component={FeedScreen}
        options={({ navigation }) => ({
          headerTransparent: true,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("FindFriends")}
            >
              <Text style={{ color: Colors.mauve }}>Find Friends</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <FeedStack.Screen
        name="UserProfile"
        component={UserScreen}
        options={{
          headerTransparent: true,
          headerTintColor: Colors.mauve,
          headerTitle: " ",
          headerBackTitle: "Feed",
        }}
      />
      <ProfileStack.Screen
        name="FindFriends"
        component={FindFriendsScreen}
        options={{
          headerTransparent: true,
          headerTintColor: Colors.mauve,
          headerTitle: "Find Friends",
          headerBackTitle: "Feed",
        }}
      />
    </FeedStack.Navigator>
  );
}
const TimerStack = createStackNavigator<any>();

function TabOneNavigator() {
  return (
    <TimerStack.Navigator>
      <TimerStack.Screen
        name=" "
        component={TimerScreen}
        options={{
          headerTransparent: true,
          headerBackTitle: "Back",
        }}
      />
      <TimerStack.Screen
        name="Congrats"
        component={CongratsScreen}
        options={{
          headerTransparent: true,
          headerTintColor: Colors.mauve,
          headerTitle: " ",
          headerBackTitle: "Discard",
        }}
      />
      <TimerStack.Screen
        name="Journal"
        component={JournalScreen}
        options={{
          headerTransparent: true,
          headerTintColor: Colors.mauve,
          headerTitle: " ",
          headerBackTitle: "Go Back",
          headerRight: () => (
            <Image source={require("../assets/icons/editdots.png")} />
          ),
        }}
      />
    </TimerStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<any>();

function TabTwoNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name=" "
        component={MyProfileScreen}
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
        name="UserProfile"
        component={UserScreen}
        options={{
          headerTransparent: true,
          headerTintColor: Colors.mauve,
          headerTitle: " ",
          headerBackTitle: "Find Friends",
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
        component={HistoryScreen}
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
