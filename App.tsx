/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import ProfileComponent from './components/profile/ProfileComponent';
import SignupComponent from './components/signup/SignupComponent';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainComponent from './components/main/MainComponent';
import LoginComponent from './components/login/LoginComponent';
import EditProfile from './components/editProfile/EditProfile';
import {Button} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: '#ebedf0',
      }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="signup">
          <Stack.Screen
            options={{headerShown: false}}
            name="signup"
            component={SignupComponent}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileComponent}
            options={({navigation, route}) => ({
              // Add a placeholder button without the `onPress` to avoid flicker
              headerRight: () => (
                <Button
                  type="clear"
                  title="Logout"
                  onPress={() => {
                    AsyncStorage.clear();
                    navigation.popToTop();
                  }}
                />
              ),
            })}
          />
          <Stack.Screen
            name="HeartSync"
            component={MainComponent}
            options={({navigation, route}) => ({
              // Add a placeholder button without the `onPress` to avoid flicker
              headerRight: () => (
                <Button
                  type="clear"
                  title="Profile"
                  onPress={() => {
                    navigation.navigate('Profile');
                  }}
                />
              ),
            })}
          />
          <Stack.Screen name="Login" component={LoginComponent} />
          <Stack.Screen name="editprofile" component={EditProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
