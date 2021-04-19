import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../Style';
const GLOBAL = require('../Globals')

async function getUserInformation()
{  
  userInfo = null
  if (GLOBAL.LOGIN_TOKEN) {
    await fetch(GLOBAL.BASE_URL + '/api/user/get', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "key": GLOBAL.LOGIN_TOKEN,
      })

    }).then((response) => response.json()).then((json) => {
      status = json["Status"]
      if (status == "OK") { // successful sign up        
        userInfo = json        
      }
      else if (status == "INVALID TOKEN")
      {
        alert("Expired login token")    
      }
      else if(status == "ERROR")
      {
        alert("Unknown server error")
      }
      else{
        alert(status)
      }
    }
    );    
  }
  else
  {
    alert("No login token found")
  }  
  return userInfo
}


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("Login");
  
  useEffect(() => {
    (async () => {
      const data = await getUserInformation()      
      if(data)
      {
        const displayName = data["Display Name"]; // from database        
        navigation.navigate('mainNav', { name: displayName });
      }
    })();
  }, []);

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
          defaultValue={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          placeholderTextColor="#9E9791"
          textContentType="password"
          secureTextEntry={true}
          defaultValue={password}
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
          defaultValue={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Display Name"
          placeholderTextColor="#9E9791"
          secureTextEntry={false}
          defaultValue={displayName}
          onChangeText={(value) => setDisplayName(value)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          placeholderTextColor="#9E9791"
          textContentType="password"
          secureTextEntry={true}
          defaultValue={password}
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


  fetch(GLOBAL.BASE_URL+'/api/user/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "password": password,
      "email": email,      
    })
    
  }).then((response) => response.json()).then((json) => {
    status = json["Status"]    
    if (status == "OK") { // successful sign up    
      const displayName = json["display_name"]; // from database
      GLOBAL.LOGIN_TOKEN = json["login_token"]
      navigation.navigate('mainNav', { name: displayName });

    }
    else if(status == "ERROR")  
    {    
      // TODO: Expand here with invalid error codes, i.e invalid email, password, username
    }
    else if(status == "INVALID PASSWORD")  
    { 
      console.log("Invalid Password")   
      // TODO: Expand here with invalid error codes, i.e invalid email, password, username
    }
    else if(status == "INVALID EMAIL")  
    {    
      console.log("Invalid Email")
      // TODO: Expand here with invalid error codes, i.e invalid email, password, username
    }
    }).catch((error) => {
      console.log("Server Error") // this'll get called if the server is offline / can't be reached
      //console.error(error); // catch networking errors
    });  
}

const signUp = (email, displayName, password, navigation) => {
  fetch(GLOBAL.BASE_URL+'/api/user/new', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "password": password,
    "email": email,
    "display_name": displayName
  })
  
}).then((response) => response.json()).then((json) => {
  status = json["Status"]
  
  if (status == "OK") { // successful sign up    
    GLOBAL.LOGIN_TOKEN = json["login_token"]    
    navigation.navigate('mainNav', { name: displayName });    
  }
  else if(status == "ERROR")  
  {    
    // TODO: Expand here with invalid error codes, i.e invalid email, password, username
  }
  }).catch((error) => {
    console.error(error); // catch networking errors
  });
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