import React, { useState }  from 'react'
import { TextInput, View, Platform, StyleSheet } from 'react-native'
import { Colors } from '../../res/colors'

export const CoinSearch = ({ onChange }) => {
    const [query, setQuery] = useState("")

    const handleText = (query) => {
        setQuery(query)

        if(onChange){
            onChange(query)
        }
    }

    return(
        <View>
            <TextInput 
                style={[
                    styles.textInput,
                    Platform.OS == 'ios' ?
                        styles.textInputIOS :
                        styles.textInputAndroid
                ]}
                onChangeText={handleText}
                value={query}
                placeholder="Searh Coin"
                placeholderTextColor="#fff"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: Colors.charade,
        paddingLeft: 16,
        color: "#fff"
    },
    textInputAndroid: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.zircon
    },
    textInputIOS: {
        margin: 8,
        borderRadius: 8,
    }
})