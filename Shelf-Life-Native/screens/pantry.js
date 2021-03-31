import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { AlphabetList } from "react-native-section-alphabet-list";
import styles from '../Style';
import * as SecureStore from 'expo-secure-store';
const pantryJSON = require('../assets/pantryTest.json')
const GLOBAL = require('../Globals')

export default function PantryScreen({ navigation }) {
  const [pantry_data, setPantryData] = useState(getPantry());  
  useEffect(() => {
    (async () => {
      const data = await getRemotePantry()
      console.log(data)
      setPantryData(data)
    })();
  }, []);

  return (
    <View>
      <StatusBar style="something that causes an error so the status bar is black, thus readable on the white background :)" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background} />

      <AlphabetList style={pantryStyles.list}
        data={pantry_data}
        indexLetterColor={'white'} //Color of letters on right

        renderCustomItem={(item) => ( //Make the data fancy lookin'
          formatPantry(item, { navigation })
        )}

        renderCustomSectionHeader={(section) => ( //Seperators
          <Text style={pantryStyles.seperatorText}>{section.title}</Text>
        )}
      />
    </View>
  );
}

async function getRemotePantry()
{
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
      if (status == "OK") { // successful sign up        
        items = json        
      }
    }
    );
  }
  else
  {
    alert("No login token found")
  }  
  return items["items"].map(data => {
    return (
      { dispName: data.dispName, quantity: data.quantity, expDate: data.expDate, price: data.price, value: data.name, key: data.dispName }
    )
  })
}

function getPantry() {
    return pantryJSON.items.map(data => {
      return (
        { dispName: data.dispName, quantity: data.quantity, expDate: data.expDate, price: data.price, value: data.name, key: data.dispName }
      )
    })
}

function formatPantry(item, { navigation }) {
  return (
    <View key={item.name}>
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