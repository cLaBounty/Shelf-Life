import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import styles from '../Style';

export default function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>

      {/* Temporary */}
      <Text style={styles.text}>Settings Screen</Text>
    </View>
  );
}