import { Alert, TouchableHighlight } from 'react-native';

const HeaderRightButton = () => (
    <TouchableHighlight onPress={() => Alert.prompt('This is a button!')} >
      Cart
    </TouchableHighlight>
  );

export default HeaderRightButton;
