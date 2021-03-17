import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { AlphabetList } from "react-native-section-alphabet-list";
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../Style';

export default function PantryScreen({ navigation }) {


  return (
    <View>
      <StatusBar style="something that causes an error so the status bar is black, thus readable on the white background :)" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background} />


      <AlphabetList style={pantryStyles.list}
        data={foodData} // Data for list
        indexLetterColor={'white'} //Color of letters on right

        renderCustomListHeader={
          <View>
            <Text style={pantryStyles.listTextInfo}>{"\n\n"}{foodData.length} Pantry Items {"\n"}</Text>
          </View>
        }

        renderCustomItem={(item) => ( //Make the data fancy lookin'
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Item Information', { itemName: item.value, itemQuantity: "32", itemUnitPrice: "100000000", itemExpDate: "Mon, Feb 30, 2021" })}>
              <Text style={pantryStyles.listText}>{item.value}</Text>
            </TouchableOpacity>
          </View>
        )}

        renderCustomSectionHeader={(section) => ( //Seperators
          <Text style={pantryStyles.seperatorText}>{section.title}</Text>
        )}
      />
    </View>

  );
}

const foodData = [ /* Temp data until the database is connected */
  { value: "Jif Chunky Peanutbutter" },
  { value: "Jello - Raspberry" },
  { value: "Jello - Blue Raspberry" },
  { value: "Ben's Glorious Crackers" },
  { value: "Swedish Fish" },
  { value: "Gummy worms" },
  { value: "Act II Popcorn" },
  { value: "Off-brand poptarts" },
  { value: "Little Debbie's brownies" },
  { value: "React Native Bits & Bytes" },
  { value: "🥺 Zoomer Juice" },
  { value: "7up" },
  { value: "Tropica Orange Juice" },
  { value: "Boomer 💣s" },
  { value: "Jif Creamy Peanut Butter" },
  { value: "Hood Skim Milk" },
  { value: "Oreos Party Sized" },
  { value: "Chobani Mixed Berry Yogert" },
  { value: "Generic Chicken Noodle Soup" },
  { value: "Great Grandma's Awesome Tasting Thanksgiving Roasted Ham" },
  { value: "Canada Dry Ginger Ale" },
]

const pantryStyles = StyleSheet.create({
  list: {
    width: "100%",
    height: "100 %",
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