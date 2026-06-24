import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { initDb } from "../data/favoritesdb";
//*learned how to import fonts and apply them to the whole app
//https://docs.expo.dev/develop/user-interface/fonts/
import {
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Prevent the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null; // wait until fonts load

  return (
    <SQLiteProvider databaseName="db.db" onInit={initDb}>
      <Slot />
    </SQLiteProvider>
  );
}
