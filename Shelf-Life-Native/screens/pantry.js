import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { AlphabetList } from "react-native-section-alphabet-list";
import { FloatingAction } from "react-native-floating-action";
import styles from '../Style';
const GLOBAL = require('../Globals')

const pantryJSON = require('../assets/pantryTest.json')

export default function PantryScreen({ navigation }) {

	const [searchQ, setSearchQ] = useState("")

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<ImageBackground source={require('../assets/background.jpg')} style={styles.background} />
				<StatusBar style="sfdsfd" />
				<View style={pantryStyles.searchView}>
					<Text style={pantryStyles.header}>Pantry</Text>
					<SearchBar
						placeholder="Search"
						onChangeText={updateSearch}
						value={searchQ}
						containerStyle={pantryStyles.searchBar}
						inputContainerStyle={{height: 30}}
						platform={"ios"}
					/>
				</View>

				<AlphabetList style={pantryStyles.list}
					data={getPantry()}
					indexLetterColor={'white'} //Color of letters on right

					renderCustomItem={(item) => ( //Make the data fancy lookin'
						formatPantry(item, { navigation })
					)}

					renderCustomSectionHeader={(section) => ( //Seperators
						<Text style={pantryStyles.seperatorText}>{section.title}</Text>
					)}
				/>
			</View>
			<FloatingAction
				actions={addActions}
				color={GLOBAL.ACCENT_COLOR}
				iconHeight={22}
				iconWidth={22}
				overlayColor={"rgba(0,0,0,0)"}
				icon={require('../assets/settings.png')}
				shadow={{ shadowOpacity: 0.3, shadowOffset: { width: 0, height: 0 }, shadowColor: "#000000", shadowRadius: 10 }}
				onPressItem={name => {
					if (name == "manual") {
						navigation.navigate('Item Info', { itemName: "", itemQuantity: "", itemUnitPrice: "", itemExpDate: "" })
					}
					else if (name == "scan") {
						navigation.navigate('Scan Item')
					}
				}} />
		</SafeAreaView>
	);

	function updateSearch(search) {
		setSearchQ(search)
	}
}

function getPantry() {
	return pantryJSON.items.map(data => {
		return (
			{ dispName: data.dispName, quantity: data.quantity, expDate: data.expDate, price: data.price, value: data.dispName, key: data.name }
		)
	})
}

function formatPantry(item, { navigation }) {
	return (
		<View key={item.name}>
			<TouchableOpacity onPress={() => navigation.navigate('Item Info', { itemName: item.dispName, itemQuantity: item.quantity, itemUnitPrice: item.price, itemExpDate: item.expDate })}>
				<View style={pantryStyles.listTextView}>
					<Text style={pantryStyles.listText}>{item.dispName}</Text>
				</View>
			</TouchableOpacity>
		</View>
	)
}


const addActions = [
	{
		text: "Manual Entry",
		icon: require("../assets/manual.png"),
		name: "manual",
		position: 1,
		color: GLOBAL.ACCENT_COLOR
	},
	{
		text: "Scan Item",
		icon: require("../assets/scan.png"),
		name: "scan",
		position: 2,
		color: GLOBAL.ACCENT_COLOR
	}
]

const pantryStyles = StyleSheet.create({
	searchView: {
		paddingTop: 70,
		alignItems: "center",
		width: "100%",
		backgroundColor: "#fff",
	},
	header: {
		fontSize: 16,
		fontWeight: "600",
	},
	searchBar: {
		width: "100%",
		maxWidth: 400,
	},
	list: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		backgroundColor: '#59595959',
		paddingTop: 0,

	},
	listTextView: {
		borderColor: "#000",
		borderTopWidth: 1,
		borderBottomWidth: 1
	},
	listText: {
		width: "100%",
		paddingTop: 10,
		paddingBottom: 10,
		marginRight: 10,
		fontSize: 16,
		color: '#000',
		backgroundColor: "#eee",
		paddingLeft: 10,
	},
	seperatorText: {
		width: "100%",
		fontSize: 16,
		color: '#000',
		fontWeight: "bold",
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 10,
		marginRight: 10,
		backgroundColor: "#bbbf",
	},
	listTextInfo: {
		fontSize: 24,
		color: "#fff",
		justifyContent: 'center',
		textAlign: 'center',
	}
});