import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import { AlphabetList } from "react-native-section-alphabet-list";
import { FloatingAction } from "react-native-floating-action";
import styles from '../Style';
const GLOBAL = require('../Globals')

const pantryJSON = require('../assets/pantryTest.json')

export default function PantryScreen({ navigation }) {
  return (
	  <SafeAreaView style={styles.safeArea}>
	      <View style={styles.container}>
			  <ImageBackground source={require('../assets/background.jpg')} style={styles.background} />
		      <AlphabetList style={pantryStyles.list}
		  		 data={getPantry()}
		        indexLetterColor={'white'} //Color of letters on right

		  			renderCustomItem={(item) => ( //Make the data fancy lookin'
		  				formatPantry( item, {navigation} )
		        )}

		        renderCustomSectionHeader={(section) => ( //Seperators
		          <Text style={pantryStyles.seperatorText}>{section.title}</Text>
		        )}
		      />
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
		  	if (name == "manual")
		  	{
		  		navigation.navigate('Item Info', { itemName: "", itemQuantity: "", itemUnitPrice: "", itemExpDate: "" })
		  	}
		  	else if (name == "scan") {
		  		navigation.navigate('Scan Item')
		  	}
		}}/>
	  </SafeAreaView>
  );
}

function getPantry() {
	return pantryJSON.items.map(data => {
		return (
			{ dispName: data.dispName, quantity: data.quantity, expDate: data.expDate, price: data.price, value: data.name, key: data.dispName }
		)
	})
}

function formatPantry(item, { navigation } ){
		return (
			<View key = {item.name}>
				<TouchableOpacity onPress={() => navigation.navigate('Item Info', { itemName: item.dispName, itemQuantity: item.quantity, itemUnitPrice: item.price, itemExpDate: item.expDate })}>
					<Text style={pantryStyles.listText}>{item.dispName}</Text>
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
  test: {
	width: "100%",
  },
  list: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: '#59595959',
    paddingTop: 0,

  },
  listText: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 10,
    fontSize: 16,
    color: '#fff',
    backgroundColor: "#00000044",
    paddingLeft: 10,
  },
  seperatorText: {
    width: "100%",
    fontSize: 16,
    color: '#fff',
    fontWeight: "bold",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    marginRight: 10,
    backgroundColor: "#555555ff",
  },
  listTextInfo: {
    fontSize: 24,
    color: "#fff",
    justifyContent: 'center',
    textAlign: 'center',
  }
});