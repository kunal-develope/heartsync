/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Card, Input, Button} from '@rneui/themed';
import {Image} from '@rneui/base';
import {editProfileService, loginService} from '../services/SignupService';
import alertHelper from '../../helper/alertHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({route, navigation}) => {
  const [fullName, setFullName] = useState(route.params.fullName);
  const [mobile, setMobile] = useState(route.params.mobile);
  const [bio, setBio] = useState(route.params.bio || '');
  const updateUserDetails = () => {
    const data = {
      fullName,
      mobile,
      bio,
      password: route.params.password,
      userId: route.params._id,
    };
    editProfileService(data)
      .then(resp => {
        console.log('dataa', resp);
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.editProfile}>
      <Image style={styles.tinyLogo} source={{uri: route.params.profilePic}} />
      <Text>Full Name</Text>
      <Input value={fullName} onChangeText={setFullName} />
      <Text>Mobile</Text>
      <Input
        disabled={true}
        value={JSON.stringify(mobile)}
        onChangeText={setMobile}
      />
      <Text>Bio</Text>
      <Input value={bio} onChangeText={setBio} />

      <Button
        buttonStyle={{alignSelf: 'flex-end', backgroundColor: '#ebedf0'}}
        radius={'sm'}
        type="clear"
        onPress={() => updateUserDetails()}>
        Save
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  tinyLogo: {
    width: 250,
    height: 250,
    marginBottom: -35,
  },
  editProfile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default EditProfile;
