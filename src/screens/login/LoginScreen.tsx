import React from 'react';
import {
  Alert,
  Text,
  TouchableHighlight,
  View,
  useColorScheme,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { TextInput, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ModalActivityIndicator from '../../common/loading';
import theme from '../../common/theme';
import usersServices from '../../services/users.services';
import styles from './style';

function LoginScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [screenIsWaiting, setScreenIsWaiting] = React.useState(false);

  const onLoginPress = () => {
    setScreenIsWaiting(true);
    if (username.length === 0 || password.length === 0) {
      return;
    }

    usersServices
      .login(username, password)
      .then(response => {
        if (response.token) {
          navigation.navigate('Dashboard', {token: response.token});
        } else {
          Alert.alert('Login failed. Please check your credentials.');
        }
        setScreenIsWaiting(false);
      })
      .catch(() => {
        setScreenIsWaiting(false);
        Alert.alert('Login failed. Please check your credentials.');
      });
  };

  return (
    <View style={[styles.container, backgroundStyle]}>
      <ModalActivityIndicator loadingMessage={'Logging in user'} show={screenIsWaiting} />
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>ShopMe</Text>
      </View>
      <Text style={styles.welcomeText}>Welcome to ShopMe</Text>
      <View style={theme.inputContainer}>
        <TextInput
          style={theme.input}
          placeholder="Username"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={theme.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />
        <TouchableHighlight
          activeOpacity={
            username.length === 0 || password.length === 0 ? 0.7 : 1
          }
          disabled={username.length === 0 || password.length === 0}
          style={theme.buttonStyle}
          onPress={() => onLoginPress()}>
          <Text style={theme.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
      <View style={theme.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Registration', {action: () => navigation.navigate('Cart')})}>
          <Text style={theme.linkText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgetPassword')}>
          <Text style={theme.linkText}>Forget Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen;
