import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { FavoritesEmptyState } from './FavoritesEmptyState'
import { CoinsItem } from '../coins/CoinsItem'
import { Colors } from '../../res/colors'
import Storage from '../../libs/storage'

export const FavoritesScreen = ({navigation}) => {

    const [favs, setFavs] = useState([])

    const getFavorites = async () => {
        try {
            const allKeys = await Storage.instance.getAllKeys()

             const keys = allKeys.filter((key) => key.includes('favorite='));

            const favs = await Storage.instance.multiGet(keys)

            const favorites = favs.map(fav => JSON.parse(fav[1]))
            console.log(favorites)
            setFavs(favorites)
        } catch (error) {
            console.log("get favorites err", error)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getFavorites()
        });
    return () => navigation.removeListener('focus', () => {
            getFavorites()
    });;
        
    }, [navigation])

    const handlePress = (coin) => {
        navigation.navigate("CoinDetail", { coin })
    }

    return(
        <View style={styles.container}>
        {
            favs.length == 0 
                ?<FavoritesEmptyState/>
                : null 
        }
        {
            favs.length > 0 
                ? <FlatList
                    data={favs}
                    renderItem={({ item }) => <CoinsItem {...item} onPress={() => handlePress(item)}/>}
                />
                : null
        }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.charade,
        flex: 1,
    }
})