import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { AlphabetList } from "react-native-section-alphabet-list";
import styles from '../Style';

const pantryJSON = require('../assets/pantryTest.json')

export default function PantryScreen({ navigation }) {
  return (
    <View>
      <StatusBar style="something that causes an error so the status bar is black, thus readable on the white background :)" />
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
				<TouchableOpacity onPress={() => navigation.navigate('Item Information', { itemName: item.dispName, itemQuantity: item.quantity, itemUnitPrice: item.price, itemExpDate: item.expDate })}>
					<Text style={pantryStyles.listText}>{item.dispName}</Text>
			</TouchableOpacity>
			</View>
		)
}



const pantryStyles = StyleSheet.create({
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
    marginTop: 1,
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
    marginTop: 1,
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