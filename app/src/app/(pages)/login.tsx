// Login screen: placeholder for route "/login".
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Screen } from "../../../components/Screen";
import { Logo } from "../../../components/Logo";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/theme";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/input";
import { useState } from "react";


export default function LoginScreen() {
const [phone, setPhone] = useState("");
const [code, setCode] = useState("");

  return (
    <Screen className="justify-evenly">
      <View className="items-center gap-2">
        <Logo />
        <Text className="font-inter-semibold text-[24px] text-[#E0E2EA]">
          MiniLedger
        </Text>
        <Text className="font-inter text-[14px] text-[#C7C4D7]">Track money you&apos;ve lent</Text>
      </View>
      <View>
        <View className="gap-2">
        <Input prefix="+91" value={phone} onChangeText={setPhone}
        keyboardType="number-pad"  maxLength={10}  placeholder="98765 43210"
        />
        <Text className="text-[12px] text-[#C7C4D7]">Well send a 6digit code</Text>
        </View>
        <View className="mt-5">
          <Button  title="Send OTP" onPress={()=>router.replace("/(pages)/login")}/>
        </View>
      </View>
    </Screen>
  );
}
