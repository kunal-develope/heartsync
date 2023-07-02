/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, Card, Input, Button} from '@rneui/themed';
import {getUsers} from '../services/SignupService';

const MainComponent = ({navigation}) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then(resp => {
      setUsers(resp);
    });
  }, []);
  return (
    <View>
      <ScrollView>
        {users.map((user, index) => {
          return (
            <Card containerStyle={styles.cardStyles} key={index}>
              <Text style={{textAlign: 'center', padding: 10}} h4>
                {user.fullName}
              </Text>
              <Card.Divider />
              {/* <Card.Image
                style={{padding: 0, height: '89%'}}
                source={{
                  uri: user.profilePic,
                }}
              /> */}
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  cardStyles: {
    height: 250,
    width: '93%',
    borderRadius: 18,
  },
});
export default MainComponent;
