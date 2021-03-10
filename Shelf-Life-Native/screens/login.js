import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../Style'

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>
      <Text style={styles.title}>Shelf Life</Text>
      <TextInput
        style={styles.loginInput}
        placeholder="Username"
        placeholderTextColor="#9E9791"
        onChangeText={(value) => setUsername(value)}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Home', { username: username })}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}