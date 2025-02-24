import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: 100,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  errorText: {
    borderColor: 'red',
    borderWidth: 1,
  },
});

export default styles;
