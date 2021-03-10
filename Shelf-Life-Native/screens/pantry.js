import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { AlphabetList } from "react-native-section-alphabet-list";

class PantryScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="something that causes an error so the status bar is black, thus readable on the white background :)" />
        <ImageBackground source={require('../assets/background.jpg')} style={styles.background} />


        <AlphabetList style={styles.list}
          data={foodData} // Data for list
          indexLetterColor={'white'} //Color of letters on right

          renderCustomListHeader={
            <View>
              <Text style={styles.listTextInfo}>{"\n\n"}{foodData.length} Pantry Items {"\n"}</Text>
            </View>
          }

          renderCustomItem={(item) => (
            <Text style={styles.listText}>{item.value}</Text>  //Items for list
          )}

          renderCustomSectionHeader={(section) => (
            <Text style={styles.seperatorText}>{section.title}</Text> //Seperators
          )}
        />
      </View>

    );
  }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    opacity: 0.50
  },
  text: {
    fontSize: 24,
    color: '#fff',
    margin: 10
  },
  btn: {
    backgroundColor: '#595959',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5
  },
  btnText: {
    fontSize: 14,
    color: '#fff',
    padding: 8,
    letterSpacing: 1.5
  },
  list: {
    width: "95%",
    height: "100 %",
    justifyContent: "center",
    backgroundColor: '#59595959',
    paddingTop: 0,

  },
  listText: {
    width: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 1,
    marginBottom: 1,
    fontSize: 16,
    color: '#fff',
    backgroundColor: "#00000044",
  },
  seperatorText: {
    width: "100%",
    fontSize: 16,
    color: '#fff',
    fontWeight: "bold",
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 2,
    marginBottom: 2,
    backgroundColor: "#00000099",
  },
  listTextInfo: {
    fontSize: 24,
    color: "#fff",
    justifyContent: 'center',
    textAlign: 'center',
  }
});

export default PantryScreen;