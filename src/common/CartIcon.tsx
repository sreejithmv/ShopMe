import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GlobalContext } from './store';

const CartIcon = () => {
  const navigation = useNavigation();
  const [cart] = useContext(GlobalContext);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
      <View style={styles.container}>
        <Text>Cart</Text>
        {cart.length !== 0 ? (
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{cart.length}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  countContainer: {
    backgroundColor: 'red',
    height: 20,
    width: 20,
    borderRadius: 50,
    position: 'absolute',
    top: -10,
    right: -15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: 'white',
  },
});

export default CartIcon;
