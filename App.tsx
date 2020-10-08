import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import LoginScreen from "./screens/LoginScreen";
import { useMe } from "./hooks/fetcher";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingOne from "./screens/onboarding/OnboardingOne";
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const { me } = useMe();

  // Note: Fonts loaded in `hooks/useCachedResources.ts`

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {me!! && me?.email!! ? (
          <Navigation colorScheme={colorScheme} />
        ) : (
          <LoginScreen />
        )}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

const OnboardingStack = createStackNavigator<any>();

function OnboardingNavigator() {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen name="Onboarding-One" component={OnboardingOne} />
    </OnboardingStack.Navigator>
  );
}
