import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/background.jpg')} style={styles.background}/>
      <Text style={styles.title}>Shelf Life</Text>
      <StatusBar style="auto" />
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
    opacity: 0.55
  },
  title: {
    fontSize: 50,
    fontFamily: 'Baskerville-Italic',
    fontWeight: '300',
    color: '#fff',
    letterSpacing: 3
  }
});
