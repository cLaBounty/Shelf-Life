import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Cam from './components/barcodeScanner'
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function App() {
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Add Item" component={AddItemScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Scan Item" component={ScanItemScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Item Information" component={ItemInfoScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Pantry" component={PantryScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Recipes" component={RecipesScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Nutrition" component={NutritionScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Expenses" component={ExpensesScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('./assets/background.jpg')} style={styles.background}/>
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
};

const HomeScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('./assets/background.jpg')} style={styles.background}/>
      <Text>Hi {route.params.username}!</Text>
      
      {/* Temporary */}
      <Text style={tempStyles.text}>Home Screen</Text>
      <TouchableOpacity style={tempStyles.btn} onPress={() => navigation.navigate('Add Item')}>
        <Text style={tempStyles.btnText}>Add Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tempStyles.btn} onPress={() => navigation.navigate('Pantry')}>
        <Text style={tempStyles.btnText}>Pantry</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tempStyles.btn} onPress={() => navigation.navigate('Recipes')}>
        <Text style={tempStyles.btnText}>Recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tempStyles.btn} onPress={() => navigation.navigate('Nutrition')}>
        <Text style={tempStyles.btnText}>Nutrition</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tempStyles.btn} onPress={() => navigation.navigate('Expenses')}>
        <Text style={tempStyles.btnText}>Expenses</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tempStyles.btn} onPress={() => navigation.navigate('Settings')}>
        <Text style={tempStyles.btnText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const AddItemScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('./assets/background.jpg')} style={styles.background}/>

      {/* Temporary */}
      <Text style={tempStyles.text}>Add Item Screen</Text>
      <TouchableOpacity style={tempStyles.btn} onPress={() => navigation.navigate('Scan Item')}>
        <Text style={tempStyles.btnText}>Scan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tempStyles.btn} onPress={() => navigation.navigate('Item Information', { itemName: "" })}>
        <Text style={tempStyles.btnText}>Manual</Text>
      </TouchableOpacity>
    </View>
  );
};

const ScanItemScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Temporary */}
      <Cam/>
      <Text style={tempStyles.text}>Scan Item Screen</Text>
      <TouchableOpacity style={tempStyles.btn} onPress={() => navigation.navigate('Item Information', { itemName: "Peanut Butter" })}>
        <Text style={tempStyles.btnText}>Take Picture</Text>
      </TouchableOpacity>
    </View>
  );
};

const ItemInfoScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('./assets/background.jpg')} style={styles.background}/>

      {/* Temporary */}
      <Text style={tempStyles.text}>Item Info Screen</Text>
      <Text>{route.params.itemName} was scanned...</Text>
      <TouchableOpacity style={tempStyles.btn} onPress={() => navigation.navigate('Home')}>
        <Text style={tempStyles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const PantryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('./assets/background.jpg')} style={styles.background}/>

      {/* Temporary */}
      <Text style={tempStyles.text}>Pantry Screen</Text>
    </View>
  );
};

const RecipesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('./assets/background.jpg')} style={styles.background}/>

      {/* Temporary */}
      <Text style={tempStyles.text}>Recipes Screen</Text>
    </View>
  );
};

const NutritionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('./assets/background.jpg')} style={styles.background}/>

      {/* Temporary */}
      <Text style={tempStyles.text}>Nutrition Screen</Text>
    </View>
  );
};

const ExpensesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('./assets/background.jpg')} style={styles.background}/>

      {/* Temporary */}
      <Text style={tempStyles.text}>Expenses Screen</Text>
    </View>
  );
};

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('./assets/background.jpg')} style={styles.background}/>

      {/* Temporary */}
      <Text style={tempStyles.text}>Settings Screen</Text>
    </View>
  );
};

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

{/* Temporary */}
const tempStyles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: '#fff',
    margin: 10
  },
  btn: {
    backgroundColor:'#595959',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5
  },
  btnText: {
    fontSize: 14,
    color:'#fff',
    padding: 8,
    letterSpacing: 1.5
  }
});