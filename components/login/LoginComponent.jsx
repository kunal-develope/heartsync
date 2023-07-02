/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Card, Input, Button} from '@rneui/themed';
import {Image} from '@rneui/base';
import {loginService} from '../services/SignupService';
import alertHelper from '../../helper/alertHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginComponent = ({navigation}) => {
  const [logInLoder, setlogInLoder] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPass] = useState('');
  const loginFunction = () => {
    setlogInLoder(true);
    const userData = {
      mobile,
      password,
    };
    if (mobile !== '' && password !== '') {
      loginService(userData).then(async res => {
        alertHelper(res.message);
        try {
          await AsyncStorage.setItem(
            'userData',
            JSON.stringify(res.data[0]._id),
          );
        } catch (error) {
          alertHelper('error saving data to local storage');
          // Error saving data
        }
        setlogInLoder(false);
        if (res.message === 'login success') {
          navigation.navigate('main');
        }
      });
    } else {
      alertHelper('Validation Failed');
      setlogInLoder(false);
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        paddingTop: '15%',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#ebedf0',
      }}>
      <Card containerStyle={styles.cardStyles}>
        <Card.Title> HeartSync</Card.Title>
        <Card.Divider />

        <Input placeholder="Mobile" value={mobile} onChangeText={setMobile} />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPass}
        />
        <Button
          title="Login"
          type="clear"
          loading={logInLoder}
          onPress={() => loginFunction()}
        />
      </Card>
      <Text style={styles.copyRight}>Copyright by @HeartSync</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyles: {
    height: '55%',
    width: '80%',
    borderRadius: 18,
  },

  tinyLogo: {
    width: 150,
    height: 150,
  },
  copyRight: {
    marginTop: '32%',
  },
});

export default LoginComponent;
