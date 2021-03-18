import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../Style';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>
      <Text style={loginStyles.title}>Shelf Life</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Username"
        placeholderTextColor="#9E9791"
        onChangeText={(value) => setUsername(value)}
      />
      <TouchableOpacity style={loginStyles.loginBtn} onPress={() => navigation.navigate('Home', { username: username })}>
        <Text style={loginStyles.loginBtnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const loginStyles = StyleSheet.create({
  title: {
    fontSize: 72,
    fontFamily: 'Baskerville-Italic',
    fontWeight: '300',
    color: '#fff',
    letterSpacing: 4
  },
  loginBtn: {
    backgroundColor:'#5296E7',
    borderColor: '#fff',
    borderWidth: 0,
    borderRadius: 10
  },
  loginBtnText: {
    fontSize: 16,
    color:'#fff',
    textTransform: 'uppercase',
    padding: 8,
    letterSpacing: 2
  },
});