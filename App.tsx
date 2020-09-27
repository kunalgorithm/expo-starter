import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { useFonts } from "expo-font";
import LoginScreen from "./screens/LoginScreen";
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [user, setUser] = useState(null);

  let [fontsLoaded] = useFonts({
    "Calibre-Medium": require("./assets/fonts/Calibre-Medium.otf"),
  });

  if (!isLoadingComplete || !fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {user!! ? <Navigation colorScheme={colorScheme} /> : <LoginScreen />}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
