import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { GlobalContext } from '../../common/store';
import theme from '../../common/theme';
import ProductListItem from '../products/components/product-list-item/ProductListItemCompoment';

function CartScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [cart, setCart] = useContext(GlobalContext);
  const navigation = useNavigation();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <FlatList
          data={cart}
          style={styles.list}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ProductListItem product={item} />}
        />
        <TouchableHighlight
          disabled={cart.length === 0}
          style={theme.buttonStyle}
          onPress={() => {
            Alert.alert(
              'Order Placed',
              'Your order has been placed successfully',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    setCart([]);
                    navigation.goBack();
                  },
                },
              ],
            );
          }}>
          <Text style={theme.buttonText}>Place Order</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '98%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  list: {
    width: '100%',
  },
});

export default CartScreen;
