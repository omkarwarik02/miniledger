// Root layout: loads global Tailwind styles once and sets up the status bar and stack navigator.
import "../../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../constants/theme";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync(); 

export default function RootLayout() {
   const [loaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold });
   useEffect(() => {
    if (loaded) SplashScreen.hideAsync(); // hide splash once fonts are ready
  }, [loaded]);

  if (!loaded) return null; // render nothing until fonts are loaded

  return (
    <>
      <StatusBar style="light"/>
      <Stack 
        screenOptions={{
          headerShown:false,
          contentStyle:{ backgroundColor:colors.bg}
        }}
      
      />
    
    
    </>
  )
}
