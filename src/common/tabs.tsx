import * as React from 'react';
import { Platform, SafeAreaView, useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import CartScreen from '../screens/cart/CartScreen';
import DashboardScreen from '../screens/dashbaord/DashbaordScreen';
import ProductScreen from '../screens/products/Products/ProductScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const renderScene = SceneMap({
  home: DashboardScreen,
  products: ProductScreen,
  cart: CartScreen,
  profile: ProfileScreen,
});

const routes = [
  {key: 'home', title: 'Home'},
  {key: 'products', title: 'Products'},
  {key: 'profile', title: 'Profile'},
];

export default function TabViewExample() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const position = Platform.OS === 'ios' ? 'bottom' : 'top';
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white', height: 5 }}
      style={{ backgroundColor: 'orange' }}
    />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        tabBarPosition={position}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
}
