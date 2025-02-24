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
import ModalActivityIndicator from '../../common/loading';
import theme from '../../common/theme';
import User from '../../models/user';
import usersServices from '../../services/users.services';
import styles from './style';

function RegistrationScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [screenIsWaiting, setScreenIsWaiting] = React.useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onRegisterPress = () => {
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      userName.length === 0 ||
      isEmailValid === false
    ) {
      Alert.alert('Please fill all the fields');
      return;
    } else {
      setScreenIsWaiting(true);
      const user: User = {
        email,
        username: email,
        password: password,
        name: { firstname: firstName, lastname: lastName },
        address: {
          street: '',
          city: '',
          zipcode: '',
          number: 0,
          geolocation: { lat: '', long: '' },
        },
        phone: '',
        id: 0,
        __v: 0,
      };

      usersServices.register(user).then(response => {
        if (response) {
          Alert.alert(
            'Registration Successful',
            'Registration Successful. Please login with your new credentials.',
            [{text: 'OK', onPress: () => navigation.goBack()}],
          );
          setScreenIsWaiting(true);
        } else {
          setScreenIsWaiting(true);
          Alert.alert('Registration failed. Please try again.');
        }
      });
    }
  };

  return (
    <View style={backgroundStyle}>
      <ModalActivityIndicator
        loadingMessage={'Registering user'}
        show={screenIsWaiting}
      />
      <ScrollView style={backgroundStyle}>
        <View style={[styles.container, backgroundStyle]}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>ShopMe</Text>
          </View>
          <Text style={styles.welcomeText}>Register as New user</Text>
          <View style={theme.inputContainer}>
            <TextInput
              style={theme.input}
              placeholder="First Name"
              placeholderTextColor="#888"
              autoCapitalize="none"
              onChangeText={text => setFirstName(text)}
            />
            <TextInput
              style={theme.input}
              placeholder="Last Name"
              placeholderTextColor="#888"
              autoCapitalize="none"
              onChangeText={text => setLastName(text)}
            />
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
            <TextInput
              style={theme.input}
              placeholder="Username"
              placeholderTextColor="#888"
              autoCapitalize="none"
              onChangeText={text => setUserName(text)}
            />
            <TextInput
              style={theme.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={text => setPassword(text)}
            />

            <TouchableHighlight
              disabled={
                firstName.length === 0 ||
                lastName.length === 0 ||
                email.length === 0 ||
                password.length === 0 ||
                userName.length === 0 ||
                !isEmailValid
              }
              style={theme.buttonStyle}
              onPress={() => onRegisterPress()}>
              <Text style={theme.buttonText}>Login</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default RegistrationScreen;
