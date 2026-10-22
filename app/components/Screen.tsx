import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = {
    children:React.ReactNode;
    className:string;
}

export function Screen({children, className=""}: ScreenProps){
    return(
         <SafeAreaView className="flex-1 bg-base">
      <View className={`flex-1 px-6 py-4 ${className}`}>{children}</View>
    </SafeAreaView>
    )
}