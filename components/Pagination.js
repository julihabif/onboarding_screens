import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
    useAnimatedStyle,
    interpolate,
    Extrapolate,
} from "react-native-reanimated";

export const Pagination = ({ data, x, screenWidth }) => {
    const PaginationCom = ({ i }) => {
        const animatedDotStyle = useAnimatedStyle(() => {
            const widthAnimation = interpolate(
                x.value,
                [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
                [10, 20, 10],
                Extrapolate.CLAMP
            );
            const opacityAnimation = interpolate(
                x.value,
                [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
                [0.5, 1, 0.5],
                Extrapolate.CLAMP
            );

            return {
                width: widthAnimation,
                opacity: opacityAnimation,
            };
        });

        return <Animated.View style={[styles.dot, animatedDotStyle]} />;
    };

    return (
        <View style={styles.paginationContainer}>
            {data.map((_, i) => {
                return <PaginationCom key={i} i={i} />;
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: "row",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    dot: {
        width: 10,
        height: 10,
        backgroundColor: "orange",
        marginHorizontal: 10,
        borderRadius: 5,
    },
});
