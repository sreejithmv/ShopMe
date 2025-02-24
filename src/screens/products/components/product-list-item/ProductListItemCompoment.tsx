import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { GlobalContext } from '../../../../common/store';
import theme from '../../../../common/theme';
import Product from '../../../../models/product';
import styles from './style';

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({product}) => {
  const navigation = useNavigation();
  const [cart, setCart] = useContext(GlobalContext);

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('ProductDetail', {productId: product.id})
      }>
      <View style={styles.container}>
        <Image source={{uri: product.image}} style={styles.thumbnail} />
        <View style={styles.infoContainer}>
          <View style={styles.dataContainer}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.rating}>Rating: {product.rating.rate}</Text>
            <Text style={styles.price}>{product.price}</Text>
          </View>

          <TouchableHighlight
            style={[theme.buttonStyle, styles.button]}
            onPress={() => {
              if (cart.some((item: Product) => item.id === product.id)) {
                setCart(cart.filter((item: Product) => item.id !== product.id));
                return;
              }
              setCart([...cart, product]);
            }}>
            <Text style={theme.buttonText}>
              {cart.some((item: Product) => item.id === product.id) ?  'Remove' : 'Add to Cart'}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductListItem;
