import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ImageBackground } from 'react-native';
import styles from '../Style';

export default function PantryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>

      {/* Temporary */}
      <Text style={styles.text}>Pantry Screen</Text>
    </View>
  );
}