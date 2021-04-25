import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ScrollView, ImageBackground, Switch, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Style';
const GLOBAL = require('../Globals');

export default function SettingsScreen({ navigation, route }) {
  const [displayName, setDisplayName] = useState(GLOBAL.DISPLAY_NAME);
  const [linkedPantry, setLinkedPantry] = useState(GLOBAL.PANTRY_ID);

  // general notification setting
  const [allowNotifications, setAllowNotifications] = useState();
  const toggleAllowNotifications = () => {
    setAllowNotifications(previousState => !previousState);
    saveData('@allowNotifications', !allowNotifications);

    if (allowNotifications) {
      // Disable All Toggles
      setAllowNotifications_dayAfter(false);
      saveData('@allowNotifications_dayAfter', false);

      setAllowNotifications_expDate(false);
      saveData('@allowNotifications_expDate', false);

      setAllowNotifications_3daysBefore(false);
      saveData('@allowNotifications_3daysBefore', false);

      setAllowNotifications_weekBefore(false);
      saveData('@allowNotifications_weekBefore', false);

      setAllowNotifications_2weeksBefore(false);
      saveData('@allowNotifications_2weeksBefore', false);
    }
  }

  // Notification 1 Day After Expiration
  const [allowNotifications_dayAfter, setAllowNotifications_dayAfter] = useState();
  const toggleAllowNotifications_dayAfter = () => {
    if (allowNotifications) {
      setAllowNotifications_dayAfter(previousState => !previousState);
      saveData('@allowNotifications_dayAfter', !allowNotifications_dayAfter);
    }
  }

  // Notification on Expiration Date
  const [allowNotifications_expDate, setAllowNotifications_expDate] = useState();
  const toggleAllowNotifications_expDate = () => {
    if (allowNotifications) {
      setAllowNotifications_expDate(previousState => !previousState);
      saveData('@allowNotifications_expDate', !allowNotifications_expDate);
    }
  }

  // Notification 3 Days Before Expiration
  const [allowNotifications_3daysBefore, setAllowNotifications_3daysBefore] = useState();
  const toggleAllowNotifications_3daysBefore = () => {
    if (allowNotifications) {
      setAllowNotifications_3daysBefore(previousState => !previousState);
      saveData('@allowNotifications_3daysBefore', !allowNotifications_3daysBefore);
    }
  }

  // Notification 1 Week Before Expiration
  const [allowNotifications_weekBefore, setAllowNotifications_weekBefore] = useState();
  const toggleAllowNotifications_weekBefore = () => {
    if (allowNotifications) {
      setAllowNotifications_weekBefore(previousState => !previousState);
      saveData('@allowNotifications_weekBefore', !allowNotifications_weekBefore);
    }
  }

  // Notification 2 Weeks Before Expiration
  const [allowNotifications_2weeksBefore, setAllowNotifications_2weeksBefore] = useState();
  const toggleAllowNotifications_2weeksBefore = () => {
    if (allowNotifications) {
      setAllowNotifications_2weeksBefore(previousState => !previousState);
      saveData('@allowNotifications_2weeksBefore', !allowNotifications_2weeksBefore);
    }
  }

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (err) {
      console.error(err);
    }
  }
  
  const loadData = async () => {
    try {
      const keys = [
        '@allowNotifications',
        '@allowNotifications_dayAfter',
        '@allowNotifications_expDate',
        '@allowNotifications_3daysBefore',
        '@allowNotifications_weekBefore',
        '@allowNotifications_2weeksBefore'
      ];

      for (let i = 0; i < keys.length; i++) {
        let settingValue = true;
        if(await AsyncStorage.getItem(keys[i]) == "false")
          settingValue = false;
  
        switch (i) {
          case 0:
            setAllowNotifications(settingValue);
            break;
          case 1:
            setAllowNotifications_dayAfter(settingValue);
            break;
          case 2:
            setAllowNotifications_expDate(settingValue);
            break;
          case 3:
            setAllowNotifications_3daysBefore(settingValue);
            break;
          case 4:
            setAllowNotifications_weekBefore(settingValue);
            break;
          case 5:
            setAllowNotifications_2weeksBefore(settingValue);
            break;
        }
      }
    } catch(err) {
      console.error(err);
    }
  }

  const updateDisplayNameDb = async (value) => {
    if (GLOBAL.LOGIN_TOKEN) {
      await fetch(GLOBAL.BASE_URL + '/api/user/update/name/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "key": GLOBAL.LOGIN_TOKEN,
          "new_name": value
        })    
      }).then((response) => response.json()).then((json) => {
        status = json["Status"]
        if (status == "OK") { // successful sign up            
          GLOBAL.DISPLAY_NAME = value
        }          
      });
    }
  }

  const updatePantryIdDb = async (value) => {
    const pantryId = parseInt(value);
    if (isNaN(pantryId)) {
      Alert.alert('ERROR: Invalid Pantry ID', '\"' + value + '\" is not valid. Please enter a different pantry id.', [
        {text: 'OK'}
      ]);
    }
    else {
      if (GLOBAL.LOGIN_TOKEN) {
        await fetch(GLOBAL.BASE_URL + '/api/user/pantry/join/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "key": GLOBAL.LOGIN_TOKEN,
            "new_id": pantryId
          })    
        }).then((response) => response.json()).then((json) => {
          status = json["Status"]
          if (status == "OK") { // successful sign up            
            GLOBAL.pantryItemChange = true
          }          
        });
      }
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
	  	<SafeAreaView style={styles.safeArea}>
    <View style={settingsStyles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>

      <ScrollView>
        <Text style={settingsStyles.settingName}>Display Name</Text>
        <TextInput
          style={settingsStyles.inputField}
          placeholder="Display Name"
          placeholderTextColor="#9E9791"
          defaultValue={displayName}
          onChangeText={(value) => setDisplayName(value)}
          onEndEditing={(e) => updateDisplayNameDb(e.nativeEvent.text)}
        />
        <Text style={settingsStyles.settingName}>Pantry ID</Text>
        <TextInput
          style={settingsStyles.inputField}
          placeholder="Pantry ID"
          placeholderTextColor="#9E9791"
          defaultValue={linkedPantry.toString()}
          keyboardType="numeric"
          onChangeText={(value) => setLinkedPantry(value)}
          onEndEditing={(e) => updatePantryIdDb(e.nativeEvent.text)}
        />
        <View style={settingsStyles.toggleSetting}>
          <Text style={settingsStyles.settingName}>Push Notifications</Text>
          <Switch
            style={settingsStyles.toggleSwitch}
            trackColor={{ false: "#ffffff", true: "#5BC236" }}
            thumbColor={allowNotifications ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => toggleAllowNotifications(value)}
            value={allowNotifications}
          />
        </View>
        <View style={settingsStyles.toggleSubSetting}>
          <Text style={settingsStyles.settingName}>1 Day After Exp.</Text>
          <Switch
            style={settingsStyles.toggleSwitch}
            trackColor={{ false: "#ffffff", true: "#5BC236" }}
            thumbColor={allowNotifications_dayAfter ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => toggleAllowNotifications_dayAfter(value)}
            value={allowNotifications_dayAfter}
          />
        </View>
        <View style={settingsStyles.toggleSubSetting}>
          <Text style={settingsStyles.settingName}>Expiration Date</Text>
          <Switch
            style={settingsStyles.toggleSwitch}
            trackColor={{ false: "#ffffff", true: "#5BC236" }}
            thumbColor={allowNotifications_expDate ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => toggleAllowNotifications_expDate(value)}
            value={allowNotifications_expDate}
          />
        </View>
        <View style={settingsStyles.toggleSubSetting}>
          <Text style={settingsStyles.settingName}>3 Days Before Exp.</Text>
          <Switch
            style={settingsStyles.toggleSwitch}
            trackColor={{ false: "#ffffff", true: "#5BC236" }}
            thumbColor={allowNotifications_3daysBefore ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => toggleAllowNotifications_3daysBefore(value)}
            value={allowNotifications_3daysBefore}
          />
        </View>
        <View style={settingsStyles.toggleSubSetting}>
          <Text style={settingsStyles.settingName}>1 Week Before Exp.</Text>
          <Switch
            style={settingsStyles.toggleSwitch}
            trackColor={{ false: "#ffffff", true: "#5BC236" }}
            thumbColor={allowNotifications_weekBefore ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => toggleAllowNotifications_weekBefore(value)}
            value={allowNotifications_weekBefore}
          />
        </View>
        <View style={settingsStyles.toggleSubSetting}>
          <Text style={settingsStyles.settingName}>2 Weeks Before Exp.</Text>
          <Switch
            style={settingsStyles.toggleSwitch}
            trackColor={{ false: "#ffffff", true: "#5BC236" }}
            thumbColor={allowNotifications_2weeksBefore ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => toggleAllowNotifications_2weeksBefore(value)}
            value={allowNotifications_2weeksBefore}
          />
        </View>
      </ScrollView>
    </View>
		  	</SafeAreaView>
  );
}

const settingsStyles = StyleSheet.create({
  container: {
	backgroundColor: '#000',
    overflow: 'visible',
    height: "100%"
  },
  toggleSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginRight: '7.5%'
  },
  toggleSubSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginLeft: '7.5%',
    marginRight: '7.5%'
  },
  settingName: {
    fontSize: 24,
    color: '#fff',
    margin: '7.5%',
    marginBottom: 0
  },
  inputField: {
		width: '85%',
		fontSize: 22,
		color: '#9E9791',
		margin: '7.5%',
    marginTop: 10,
    marginBottom: 0,
		padding: 3,
		paddingLeft: 0,
		borderColor: '#fff',
		borderBottomWidth: 1
	}
});