/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {Text, Tab, TabView, Button} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {profileService} from '../services/SignupService';
import MainComponent from '../main/MainComponent';

const ProfileComponent = ({navigation}) => {
  const [userProfile, setUserProfile] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [index, setIndex] = useState(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    retrieveUserData();
  }, []);

  const retrieveUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        // We have data!!
        const userDataFromLocalStorage = {userId: JSON.parse(value)};
        profileService(userDataFromLocalStorage)
          .then(resp => {
            setRefreshing(false);
            console.log(resp);
            setUserProfile(resp || {});
          })
          .catch(err => {
            console.log('eerrrrr', err);
          });
      }
    } catch (error) {
      console.log('error', error);
      // Error retrieving data
    }
  };
  useEffect(() => {
    retrieveUserData();
  }, []);
  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      onRefresh();
    });
    return focusHandler;
  }, [navigation]);
  const onButtonClicked = () => {
    navigation.navigate('editprofile', userProfile);
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Image
            style={styles.tinyLogo}
            source={require('../../images/heartsync.png')}
          />
          <Button
            buttonStyle={{
              alignSelf: 'flex-end',
              backgroundColor: '#ebedf0',
            }}
            radius={'sm'}
            type="clear"
            onPress={onButtonClicked}>
            Edit Profile
          </Button>
          <Text style={styles.userText}>Name:{userProfile?.fullName}</Text>
          <Text style={styles.userText}>Contact:{userProfile?.mobile}</Text>
          <Text style={styles.userText}>{userProfile?.bio}</Text>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.profileCard}>
        <Tab
          value={index}
          onChange={e => setIndex(e)}
          indicatorStyle={{
            backgroundColor: 'white',
            height: 2,
          }}
          variant="primary">
          <Tab.Item title="Interested" titleStyle={{fontSize: 12}} />
          <Tab.Item title="Interested in you" titleStyle={{fontSize: 12}} />
        </Tab>
        <TabView
          containerStyle={styles.tabView}
          value={index}
          onChange={setIndex}
          animationType="spring">
          <TabView.Item style={{backgroundColor: '#ebedf0', width: '100%'}}>
            <MainComponent />
          </TabView.Item>
          <TabView.Item style={{backgroundColor: '#ebedf0', width: '100%'}}>
            <MainComponent />
          </TabView.Item>
        </TabView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebedf0',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#ebedf0',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 250,
    height: 250,
    marginBottom: -35,
  },
  profileCard: {
    width: '100%',
    height: '55%',
  },
  userText: {
    padding: 0,
    marginTop: 0,
  },
  tabView: {},
});

export default ProfileComponent;
