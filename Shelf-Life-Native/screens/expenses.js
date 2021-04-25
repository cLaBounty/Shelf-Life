import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView} from 'react-native';
import styles from '../Style';
import { PieChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
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
  return (
	<SafeAreaView style={styles.safeArea}>
	    <View style={styles.container}>
			<StatusBar style="auto" />
			<ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>
			<Text style={styles.text}>Expense Information</Text>
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

const expensesStyles = StyleSheet.create({

});