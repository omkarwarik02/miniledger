// Root layout: loads global Tailwind styles once and sets up the status bar and stack navigator.
import "../../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../constants/theme";

export default function RootLayout() {
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
