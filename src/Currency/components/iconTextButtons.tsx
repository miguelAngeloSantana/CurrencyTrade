import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";

interface PropsButton {
    label: string 
    icon: number 
    onPress(): void
    conteinerStyle?: {
        marginTop: number
    } 
}

export default function IconTextButtons({label, icon, onPress, conteinerStyle}: PropsButton) {
    return (
        <TouchableOpacity
            className="flex-row items-center justify-center bg-white"
            style={{height: 50, borderRadius: 12, ...conteinerStyle}}
            onPress={onPress}
        >
            <Image 
                source={icon}
                resizeMode="contain"
                className="w-5 h-5"
            />

            <Text className="ml-2">{label}</Text>
        </TouchableOpacity>
    )
}