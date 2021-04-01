import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../Style';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("Login");

  if (tab === "Login") {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>
        <Text style={loginStyles.title}>Shelf Life</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Email"
          placeholderTextColor="#9E9791"
          textContentType="emailAddress"
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          placeholderTextColor="#9E9791"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />
        <TouchableOpacity style={loginStyles.btn} onPress={() => login(email, password, navigation)}>
          <Text style={loginStyles.btnText}>Login</Text>
        </TouchableOpacity>
        <View style={loginStyles.switchTextView}>
          <Text style={loginStyles.switchText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => setTab("Sign Up")}>
              <Text style={loginStyles.link}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  else if (tab === "Sign Up") {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>
        <Text style={loginStyles.title}>Shelf Life</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Email"
          placeholderTextColor="#9E9791"
          textContentType="emailAddress"
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Display Name"
          placeholderTextColor="#9E9791"
          onChangeText={(value) => setDisplayName(value)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          placeholderTextColor="#9E9791"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />
        <TouchableOpacity style={loginStyles.btn} onPress={() => signUp(email, displayName, password, navigation)}>
          <Text style={loginStyles.btnText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={loginStyles.switchTextView}>
          <Text style={loginStyles.switchText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => setTab("Login")}>
              <Text style={loginStyles.link}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const login = (email, password, navigation) => {
  /*
  if () { // successful login
    const displayName; // from database
    navigation.navigate('mainNav', { name: displayName });
  }
  */
  const displayName = "Test123";
  navigation.navigate('mainNav', { name: displayName });
}

const signUp = (email, displayName, password, navigation) => {
  /*
  if () { // successful sign up
    // TODO: create user in database
    navigation.navigate('mainNav', { name: displayName });
  }
  */
  navigation.navigate('mainNav', { name: displayName });
}

const loginStyles = StyleSheet.create({
  title: {
    fontSize: 72,
    fontFamily: 'Baskerville-Italic',
    fontWeight: '300',
    color: '#fff',
    letterSpacing: 4
  },
  btn: {
    backgroundColor:'#448EE5',
    borderColor: '#fff',
    borderWidth: 0,
    borderRadius: 10,
    width: 300
  },
  btnText: {
    fontSize: 16,
    color:'#fff',
    textTransform: 'uppercase',
    textAlign: 'center',
    padding: 8,
    letterSpacing: 2
  },
  switchTextView: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: 300,
    marginTop: 10,
  },
  switchText: {
    color: '#fff',
    fontSize: 14
  },
  link: {
    color: '#448EE5',
    textDecorationLine: 'underline',
    fontSize: 14
  }
});