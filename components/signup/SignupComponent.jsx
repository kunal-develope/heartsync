/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Card, Input, Button} from '@rneui/themed';
import {Image} from '@rneui/base';
import {signupService} from '../services/SignupService';
import alertHelper from '../../helper/alertHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../splash/splash';

const SignupComponent = ({navigation}) => {
  const [signUpLoder, setSignUpLoader] = useState(false);
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPass] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const signUpFunction = () => {
    if (mobile !== '' && fullName !== '' && password !== '') {
      setSignUpLoader(true);
      const data = {
        mobile,
        password,
        fullName,
      };
      signupService(data).then(res => {
        alertHelper(res.message);
        setSignUpLoader(false);
        if (res.message === 'user registered') {
          navigation.navigate('login');
        }
      });
    } else {
      alertHelper('Validation Failed');
    }
  };
  const alreadyUserText = () => {
    navigation.navigate('login');
  };
  useEffect(() => {
    retrieveUserData();
  }, []);
  const retrieveUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        // We have data!!
        setTimeout(() => {
          navigation.navigate('main');
        }, 2900);
      }
    } catch (error) {
      console.log('error', error);
      // Error retrieving data
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3200); // Display the splash screen for 2 seconds
  }, []);
  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <View
      style={{
        display: 'flex',
        paddingTop: '15%',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#ebedf0',
      }}>
      <Image
        style={styles.tinyLogo}
        source={require('../../images/heartsync.png')}
      />
      <Card containerStyle={styles.cardStyles}>
        <Card.Title> HeartSync</Card.Title>
        <Card.Divider />
        <Input
          placeholder="Full name"
          value={fullName}
          onChangeText={setFullName}
        />
        <Input placeholder="Mobile" value={mobile} onChangeText={setMobile} />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPass}
        />
        <Button
          title="Signup"
          type="clear"
          loading={signUpLoder}
          onPress={() => signUpFunction()}
        />
        <Text style={styles.alreadyUserText} onPress={alreadyUserText}>
          Already a user? login here!
        </Text>
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
  alreadyUserText: {
    textAlign: 'right',
    marginTop: 15,
  },
  tinyLogo: {
    width: 150,
    height: 150,
  },
  copyRight: {
    marginTop: '32%',
  },
});
export default SignupComponent;
