import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ImageBackground, Switch, SafeAreaView } from 'react-native';
import styles from '../Style';

export default function SettingsScreen({ navigation, route }) {
  const [username, setUsername] = useState(route.params.username);
  const [linkedPantry, setLinkedPantry] = useState("");

  // TODO: Refactor
  // general setting
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (isEnabled) {
      // Disable All Toggles
      setIsEnabled1(false);
      setIsEnabled2(false);
      setIsEnabled3(false);
    }
  }

  // setting #1
  const [isEnabled1, setIsEnabled1] = useState(true);
  const toggleSwitch1 = () => {
    if (isEnabled)
      setIsEnabled1(previousState => !previousState);
  }

  // setting #2
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch2 = () => {
    if (isEnabled)
      setIsEnabled2(previousState => !previousState);
  }

  // setting #3
  const [isEnabled3, setIsEnabled3] = useState(true);
  const toggleSwitch3 = () => {
    if (isEnabled)
      setIsEnabled3(previousState => !previousState);
  }

  return (
	  	<SafeAreaView style={styles.safeArea}>
    <View style={settingsStyles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>

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
        <Text style={settingsStyles.settingName}>Expiration Date</Text>
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
        <Text style={settingsStyles.settingName}>1 Week Before Exp.</Text>
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
        <Text style={settingsStyles.settingName}>1 Month Before Exp.</Text>
        <Switch
          style={settingsStyles.toggleSwitch}
          trackColor={{ false: "#ffffff", true: "#5BC236" }}
          thumbColor={isEnabled3 ? "#ffffff" : "#ffffff"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch3}
          value={isEnabled3}
        />
      </View>
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
  },
  toggleSubSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '7.5%'
  },
  toggleSwitch: {
    margin: '7.5%'
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