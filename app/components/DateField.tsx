import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";
import { Pressable, Text,View } from "react-native";

type DateFieldProps = {
    value: Date | null;
    onPress:() => void;
    error?:string;
};

export function DateField({value, onPress, error}:DateFieldProps){

    return (
        <View className="gap-2">
            <Text className="font-inter text-sm text-muted">Due Date</Text>

            <Pressable
             onPress={onPress}
             className={`h-14 flex-row items-center justify-between rounded-xl bg-surface px-4 border ${error ? "border-danger" : "border-line"}}`}
            >
                <Text className={`font-inter text-base ${value ? "text-fg" : "text-muted"}`}>
                    {value ? value.toLocaleDateString("en-IN",{day:"numeric", month:"short", year:"numeric"})
                    :"Select Date"}
                </Text>
                     <Ionicons name="calendar-outline" size={20} color={colors.muted} />

            </Pressable>

      {error && <Text className="font-inter text-sm text-danger">{error}</Text>}
        </View>
    )
}