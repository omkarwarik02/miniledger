// Add Loan screen: placeholder for route "/add-loan".
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Screen } from "../../../components/Screen";
import { Input } from "../../../components/input";
import { useState } from "react";
import { DateField } from "../../../components/DateField";              // your component (named, with { })
import DateTimePicker from "@react-native-community/datetimepicker"; 
import { createLoan } from "../../../lib/loanApi";
import { Button } from "../../../components/Button";

function toYMD(d:Date){
    const y =d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2,"0");
    const day = String(d.getDate()).padStart(2,"0");
    return `${y}-${m}-${day}`;
  }
   

export default function AddLoanScreen() {
  const [dueDate, setdueDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [amount, setAmount] = useState("");


  const [errors, setErrors] = useState<{
    friendName?: string;
    amount?: string;
    dueDate?: string;
  }>({});

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");



async function handleSave(){
  const newErrors:typeof errors = {};
  if(!friendName.trim()) newErrors.friendName ="Friend name is required";
  if(!(Number(amount) > 0)) newErrors.amount ="Enter a valid amount";
  if (!dueDate) newErrors.dueDate = "Pick a due date";

  setErrors(newErrors);
  if(Object.keys(newErrors).length > 0) return;


  setApiError("");
  setLoading(true);
  try{
    await createLoan(friendName.trim(), Number(amount), toYMD(dueDate!));
    router.canGoBack() ? router.back() : router.replace("/dashboard");
  } catch(e){
    setApiError((e as Error).message);
  } finally {
    setLoading(false);
  }


}






























  return (
    <Screen keyboard className="flex-col">
      <View className="flex-row items-center gap-3">
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/dashboard"))}
          hitSlop={10}
          className="h-10 w-10 items-center justify-center rounded-full bg-surface"
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <Text className="font-inter-semibold text-[20px] text-fg">Add Loan</Text>
      </View>

      <View className="mt-10 gap-20">
      <View className="gap-3">
        <Text className=" font-inter text-fg">Friend Name</Text>
        <Input
          placeholder="e.g. Omkar Warik"
          value={friendName}
          onChangeText={setFriendName}
           error={errors.friendName}
           
        />
      </View>
      <View className="gap-3">
        <Text className=" font-inter text-fg">Amount</Text>
        <Input
          placeholder="0"
          prefix="₹"
          value={amount}
          onChangeText={setAmount}
           error={errors.amount}
            keyboardType="decimal-pad"
        />
      </View>

      <View className="gap-3">
        <DateField
  value={dueDate}
  onPress={() => setShowPicker(true)}
  error={errors.dueDate}
/>

        {showPicker && (
          <DateTimePicker
            value={dueDate ?? new Date()}
             onValueChange={(_event, selected) => {
      setShowPicker(false);
      setdueDate(selected);
    }}
    onDismiss={() => setShowPicker(false)}
          />
        )}
      </View>
      </View>
      {apiError ? <Text className="font-inter text-sm text-danger">{apiError}</Text> :null}
      <View className="mt-10">
        <Button title="Save" onPress={handleSave} loading={loading} />
      </View>
      
    </Screen>
  );
}
