// Primary button: full-width pressable styled with NativeWind, with pressed, disabled, and loading states.
import { Pressable, Text, ActivityIndicator } from "react-native";
import { colors } from "../constants/theme";

type buttonProps = {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
};

export function Button({ title, onPress, disabled, loading }: buttonProps) {
    const isDisabled = disabled || loading;

    return (
        <Pressable
            onPress={onPress}
            disabled={isDisabled}
            className={`bg-primary h-[52px] w-full rounded-[14px] items-center justify-center p-0.5 active:opacity-80 ${
                isDisabled ? "opacity-50" : ""
            }`}
        >
            {loading ? (
                // ActivityIndicator takes a color prop, not a style, so it still reads from the theme.
                <ActivityIndicator color={colors.bg} />
            ) : (
                <Text className="text-base font-semibold">{title}</Text>
            )}
        </Pressable>
    );
}
