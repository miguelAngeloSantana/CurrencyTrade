import { View, Text, Image } from "react-native";

interface paramsTabIcons {
    focused: boolean
    icon: number 
    label: string 
    isTrade: boolean
    iconStyle?: {
        width:number,
        height:number,
    };
};


export default function TabIcons({ focused, icon, label, isTrade, iconStyle }: paramsTabIcons) {
    if (isTrade) {
        return (
            <View 
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: 63,
                    height: 63,
                    borderRadius: 35,
                    backgroundColor: "#363636",
                }}
            >
                <Image  
                    source={icon}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: 'white',
                        ...iconStyle
                    }}
                />
                <Text className="text-white text-xs mt-1">{label}</Text>
            </View>
        );
    } else {
        return (
            <View className="items-center justify-center">
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
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
        );
    };
};