import { StyleSheet } from 'react-native';

const theme = StyleSheet.create({
  inputContainer: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  linkText: {
    color: 'orange',
  },
  buttonStyle: {
    marginTop: 20,
    padding: 12,
    backgroundColor: 'orange',
    borderRadius: 5,
    width: '100%',
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default theme;
