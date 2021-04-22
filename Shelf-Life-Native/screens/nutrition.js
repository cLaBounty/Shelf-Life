import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
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
	{ name: 'Carbs', percentage: 26, color: '#FF7F0E', legendFontColor: '#FFFFFF', legendFontSize: 15 },
	{ name: 'Fat', percentage: 5, color: '#FFBB78', legendFontColor: '#FFFFFF', legendFontSize: 15 },
	{ name: 'Sugar', percentage: 9, color: '#1F77B4', legendFontColor: '#FFFFFF', legendFontSize: 15 },
	{ name: 'Cholesterol', percentage: 18, color: '#AEC7E8', legendFontColor: '#FFFFFF', legendFontSize: 15 },
	{ name: 'Sodium', percentage: 20, color: '#2CA02C', legendFontColor: '#FFFFFF', legendFontSize: 15 },
	{ name: 'Protein', percentage: 22, color: '#98DF8A', legendFontColor: '#FFFFFF', legendFontSize: 15 }
]

export default function NutritionScreen({ navigation }) {
  return (
	<SafeAreaView style={styles.safeArea}>
	    <View style={styles.container}>
			<StatusBar style="auto" />
			<ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>
			<Text style={styles.text}>Nutrition Information</Text>
			<PieChart
				data={data}
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

const nutritionStyles = StyleSheet.create({

});