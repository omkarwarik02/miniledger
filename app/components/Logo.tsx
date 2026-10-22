import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";

export function Logo() {
  return (
    <View className="w-14 h-14 rounded-2xl bg-surface border border-line items-center justify-center">
      <Ionicons name="wallet-outline" size={26} color={colors.primary} />
    </View>
  );
}