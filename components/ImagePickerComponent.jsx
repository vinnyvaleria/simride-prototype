import 'react-native-gesture-handler';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Image } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { SubmitButton } from '.';

export default class ImagePickerComponent extends React.Component {
  state = {
    image: null,
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  
  render() {
    let { image } = this.state;

    return (
      <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
        <SubmitButton 
          title='Upload image' 
          onPress={this._pickImage} 
          onBlur={this.props.onBlur}
        />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginVertical: 20, }} />}
      </View>
    );
  }
}