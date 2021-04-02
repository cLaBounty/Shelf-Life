import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ScrollView, ImageBackground, Switch } from 'react-native';
import styles from '../Style';

export default function SettingsScreen({ navigation, route }) {
  const [username, setUsername] = useState(route.params.username);
  const [linkedPantry, setLinkedPantry] = useState("");

  // general notification setting
  const [allowNotifications, setAllowNotifications] = useState(true);
  const toggleAllowNotifications = () => {
    setAllowNotifications(previousState => !previousState);
    if (allowNotifications) {
      // Disable All Toggles
      setAllowNotifications_dayAfter(false);
      setAllowNotifications_expDate(false);
      setAllowNotifications_3daysBefore(false);
      setAllowNotifications_weekBefore(false);
      setAllowNotifications_2weeksBefore(false);
    }
  }

  // Notification 1 Day After Expiration
  const [allowNotifications_dayAfter, setAllowNotifications_dayAfter] = useState(true);
  const toggleAllowNotifications_dayAfter = () => {
    if (allowNotifications) {setAllowNotifications_dayAfter(previousState => !previousState)}
  }

  // Notification on Expiration Date
  const [allowNotifications_expDate, setAllowNotifications_expDate] = useState(true);
  const toggleAllowNotifications_expDate = () => {
    if (allowNotifications) {setAllowNotifications_expDate(previousState => !previousState)}
  }

  // Notification 3 Days Before Expiration
  const [allowNotifications_3daysBefore, setAllowNotifications_3daysBefore] = useState(true);
  const toggleAllowNotifications_3daysBefore = () => {
    if (allowNotifications) {setAllowNotifications_3daysBefore(previousState => !previousState)}
  }

  // Notification 1 Week Before Expiration
  const [allowNotifications_weekBefore, setAllowNotifications_weekBefore] = useState(false);
  const toggleAllowNotifications_weekBefore = () => {
    if (allowNotifications) {setAllowNotifications_weekBefore(previousState => !previousState)}
  }

  // Notification 2 Weeks Before Expiration
  const [allowNotifications_2weeksBefore, setAllowNotifications_2weeksBefore] = useState(false);
  const toggleAllowNotifications_2weeksBefore = () => {
    if (allowNotifications) {setAllowNotifications_2weeksBefore(previousState => !previousState)}
  }

  return (
    <View style={settingsStyles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>

      <ScrollView>
        <Text style={settingsStyles.settingName}>Change Display Name</Text>
        <TextInput
          style={settingsStyles.inputField}
          placeholder="Display Name"
          placeholderTextColor="#9E9791"
          defaultValue={route.params.username}
          onChangeText={(value) => setUsername(value)}
        />
        <Text style={settingsStyles.settingName}>Link Pantry</Text>
        <TextInput
          style={settingsStyles.inputField}
          placeholder="Pantry #"
          placeholderTextColor="#9E9791"
          keyboardType="numeric"
          onChangeText={(value) => setLinkedPantry(value)}
        />
        <View style={settingsStyles.toggleSetting}>
          <Text style={settingsStyles.settingName}>Push Notifications</Text>
          <Switch
            style={settingsStyles.toggleSwitch}
            trackColor={{ false: "#ffffff", true: "#5BC236" }}
            thumbColor={allowNotifications ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleAllowNotifications}
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
            onValueChange={toggleAllowNotifications_dayAfter}
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
            onValueChange={toggleAllowNotifications_expDate}
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
            onValueChange={toggleAllowNotifications_3daysBefore}
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
            onValueChange={toggleAllowNotifications_weekBefore}
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
            onValueChange={toggleAllowNotifications_2weeksBefore}
            value={allowNotifications_2weeksBefore}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: '#000',
    overflow: 'visible'
  },
  toggleSetting: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginRight: '7.5%'
  },
  toggleSubSetting: {
    flex: 1,
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
		color: '#fff',
		margin: '7.5%',
    marginTop: 10,
    marginBottom: 0,
		padding: 3,
		paddingLeft: 0,
		borderColor: '#fff',
		borderBottomWidth: 1
	}
});