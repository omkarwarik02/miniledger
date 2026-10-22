import { View, Text, TextInput, TextInputProps } from "react-native";
import { colors } from "../constants/theme";


type InputProps = TextInputProps & {
    label?:string;
    prefix?:string;
    error?: string;
};


export function Input({label,prefix, error, ...rest}:InputProps){

    return (
        <View className="gap-2">
            {label && <Text className="font-inter text-sm text-muted">{label}</Text>}

            <View className={`h-14 flex-row items-center rounded-xl bg-surface px-4 border ${error ? "border-danger" : "border-line"}`}>
                {prefix && <Text className="font-inter-semibold text-muted mr-2">{prefix}</Text>}

                <TextInput className="flex-1 font-inter text-base text-fg" placeholderTextColor={colors.muted} {...rest} />
            </View>
            {error && <Text className="font-inter text-sm text-danger">{error}</Text>}
        </View>
    )
}