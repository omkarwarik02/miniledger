// Home screen: temporary test screen to confirm NativeWind classNames and custom colors work.
import { Text, View } from "react-native";
import { Button } from "../../components/Button";

export default function Index() {
  return (
    <View className="flex-1 bg-base items-center justify-center">
      <Text className="text-primary text-2xl font-bold">MiniLedger</Text>
      <Button title="Send OTP" onPress={() => console.log("on press")} />
    </View>
  );
}
