import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StatusBar,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import theme from '../../../common/theme';
import Product from '../../../models/product';
import productServices from '../../../services/product.services';
import ProductListItem from '../components/product-list-item/ProductListItemCompoment';
import styles from './style';

function ProductScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    productServices.getAllProducts().then(resp => {
      setProducts(resp);
      setFilteredProducts(resp);
    });
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [searchQuery, products]);

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <TextInput
        placeholder="Search products"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        style={[theme.input, styles.input]}
      />
      <View>
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ProductListItem product={item} />}
        />
      </View>
    </View>
  );
}

export default ProductScreen;
