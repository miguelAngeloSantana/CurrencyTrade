import React from "react";
import {View, Text, Image} from "react-native";

export default function TabIcons({focused, icon, label, isTrade}) {
    if (isTrade) {
        return (
            <View 
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    // width: 60,
                    // height: 60,
                    // borderRadius: 30,
                    // backgroundColor: "#363636"
                }}
            >
                <Image  
                    source={icon}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: 'white'
                    }}
                />
                <Text className="text-white text-xs m-2">{label}</Text>
            </View>
        )
    } else {
        return (
            <View className="items-center justify-center">
                <Image
                    source={icon}
                    style={{
                        width: 17,
                        height: 17,
                        tintColor: focused? 'white': "#999"
                    }}
                />
                <Text style={{
                    color: focused? 'white': '#999',
                    fontSize: 12,
                    marginTop: 10
                }}>
                    {label}
                </Text>
            </View>
        )
    }
}