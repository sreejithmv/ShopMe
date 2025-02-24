import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ModalActivityIndicator from '../../common/loading';
import theme from '../../common/theme';
import usersServices from '../../services/users.services';
import styles from './style';

const EditProfile = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  let user = usersServices.getLoggedInUser();
  const [firstName, setFirstName] = React.useState(user.name.firstname);
  const [lastName, setLastName] = React.useState(user.name.lastname);
  const [email, setEmail] = React.useState(user.email);
  const [phone, setPhone] = React.useState(user.phone);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [screenIsWaiting, setScreenIsWaiting] = React.useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onEditPress = () => {
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      phone.length === 0 ||
      isEmailValid === false
    ) {
      Alert.alert('Please fill all the fields');
      return;
    } else {
      setScreenIsWaiting(true);

      user.email = email;
      user.name.firstname = firstName;
      user.name.lastname = lastName;
      user.phone = phone;
      usersServices
        .updateUser(user)
        .then(response => {
          if (response) {
            Alert.alert(
              'Profile Edited Successful',
              'New profile information are updated Successful.',
              [{text: 'OK', onPress: () => navigation.goBack()}],
            );
            setScreenIsWaiting(false);
          } else {
            setScreenIsWaiting(false);
            Alert.alert('Edit Profile failed. Please try again.');
          }
        })
        .catch(err => {
          setScreenIsWaiting(false);
          console.log(err);
          Alert.alert('Edit Profile failed. Please try again');
        });
    }
  };

  return (
    <View>
      <ModalActivityIndicator
        loadingMessage={'Editing profile...'}
        show={screenIsWaiting}
      />
      <ScrollView style={backgroundStyle}>
        <View style={[styles.container, backgroundStyle]}>
          <Text style={styles.welcomeText}>Edit Profile</Text>
          <View style={theme.inputContainer}>
            <TextInput
              style={theme.input}
              placeholder="First Name"
              placeholderTextColor="#888"
              autoCapitalize="none"
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
            <TextInput
              style={theme.input}
              placeholder="Last Name"
              placeholderTextColor="#888"
              autoCapitalize="none"
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
            <TextInput
              style={theme.input}
              placeholder="Phone"
              keyboardType="phone-pad"
              placeholderTextColor="#888"
              autoCapitalize="none"
              value={phone}
              onChangeText={text => setPhone(text)}
            />
            <TextInput
              style={[theme.input, isEmailValid ? {} : {borderColor: 'red'}]}
              placeholder="Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
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
              disabled={
                firstName.length === 0 ||
                lastName.length === 0 ||
                email.length === 0 ||
                phone.length === 0 ||
                !isEmailValid
              }
              style={theme.buttonStyle}
              onPress={() => onEditPress()}>
              <Text style={theme.buttonText}>Edit Profile</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;
