import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView} from 'react-native';
import styles from '../Style';
import { PieChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width

const chartConfig = {
	backgroundGradientFrom: '#1E2923',
	backgroundGradientTo: '#08130D',
	color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
}

// Temporary placeholder data
const data = [
	{ name: 'Snacks', percentage: 26, color: '#FF7F0E', legendFontColor: '#FFFFFF', legendFontSize: 15 },
	{ name: 'Meat', percentage: 5, color: '#FFBB78', legendFontColor: '#FFFFFF', legendFontSize: 15 },
	{ name: 'Fruits', percentage: 9, color: '#1F77B4', legendFontColor: '#FFFFFF', legendFontSize: 15 },
	{ name: 'Vegetables', percentage: 18, color: '#AEC7E8', legendFontColor: '#FFFFFF', legendFontSize: 15 },
	{ name: 'Dairy', percentage: 20, color: '#2CA02C', legendFontColor: '#FFFFFF', legendFontSize: 15 },
	{ name: 'Grains', percentage: 22, color: '#98DF8A', legendFontColor: '#FFFFFF', legendFontSize: 15 }
]

export default function ExpensesScreen({ navigation }) {
	const [graph_data, setGraphData] = useState(data)
	useEffect(() => {
		(async () => {
			await getPriceData()
		})();
	}, []);
	async function getPriceData() {		
		if (GLOBAL.LOGIN_TOKEN) {
			await fetch(GLOBAL.BASE_URL + '/api/user/pantry/price/', {
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
				if (status == "OK" && json["Price Info"]["success"] == "OK") { // Successful sign up
					chart_json = json["Price Info"]
					chart_categories = chart_json["all_categories"]
					chart_data = chart_json["data"]
					const new_data = []
					colours = ['#FF7F0E', '#FFBB78', '#1F77B4', '#AEC7E8', '#2CA02C', '#98DF8A']
					chart_categories.forEach((currentValue, index) => { new_data.push( 
						{ name: currentValue.replaceAll('-', ' '), percentage: chart_data[currentValue], color: colours[index % colours.length], legendFontColor: '#FFFFFF', legendFontSize: 15 }
					) } )				
					setGraphData(new_data)	
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
	}
  return (
	<SafeAreaView style={styles.safeArea}>
	    <View style={styles.container}>
			<StatusBar style="auto" />
			<ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>
			<Text style={styles.text}>Expense Information</Text>
			<PieChart
				data={graph_data}
				width={screenWidth}
				height={220}
				chartConfig={chartConfig}
				accessor="percentage"
				backgroundColor="transparent"
				paddingLeft="15"
			/>
	    </View>
	</SafeAreaView>
  );
}

const expensesStyles = StyleSheet.create({

});