import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView} from 'react-native';
import styles from '../Style';

export default function ExpensesScreen({ navigation }) {
  return (
	<SafeAreaView style={styles.safeArea}>
	    <View style={styles.container}>
	      <StatusBar style="auto" />
	      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>

	      {/* Temporary */}
	      <Text style={styles.text}>Expenses Screen</Text>
	    </View>
	</SafeAreaView>
  );
}

const expensesStyles = StyleSheet.create({

});