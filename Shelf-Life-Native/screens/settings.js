import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ScrollView, ImageBackground, Switch } from 'react-native';
import styles from '../Style';

export default function SettingsScreen({ navigation, route }) {
  const [username, setUsername] = useState(route.params.username);
  const [linkedPantry, setLinkedPantry] = useState("");

  // general notification setting
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (isEnabled) {
      // Disable All Toggles
      setIsEnabled1(false);
      setIsEnabled2(false);
      setIsEnabled3(false);
      setIsEnabled4(false);
      setIsEnabled5(false);
    }
  }

  // setting #1
  const [isEnabled1, setIsEnabled1] = useState(true);
  const toggleSwitch1 = () => {
    if (isEnabled) {setIsEnabled1(previousState => !previousState)}
  }

  // setting #2
  const [isEnabled2, setIsEnabled2] = useState(true);
  const toggleSwitch2 = () => {
    if (isEnabled) {setIsEnabled2(previousState => !previousState)}
  }

  // setting #3
  const [isEnabled3, setIsEnabled3] = useState(true);
  const toggleSwitch3 = () => {
    if (isEnabled) {setIsEnabled3(previousState => !previousState)}
  }

  // setting #4
  const [isEnabled4, setIsEnabled4] = useState(false);
  const toggleSwitch4 = () => {
    if (isEnabled) {setIsEnabled4(previousState => !previousState)}
  }

  // setting #5
  const [isEnabled5, setIsEnabled5] = useState(false);
  const toggleSwitch5 = () => {
    if (isEnabled) {setIsEnabled5(previousState => !previousState)}
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
            thumbColor={isEnabled ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={settingsStyles.toggleSubSetting}>
          <Text style={settingsStyles.settingName}>1 Day After Exp.</Text>
          <Switch
            style={settingsStyles.toggleSwitch}
            trackColor={{ false: "#ffffff", true: "#5BC236" }}
            thumbColor={isEnabled1 ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={isEnabled1}
          />
        </View>
        <View style={settingsStyles.toggleSubSetting}>
          <Text style={settingsStyles.settingName}>Expiration Date</Text>
          <Switch
            style={settingsStyles.toggleSwitch}
            trackColor={{ false: "#ffffff", true: "#5BC236" }}
            thumbColor={isEnabled2 ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isEnabled2}
          />
        </View>
        <View style={settingsStyles.toggleSubSetting}>
          <Text style={settingsStyles.settingName}>3 Days Before Exp.</Text>
          <Switch
            style={settingsStyles.toggleSwitch}
            trackColor={{ false: "#ffffff", true: "#5BC236" }}
            thumbColor={isEnabled3 ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch3}
            value={isEnabled3}
          />
        </View>
        <View style={settingsStyles.toggleSubSetting}>
          <Text style={settingsStyles.settingName}>1 Week Before Exp.</Text>
          <Switch
            style={settingsStyles.toggleSwitch}
            trackColor={{ false: "#ffffff", true: "#5BC236" }}
            thumbColor={isEnabled4 ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch4}
            value={isEnabled4}
          />
        </View>
        <View style={settingsStyles.toggleSubSetting}>
          <Text style={settingsStyles.settingName}>2 Weeks Before Exp.</Text>
          <Switch
            style={settingsStyles.toggleSwitch}
            trackColor={{ false: "#ffffff", true: "#5BC236" }}
            thumbColor={isEnabled5 ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch5}
            value={isEnabled5}
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