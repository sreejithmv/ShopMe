import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#fff',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bannerImage: {
      width: '100%',
      height: 300,
      resizeMode: 'cover',
    },
    detailsContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 16,
    },
    productName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    productDescription: {
      fontSize: 18,
      marginBottom: 8,
      lineHeight: 30,
    },
    productPrice: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
    },

    group: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    raring: {
      marginTop: 8,
      marginBottom: 8,
      textAlign: 'left',
    },
  });
export default styles;
