import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    opacity: 0.50
  },
  title: {
    fontSize: 72,
    fontFamily: 'Baskerville-Italic',
    fontWeight: '300',
    color: '#fff',
    letterSpacing: 4
  },
  loginInput: {
    width: 300,
    fontSize: 22,
    color: '#fff',
    margin: 25,
    padding: 3,
    paddingLeft: 0,
    borderColor: '#fff',
    borderBottomWidth: 1
  },
  loginBtn: {
    backgroundColor:'#5296E7',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10
  },
  loginBtnText: {
    fontSize: 16,
    color:'#fff',
    textTransform: 'uppercase',
    padding: 8,
    letterSpacing: 2
  }
});