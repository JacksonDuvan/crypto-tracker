import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import Http from '../../libs/http'
import {CoinsItem} from './CoinsItem'
import { Colors } from '../../res/colors'
import { CoinSearch } from './CoinSearch'

export const CoinsScreen = ({ navigation }) => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [allCoins, setAllCoins] = useState([])
    
    const getData = async () => {
        setLoading(true)
        try {
            const res = await Http.instance.get("https://api.coinlore.net/api/tickers/")
            setLoading(false)
            setCoins(res.data)
            setAllCoins(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handlePress = (coin) => {
        navigation.navigate('CoinDetail', { coin })
    }

    const handleSearch = (query) => {
        const coinsFiltered = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) ||
                    coin.symbol.toLowerCase().includes(query.toLowerCase())
        })

        setCoins(coinsFiltered)
    }
    return (
        <View style={styles.container}>
        <CoinSearch onChange={handleSearch} />
            {
                loading 
                    ? <ActivityIndicator 
                        style={styles.loader}
                        color="#fff" 
                        size="large"
                    />
                    : null
            }
            <FlatList 
                data={coins}
                renderItem={({ item }) => 
                    <CoinsItem 
                        {...item} 
                        onPress={() => handlePress(item)}
                /> }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade,
        // alignItems: 'center'
    },
    text: {
        color: '#fff',
    },
    btn:{
        padding: 8,
        backgroundColor: 'blue',
        borderRadius: 5,
        margin: 10,
    },
    btnText: {
        color: '#fff',
        textAlign: 'center'
    },
    loader: {
        marginTop: 60
    }
})