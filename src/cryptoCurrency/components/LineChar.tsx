import { View, TextInput } from 'react-native';

import { useState, useEffect } from "react";

import { CartesianChart, Line, useChartPressState } from "victory-native";

import Animeted, { useAnimatedProps } from "react-native-reanimated";

import { useFont } from "@shopify/react-native-skia";

import { format } from "date-fns";


interface ChartProps {
    coinHistory?: string[]
    price: number
    selectDayFilter: number
};

Animeted.addWhitelistedNativeProps({ text: true });
const AnimtetedTextInput = Animeted.createAnimatedComponent(TextInput);


export default function LineChar({ coinHistory, price, selectDayFilter }: ChartProps) {
    const t = new Date();

    const [ data, setData ] = useState([{
        date: selectDayFilter===1? format(t.setDate(t.getDate()), "MM/dd"): format(t.setDate(t.getDate() - selectDayFilter), "MM/dd"), 
        prices: price
    }]);

    const font = useFont(require("../../constants/Roboto-Medium.ttf"));

    const { state, isActive } = useChartPressState({ x: format(t.setDate(t.getDate() - selectDayFilter), "MM/dd"), y: {prices: 0}});

    const animetedPriceValue = useAnimatedProps(() => {
        return {
            text: `RS ${state.y.prices.value.value.toFixed(2)}`,
            defaultValue: ""
        };
    });

    const animetedDateValue = useAnimatedProps(() => {
        return {
            text: `${state.x.value.value}`,
            defaultValue: ""
        };
    });

    useEffect(() => {
        let dataCopy = [{date: format(t.setDate(t.getDate()), "MM/dd"), prices: price}];

        if(coinHistory) {
            coinHistory.map((coinData) => {
                dataCopy.push({date: format(new Date(coinData[0]).setDate(new Date(coinData[0]).getDate()), "MM/dd"), prices: Number(coinData[1])})
                
            });
        };

        setData(dataCopy);
    }, [coinHistory]);
    
    
    return (
        <>
            {
                coinHistory && (
                    <View className='h-80 w-full'>

                        { isActive && (
                            <View>
                                <AnimtetedTextInput
                                    editable={false}
                                    underlineColorAndroid={"transparent"}
                                    style={{ fontSize: 30, fontWeight: 'bold', color: '#FFF' }}
                                    animatedProps={animetedPriceValue}
                                ></AnimtetedTextInput>

                                <AnimtetedTextInput
                                    editable={false}
                                    underlineColorAndroid={"transparent"}
                                    style={{ fontSize: 18, color: "#606060" }}
                                    animatedProps={animetedDateValue}
                                ></AnimtetedTextInput>
                            </View>
                        )}

                        <CartesianChart 
                            data={data} 
                            xKey="date" 
                            yKeys={["prices"]}
                            
                            axisOptions={{
                                tickCount: 5,
                                font: font,
                                labelOffset: { x: 10, y: 20 },
                                labelPosition: "outset",
                                labelColor: "white",
                            
                                formatYLabel: (value) => `${value.toLocaleString(undefined, {
                                    style: "currency",
                                    currency: "BRL"
                                })}`,
                                formatXLabel: (value) => `${value}`
                                
                            }}

                            chartPressState={state}
                        >
                            {({ points }) => (
                                <Line points={points.prices} color="red" strokeWidth={2} />
                            )}
                        </CartesianChart>
                    </View>
                )
            }
        </>
    );   
};