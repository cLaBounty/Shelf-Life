import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import styles from '../Style';
import ItemEntryPage from '../components/itemEntry'
import FastImage from 'react-native-fast-image'

export default function ItemInfoScreen({ navigation, route }) {

	passData = ""
	if (route.params.item) {
		passData=route.params.item
	}

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<FastImage
				style={styles.background}
				source = {Image.resolveAssetSource(require('../assets/background.jpg'))}
			/>
			<ItemEntryPage 
				item={passData}
				goBack={() => navigation.goBack()}
			/>
		</View>
	);
}

const itemInfoStyles = StyleSheet.create({
	submitBtn: {
		backgroundColor:'#5296E7',
		borderColor: '#fff',
		borderWidth: 0,
		borderRadius: 10
	},
	submitBtnText: {
		fontSize: 16,
		color:'#fff',
		padding: 8,
		letterSpacing: 2
	}
});