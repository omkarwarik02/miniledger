import { Pressable, Text, ActivityIndicator } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export function Button({ title, onPress, disabled, loading }: ButtonProps) {
  const isDisabled = Boolean(disabled || loading);

  return (
    <Pressable
      onPress={() => {
        if (!isDisabled) onPress();
      }}
      accessibilityState={{ disabled: isDisabled }}
      className="bg-primary h-[52px] w-full rounded-[14px] items-center justify-center"
      style={({ pressed }) => ({ opacity: isDisabled ? 0.5 : pressed ? 0.8 : 1 })}
    >
      {loading ? (
        <ActivityIndicator color="#0B0F14" />
      ) : (
        <Text className="font-inter-semibold text-[16px] text-[#0B0F14]">{title}</Text>
      )}
    </Pressable>
  );
}