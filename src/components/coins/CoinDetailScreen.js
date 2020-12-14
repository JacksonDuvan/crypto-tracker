import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  SectionList,
  Pressable,
  Alert
} from 'react-native';
import {Colors} from '../../res/colors';
import Http from '../../libs/http';
import {CoinMarketItem} from '../coinDetail/CoinMarketItem';
import Storage from '../../libs/storage';

export const CoinDetailScreen = (props) => {
  const [coin, setCoin] = useState({});
  const [markets, setMarkets] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  // () => {
  //   try {
  //     const key = `favorite=${coin.id}`
  //     const item = Storage.instance.get(key)
  //     return item != null ? JSON.parse(item)  : false
  //   } catch (error) {
  //     return false
  //   }
  // }

  const getSymbolIcon = (name) => {
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  const getSections = (coin) => {
    const data = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];
    return data;
  };

  const getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);

    setMarkets(markets);
  };

  const getFavorite = async (coin) => {
    try {
      const key = `favorite=${coin.id}`;
      await Storage.instance.get(key).then((value) => {
      if(value){
        setIsFavorite(value)
      }
    })
    } catch (error) {
      console.log(`get favorites err ${error}`)
    }
  };

  useEffect(() => {
    const {coin} = props.route.params;
    props.navigation.setOptions({title: coin.symbol});
    
    getFavorite(coin)
    setCoin(coin);
    getMarkets(coin.id);
  }, []);


  const addFavorite = async () => {
    const coinFavorite = JSON.stringify(coin);
    const key = `favorite=${coin.id}`;

    const stored = await Storage.instance.store(key, coinFavorite);
    
    if (stored) {
      setIsFavorite(true);
    }
    
  };

  const removeFavorite = () => {

    Alert.alert("Remove favorite", "Are you sure?", [
      {
        text: "cancel",
        onPress: () => {},
        style: "cancel"
      },
      {
        text: "Remove",
        onPress: () => {
          const key = `favorite=${coin.id}`;

          Storage.instance.remove(key);

          setIsFavorite(false);
        },
        style: "destructive"
      }
    ])
  };

  const toggleFavorite = async () => {
    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image
            style={styles.iconImg}
            source={{uri: getSymbolIcon(coin.name)}}
          />
          <Text style={styles.title}>{coin.name}</Text>
        </View>

        <Pressable
          onPress={toggleFavorite}
          style={[
            styles.btnFavorite,
            isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
          ]}>
          <Text style={styles.btnFavoriteText}>
            {isFavorite ? 'Remove favorite' : 'Add favorite'}
          </Text>
        </Pressable>
      </View>
      <SectionList
        style={styles.section}
        sections={getSections(coin)}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text styles={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />

      <Text style={styles.marketTitle}>Markets</Text>

      <FlatList
        style={styles.list}
        keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
        data={markets}
        renderItem={({item}) => <CoinMarketItem item={item} />}
        horizontal={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  row: {
    flexDirection: 'row',
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: 8,
  },
  section: {
    maxHeight: 220,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  marketTitle: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 16,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: Colors.white,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
});
