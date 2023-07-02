/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {Text} from '@rneui/themed';
import React from 'react';
import {View, Image, StyleSheet, ImageBackground} from 'react-native';

const SplashScreen = () => (
  <View style={styles.container}>
    <ImageBackground
      source={require('../../images/signup.png')} // Replace with your image path
      style={styles.imageBackground}>
      <Image
        source={require('../../images/heartsync.png')}
        style={styles.image}
      />
      <Text h2>HeartSync</Text>
      <Text h4>Discover Love, Your Way!!</Text>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',

    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'stretch', // Adjust the image to cover the entire background
    justifyContent: 'center',
    alignItems: 'center', // Align content vertically in the center
  },
});

export default SplashScreen;
