import React, { useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import theme from '../../common/theme';
import User from '../../models/user';
import usersServices from '../../services/users.services';

const ProfileCard = (prop: {title: string; value: string}) => {
  return (
    <View style={styles.profileInfoItem}>
      <Text style={styles.profileTitle}>{prop.title}</Text>
      <Text style={styles.profileText}>{prop.value}</Text>
    </View>
  );
};

function ProfileScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const [user, setUser] = React.useState<User>();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    usersServices.getUser(3).then(resp => {
      setUser(new User(resp));
      usersServices.setUser(new User(resp));
    });
  });


  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView style={backgroundStyle}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/profile-icon.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>
            {user?.name?.firstname} {user?.name?.lastname}
          </Text>
          <View style={styles.profileInfoContainer}>
            <ProfileCard title="Username" value={user?.username} />
            <ProfileCard title="Phone" value={user?.phone} />
            <ProfileCard
              title="Address"
              value={`${user?.address?.street}, ${user?.address?.city}, ${user?.address?.zipcode}`}
            />
            <ProfileCard title="Email" value={user?.email} />
            <ProfileCard title="Phone" value={user?.phone} />
          </View>
          <TouchableHighlight
            style={[theme.buttonStyle, styles.editButton]}
            onPress={() => navigation.navigate('EditProfile')}>
            <Text style={theme.buttonText}>Edit Profile</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  profileInfoContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'left',
  },

  profileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
  },

  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'capitalize',
  },

  profileInfoItem: {
    marginBottom: 20,
  },

  editButton: {
    width: '50%',
    alignItems: 'center',
    margin: 16,
  },
});

export default ProfileScreen;
