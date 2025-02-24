import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { GlobalContext } from '../../../common/store';
import theme from '../../../common/theme';
import Product from '../../../models/product';
import productServices from '../../../services/product.services';
import styles from './style';

type RootStackParamList = {
  ProductDetail: {productId: number};
};

type ProductDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetail'
>;

const ProductDetailScreen: React.FC = () => {
  const route = useRoute<ProductDetailScreenRouteProp>();
  const {productId} = route.params ?? 0;
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useContext(GlobalContext);

  useEffect(() => {
    // Fetch product details from an API or a local data source
    const fetchProductDetails = async () => {
      const fetchedProduct: Product = await productServices.getProductById(
        productId,
      );
      setProduct(fetchedProduct);
    };
    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{uri: product.image}} style={styles.bannerImage} />
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.productName}>{product.title}</Text>

          <View style={styles.group}>
            <Rating
              style={styles.raring}
              startingValue={product.rating.rate}
              readonly
              ratingCount={5}
              imageSize={20}
              ratingBackgroundColor="#c8c7c8"
            />
            <Text style={styles.productPrice}>
              Price: ${product.price.toFixed(2)}
            </Text>
          </View>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>
        <TouchableHighlight
          style={theme.buttonStyle}
          onPress={() => {
            if (cart.some((item: Product) => item.id === product.id)) {
              setCart(cart.filter((item: Product) => item.id !== product.id));
              return;
            }
            setCart([...cart, product]);
          }}>
          <Text style={theme.buttonText}>
            {' '}
            {cart.some((item: Product) => item.id === product.id)
              ? 'Remove'
              : 'Add to Cart'}
          </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;
