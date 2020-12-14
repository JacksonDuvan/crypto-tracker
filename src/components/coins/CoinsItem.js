import React from 'react'
import {View, Text, StyleSheet, Image, Pressable} from 'react-native'
import { Colors } from '../../res/colors'

export const CoinsItem = ({ name, symbol, percent_change_1h, price_usd, onPress }) => {

    const getImgArrow = () => {
        if(percent_change_1h > 0){
            return require("../../assets/arrow_up.png")
        } else {
            return require("../../assets/arrow_down.png")
        }
    }

    return(
        <Pressable onPress={onPress} style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.symbolText}>{symbol}</Text>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.priceText}>{`$${price_usd}`}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.percentText}>{percent_change_1h}</Text>
                <Image 
                 style={styles.imgIcon}
                 source={getImgArrow()}
                />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        borderBottomColor: Colors.zircon,
        borderBottomWidth: 1
    },
    row: {
      flexDirection: "row",
    },
    symbolText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginRight: 8
    },
    nameText: {
        color: "#fff",
        fontSize: 14,
        marginRight: 16
    },
    priceText: {
        color: "#fff",
        fontSize: 14
    },
    percentText: {
        color: "#fff",
        fontSize: 12,
        marginRight: 8
    },
    imgIcon: {
        width: 22,
        height: 22
    }
})