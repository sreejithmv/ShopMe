import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CartIcon from './src/common/CartIcon';
import Store from './src/common/store';
import TabViewExample from './src/common/tabs';
import CartScreen from './src/screens/cart/CartScreen';
import EditProfile from './src/screens/edit-profile/EditProfile';
import ForgetPasswordScreen from './src/screens/forget-password/ForgetPasswordScreen';
import LoginScreen from './src/screens/login/LoginScreen';
import ProductDetailScreen from './src/screens/product-detail/ProductDetail/ProductDetailScreen';
import RegistrationScreen from './src/screens/registration/RegistrationScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Store>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen
            name="Dashboard"
            component={TabViewExample}
            options={{title: 'ShopMe',  headerRight: () => <CartIcon />}}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{title: 'Product Detail', headerRight: () => <CartIcon />}}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              title: 'Edit Profile',
            }}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPasswordScreen}
            options={{
              title: 'Forget Password',
            }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{
              title: 'Cart',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Store>
  );
}
