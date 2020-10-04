import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import LoginScreen from "./screens/LoginScreen";
import { useMe } from "./hooks/fetcher";
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
