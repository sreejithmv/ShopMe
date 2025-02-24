import React from 'react';
import { Text, View } from 'react-native';
import styles from './style';

interface WelcomeComponentProps {
    userName: string;
}

const WelcomeComponent: React.FC<WelcomeComponentProps> = ({ userName }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Welcome, <Text style={styles.message}>{userName}</Text>!</Text>

        </View>
    );
};

export default WelcomeComponent;
