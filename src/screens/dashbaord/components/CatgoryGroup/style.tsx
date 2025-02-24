import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      textTransform: 'capitalize',
    },
    imageContainer: {
      alignItems: 'center',
      marginRight: 15,
      padding: 30,
      position: 'relative',
      borderRadius: 10,
    },
    image: {
      width: 200,
      height: 100,
      borderRadius: 10,
    },

    rating: {
      position: 'absolute',
      top: 10,
      left: 10,
      backgroundColor: 'transparent',
    },

    group: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    categoryName: {
      position: 'absolute',
      bottom: 10,
      left: 10,
      fontSize: 16,
      color: 'white',
      textAlign: 'left',
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
  });

export default styles;
