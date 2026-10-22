// Welcome screen: placeholder for route "/welcome".
import { Text, View } from "react-native";
import { router } from "expo-router";
import { Screen } from "../../../components/Screen";
import { Logo } from "../../../components/Logo";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/theme";
import { Button } from "../../../components/Button";

export default function WelcomeScreen() {
  const features = [
    "Record money you lend",
  "See overdue loans at a glance",
  "Mark loans as repaid",
  ]
  return (
    <Screen className="gap-2 justify-between">
      <View className="gap-3">
        <Logo />
        <Text className="text-[#908FA0] font-inter">MINILEDGER</Text>
        <View className="mt-5 ">
        <Text className="text-[#E0E2EA] font-inter-bold text-[30px]">Never forget</Text>
        <Text className="text-[#E0E2EA] font-inter-bold text-[30px]">who owes you money</Text>
        <Text className="text-[#C7C4D7] font-inter text-[16px]">A simple ledger for money you lend to friends.</Text>
      </View>
      </View>
      
      <View>
         {features.map((item)=>(
        <View key={item} className="flex-row items-center gap-3">
            <Ionicons name="checkmark-circle" size={20} color={colors.success}></Ionicons>
            <Text className="font-inter-medium text-fg text-[#16px]">{item}</Text>
        </View>
      ))}
      </View>

      <View>
        <Button  title="Get Started" onPress={()=>router.replace("/(pages)/login")}/>
      </View>
     
    </Screen>
  );
}
