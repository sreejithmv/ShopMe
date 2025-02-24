import React, { useEffect } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import User from '../../models/user';
import productServices from '../../services/product.services';
import usersServices from '../../services/users.services';
import CategoryGroup from './components/CatgoryGroup/CatgoryGroup';
import WelcomeComponent from './components/WelcomeComponent/WelcomeComponent';
import styles from './style';

function DashboardScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [user, setUser] = React.useState<User>();
  const [categories, setCategories] = React.useState<String[]>([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    usersServices.getUser(3).then(resp => {
      setUser(new User(resp));
      usersServices.setUser(new User(resp));
    });
    productServices.getProductCategory().then(resp => {
      setCategories(resp);
    });
  });

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <ScrollView style={backgroundStyle}>
        <Image
          style={styles.banner}
          source={{
            uri: 'https://img.freepik.com/premium-photo/photocomposition-horizontal-shopping-banner-with-woman-big-smartphone_23-2151201773.jpg',
          }}
        />
        <View style={styles.container}>
          <WelcomeComponent
            userName={`${user?.name.firstname} ${user?.name.lastname}`}
          />
          {categories.map((category, index) => (
            <TouchableHighlight key={index} onPress={() => {}}>
              <CategoryGroup key={index} categoryName={category} />
            </TouchableHighlight>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default DashboardScreen;
