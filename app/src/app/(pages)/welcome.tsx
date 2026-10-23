// Welcome screen: placeholder for route "/welcome".
import { Text, View } from "react-native";
import { router } from "expo-router";
import { Screen } from "../../../components/Screen";
import { Logo } from "../../../components/Logo";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/theme";
import { Button } from "../../../components/Button";

export default function WelcomeScreen() {
  // Full class names (not built from strings) so Tailwind picks them up.
  const features = [
    {
      icon: "wallet-outline",
      title: "Record money you lend",
      subtitle: "Who, how much, and when it's due",
      color: colors.primary,
      tile: "bg-primary/15",
    },
    {
      icon: "alarm-outline",
      title: "See overdue loans at a glance",
      subtitle: "Late payments are flagged in red",
      color: colors.danger,
      tile: "bg-danger/15",
    },
    {
      icon: "checkmark-done-outline",
      title: "Mark loans as repaid",
      subtitle: "One tap when you get paid back",
      color: colors.success,
      tile: "bg-success/15",
    },
  ] as const;
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
      
      <View className="gap-3">
        {features.map((item) => (
          <View
            key={item.title}
            className="flex-row items-center gap-4 rounded-2xl bg-surface border border-line p-4"
          >
            <View className={`w-11 h-11 rounded-xl items-center justify-center ${item.tile}`}>
              <Ionicons name={item.icon} size={22} color={item.color} />
            </View>
            <View className="flex-1 gap-0.5">
              <Text className="font-inter-semibold text-[15px] text-fg">{item.title}</Text>
              <Text className="font-inter text-[13px] text-muted">{item.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>

      <View>
        <Button  title="Get Started" onPress={()=>router.replace("/(pages)/login")}/>
      </View>
     
    </Screen>
  );
}
