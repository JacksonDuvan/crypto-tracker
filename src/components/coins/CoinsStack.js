import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { CoinsScreen } from './CoinsScreen'
import { CoinDetailScreen } from './CoinDetailScreen'
import { Colors } from '../../res/colors'

const Stack = createStackNavigator()

export const CoinsStack = () => {
    return(
        <Stack.Navigator 
         screenOptions={{
             headerStyle: {
                 backgroundColor: Colors.blackPearl,
                 shadowOpacity: 0,
             },
            headerTintColor: Colors.white
         }}
        >

            <Stack.Screen 
                name="Coins" 
                component={CoinsScreen}
            />

            <Stack.Screen 
                name="CoinDetail" 
                component={CoinDetailScreen}
            />
        </Stack.Navigator>
    )
}