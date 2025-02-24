import React from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableHighlight,
    useColorScheme,
    View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import theme from '../../common/theme';
import styles from './style';

function ForgetPasswordScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  const [email, setEmail] = React.useState('');
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [screenIsWaiting, setScreenIsWaiting] = React.useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onRegisterPress = () => {
    if (email.length === 0 || isEmailValid === false) {
      Alert.alert('Please fill all the fields');
      return;
    } else {
      setScreenIsWaiting(true);
      Alert.alert(
        'Registration Successful',
        'Registration Successful. Please login with your new credentials.',
        [{text: 'OK', onPress: () => navigation.goBack()}],
      );
    }
  };

  return (
    <View style={backgroundStyle}>
      <ScrollView style={backgroundStyle}>
        <View style={[styles.container, backgroundStyle]}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>ShopMe</Text>
          </View>
          <Text style={styles.welcomeText}>Enter your email id</Text>
          <View style={theme.inputContainer}>
            <TextInput
              style={[theme.input, isEmailValid ? {} : {borderColor: 'red'}]}
              placeholder="Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={text => {
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                if (reg.test(text) === false) {
                  setIsEmailValid(false);
                  return false;
                } else {
                  setIsEmailValid(true);
                  setEmail(text);
                  console.log('Email is Correct');
                }
              }}
            />

            <TouchableHighlight
              disabled={email.length === 0 || !isEmailValid}
              style={theme.buttonStyle}
              onPress={() => onRegisterPress()}>
              <Text style={theme.buttonText}>Reset Password</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default ForgetPasswordScreen;
