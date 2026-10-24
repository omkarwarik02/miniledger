import { View, KeyboardAvoidingView, ScrollView, Platform  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RefObject } from "react";

type ScreenProps = {
    children:React.ReactNode;
    className:string;
    keyboard?:boolean;
    scroll?:boolean;
      scrollRef?: RefObject<ScrollView | null>;
}

export function Screen({children, className="",keyboard,scroll,scrollRef}: ScreenProps){
    const content = <View className={`flex-1 px-6 py-4 ${className}`}>{children}</View>
    return(
         <SafeAreaView className="flex-1 bg-base">
            {scroll && !keyboard ? (
                // Scrolls only when content is taller than the screen
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    {content}
                </ScrollView>
            ) : keyboard ? (
                <KeyboardAvoidingView
                className="flex-1"
                behavior="padding"
                >
                    <ScrollView
                    ref={scrollRef}
                    contentContainerStyle={{flexGrow:1}}
                    keyboardShouldPersistTaps="handled"
                    >
                        {content}
                    </ScrollView>
                </KeyboardAvoidingView>
               ):(
                    content
               ) }
    </SafeAreaView>
    )
}