// Login screen: placeholder for route "/login".
import { Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Screen } from "../../../components/Screen";
import { Logo } from "../../../components/Logo";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/theme";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/input";
import { useState } from "react";
import { OtpInput } from "../../../components/OtpInput";
import { router } from "expo-router";
import { requestOtp, verifyOtp } from "../../../lib/authApi";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");




async function handleSendOtp(){
  setError("");
  setLoading(true);
  try{
    await requestOtp(phone);
    setStep("otp")

  }catch(err){
    setError((err as Error).message)

  }finally{
    setLoading(false)

  }
}

async function handleVerify(){
  setError("");
  setLoading(true);
  try{
    await verifyOtp(phone,code);
    setCode("");
    router.replace("/dashboard");

  }catch(err){
    setError((err as Error).message);
  }finally{
    setLoading(false);
  }
}










  return (
    <Screen keyboard className="justify-evenly">
      <View className="items-center gap-2">
        <Logo />
        <Text className="font-inter-semibold text-[24px] text-fg">
          MiniLedger
        </Text>
        <Text className="font-inter text-[14px] text-fg">
          Track money you&apos;ve lent
        </Text>
      </View>
      <View>
        <View className="gap-2">
          <Input
            prefix="+91"
            value={phone}
            onChangeText={setPhone}
            editable={step === "phone"}
            keyboardType="number-pad"
            maxLength={10}
            placeholder="98765 43210"
          />
          <Text className="text-[12px] text-[#C7C4D7]">
            We&apos;ll send a 6digit code
          </Text>
        </View>
        <View className="mt-5">
          <Button
            title="Send OTP"
            onPress={handleSendOtp}
            disabled={phone.length !== 10}
            loading={loading}
          />
        </View>
      </View>
      {step === "otp" && (
        <View className="gap-3">
          <View className="flex-row justify-between mr-5">
            <Text className="text-fg">Enter verification code</Text>
            <Pressable
              onPress={() => {
                setStep("phone");
                setCode("");
              }}
            >
              <Text className="font-inter text-primary">Change number</Text>
            </Pressable>
          </View>
          <OtpInput value={code} onChange={setCode} />
          <View className="mt-5">
            <Button title="Verify OTP" onPress={handleVerify} loading={loading} />
          </View>
        </View>
      )}
      {error ? <Text className="font-inter text-sm text-danger text-center">{error}</Text> : null}
    </Screen>
  );
}
