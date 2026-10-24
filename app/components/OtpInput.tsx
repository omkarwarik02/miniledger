import { useEffect, useRef } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function OtpInput({ value, onChange }: OtpInputProps) {
  const inputRef = useRef<TextInput>(null);

  // ① Reopens the keyboard even if the input is still focused (Android back-button case)
  function focusInput() {
    const input = inputRef.current;
    if (!input) return;
    if (input.isFocused()) {
      input.blur();
      setTimeout(() => input.focus(), 50);
    } else {
      input.focus();
    }
  }

  // Open the keyboard when the OTP step appears
  useEffect(() => {
    const timer = setTimeout(focusInput, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    // ② Uses focusInput; ③ gap-2 keeps boxes apart when they shrink on narrow screens
    <Pressable onPress={focusInput} className="flex-row justify-between gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <View
          key={i}
          // ④ flex-1 + max-w-12 so 6 boxes shrink to fit 320dp screens; ⑤ stray "}" removed
          className={`flex-1 max-w-12 h-14 rounded-xl bg-surface2 border items-center justify-center ${
            i === value.length ? "border-primary" : "border-line"
          }`}
        >
          <Text className="font-inter-semibold text-xl text-fg">{value[i] ?? ""}</Text>
        </View>
      ))}

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(text) => onChange(text.replace(/\D/g, ""))}
        keyboardType="number-pad"
        maxLength={6}
        caretHidden
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        // ⑥ plain style instead of the misspelled "absoloute" class; ⑦ autoFocus removed
        style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
      />
    </Pressable>
  );
}