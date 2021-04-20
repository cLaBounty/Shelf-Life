import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { AlphabetList } from "react-native-section-alphabet-list";
import { FloatingAction } from "react-native-floating-action";
import DropDownPicker from 'react-native-dropdown-picker';
import FastImage from 'react-native-fast-image'
import styles from '../Style';

const GLOBAL = require('../Globals')
const pantryJSON = require('../assets/pantryTest.json')

export default function PantryScreen({ navigation }) {

	const [itemChanged, setItemChanged] = useState(0)
	const [pantryData, setPantryData] = useState("") //Pantry items
	const [searchQ, setSearchQ] = useState("") //Search query
	const [order, setOrder] = useState("alpha") //Current ordering method
	const orderings = [ //Selection for ordering
		{label: 'A-Z', value: 'alpha'},
		{label: 'Quantity', value: 'quantity'},
	]

	const addActions = [ // Options for adding to pantry
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

	useEffect(() => {
		(async () => {
			const data = await getRemotePantry()
		})();
	}, []);

	useFocusEffect(
		React.useCallback(() => {
			Alert.alert("Checking")
			console.log(GLOBAL.pantryItemChange.toString())
			if (GLOBAL.pantryItemChange == true) {
				console.log("Found to be true")
				GLOBAL.pantryItemChange = false
				getRemotePantry()
				setItemChanged(itemChanged + 1)
			}
			
		})
	)

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<FastImage
					style={styles.background}
					source = {Image.resolveAssetSource(require('../assets/background.jpg'))}
				/>
				<StatusBar style="black?" />
				<View style={pantryStyles.searchView}>
					<Text style={pantryStyles.header}>Pantry</Text>
					{ renderPantry() }
				</View>
			</View>
				<FloatingAction
					actions={addActions}
					color={GLOBAL.ACCENT_COLOR}
					iconHeight = {22}
					iconWidth = {22}
					overlayColor={"rgba(0,0,0,0)"}
					icon={require('../assets/settings.png')}
					shadow={{ shadowOpacity: 0.3, shadowOffset: { width: 0, height: 0 }, shadowColor: "#000000", shadowRadius: 10 }}
					onPressItem={name => {
						if (name == "manual") {
							navigation.navigate('Item Info', { })
						}
						else if (name == "scan") {
							navigation.navigate('Scan Item')
						}
					}}
				/>
		</SafeAreaView>
	);

	function renderPantry() {
		if (pantryData == "" || pantryData == null) {
			//Text saying there is no data in the pantry
			output = (
				<View style={{height: "100%"}}>
					<Text style={pantryStyles.noData}>No data in pantry</Text>
				</View>
			)
		}
		else {
			output = (
				<View style={{width: "100%"}}>
					<View style={pantryStyles.orderView}>
						<SearchBar
							placeholder="Search"
							onChangeText={updateSearch}
							value={searchQ}
							containerStyle={pantryStyles.searchContainer}
							inputContainerStyle={styles.searchInput}
							platform={"ios"}
							cancelButtonTitle=""
							cancleButtonProps={{disabled: true}} //Doesn't seem to be working
						/>
						<DropDownPicker
							items={orderings}
							defaultValue={order}
							containerStyle={pantryStyles.orderDropdown}
							onChangeItem={item => setOrder(item.value)}
							itemStyle={pantryStyles.orderText}
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
			)
		}
		return output
	}

	function getPantry() {
		output = pantryData.map((data, index) => {
			return filterPantry(data, index)
		})

		output = output.filter(function( data ) {
			return data !== null;
		})
		return output
	}

	function filterPantry(data, index) {
		if (data.dispName.toLowerCase().indexOf(searchQ.toLowerCase()) > -1) {
			if (order == "alpha") {
				return ({dispName: data.dispName, name: data.name, quantity: data.quantity, expDate: data.expDate, price: data.price, value: data.name, key: index})
			}
			else if (order == "quantity") {
				return ({dispName: data.dispName, name: data.name, quantity: data.quantity, expDate: data.expDate, price: data.price, value: data.quantity, key: index})
			}
		}
		return null
	}

	function updateSearch(search) {
		setSearchQ(search)
	}

	function formatPantry(item, { navigation }) {
		return (
			<View key={item.name}>
				<TouchableOpacity onPress={() => navigation.navigate('Item Info', { item })}>
					<View style={pantryStyles.listTextView}>
						<Text style={pantryStyles.listText}>{item.dispName}</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}

	async function getRemotePantry() {
		console.log("Downloading pantry data")
		items = null
		if (GLOBAL.LOGIN_TOKEN) {
			await fetch(GLOBAL.BASE_URL + '/api/user/pantry/get', {
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
				if (status == "OK") { // Successful sign up
					items = json
				}
				else if (status == "EMPTY") {
					items = json
					console.log("hi")
					items["items"] = []
					return []
				}
				else {
					alert("Expired login token")
				}
			}
		);
		}
		else {
			alert("No login token found")
			return []
		}	
		setPantryData(items["items"].map( (data) => { // Cause app to reload with downloaded pantry data
			return ( data )
		}))
	}
	
	
	
}
const pantryStyles = StyleSheet.create({
	searchView: {
		paddingTop: 5,
		alignItems: "center",
		width: "100%",
		backgroundColor: "#fff",
		zIndex: 3,
	},
	searchContainer: {
		width: "69%", // Nice
		maxWidth: 400,
		backgroundColor: "#0000",
	},
	orderView: {
		backgroundColor: "#fff0",
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	orderDropdown: {
		height: 40,
		width: "26%",
		maxWidth: 120,
	},
	orderText: {
		color: "dodgerblue",
		fontSize: 18,
		justifyContent: "flex-start",
	},
	header: {
		fontSize: 16,
		fontWeight: "700",
	},
	list: {
		zIndex: -1,
		width: "100%",
		height: "90.7%",
		justifyContent: "center",
		backgroundColor: '#59595959',
		paddingTop: 1,
	},
	listTextView: {
		borderColor: "#000",
		borderTopWidth: 0.5,
		borderBottomWidth: 0.5
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
	},
	noData: {
		height: "90%",
	}
});