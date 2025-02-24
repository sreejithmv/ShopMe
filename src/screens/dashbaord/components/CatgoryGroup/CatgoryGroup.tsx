import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import theme from '../../../../common/theme';
import Product from '../../../../models/product';
import productServices from '../../../../services/product.services';
import styles from './style';

interface CategoryGroupProps {
  categoryName: String;
}

const CategoryGroup: React.FC<CategoryGroupProps> = ({categoryName}) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    productServices.getProductsByCategory(categoryName).then(resp => {
      const productList = resp.map(
        (product: any) =>
          new Product(
            product.id,
            product.title,
            product.price,
            product.description,
            product.category,
            product.image,
            product.rating,
          ),
      );
      setProducts(productList);
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <Text style={styles.header}>{categoryName}</Text>
        <Text style={theme.linkText}>View all</Text>
      </View>
      <FlatList
        horizontal
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableHighlight
            key={item.id.toString()}
            onPress={() => {
              navigation.navigate('ProductDetail', {productId: item.id});
            }}>
            <View style={styles.imageContainer}>
              <Image source={{uri: item.image}} style={styles.image} />
              <View style={styles.overlay} />
              <Rating
                startingValue={item.rating.rate}
                readonly
                ratingCount={5}
                imageSize={20}
                style={styles.rating}
              />
              <Text style={styles.categoryName}>{item.title}</Text>
            </View>
          </TouchableHighlight>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoryGroup;
