import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Style';
import { scheduleNotification } from '../Notifications';
import { exp } from 'react-native-reanimated';
const GLOBAL = require('../Globals');

export default function ItemEntryPage(params) {
	let name = ""
	let dispName = ""
	let quantity = "1"
	let price = "1"
	let mode = "new" //set to "edit" for editing an ingredient	
	let exp_date = ""
	if (params.item)
	{
		exp_date = params.item.expDate
	}
	const [expDate, setExpDate] = useState(exp_date);
	const [itemAddingState, setItemAddingState] = useState("EDITING_VALUES")

	if (params.item) { //Check data for existing item in if one is passed
		name = params.item.name
		dispName = params.item.dispName
		quantity = params.item.quantity
		price = params.item.price.toString()		
		mode = "edit"		
	}
	else if (params.itemName) { //Adding a new pantry item
		name=params.itemNameOfficial
		dispName=params.itemName
		category=params.category
	}

	const handleSubmit = () => {
		const quantityInt = parseInt(quantity);
        const priceFloat = parseFloat(price).toFixed(2);
        if (isNaN(quantityInt)) {
            Alert.alert('ERROR: Invalid Quantity', '\"' + quantity + '\" is not valid. Please try again with a different quantity.', [
                {text: 'OK'}
            ]);
        }
        else if (isNaN(priceFloat)) {
            Alert.alert('ERROR: Invalid Price', '\"' + price + '\" is not valid. Please try again with a different price.', [
                {text: 'OK'}
            ]);
        }
		else { // successful
			GLOBAL.pantryItemChange = true
			setItemAddingState("SENDING_TO_SERVER")
			if (mode == "new") {
				setItemAddingState("SENDING_TO_SERVER")
				fetch(GLOBAL.BASE_URL + '/api/user/pantry/add', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"key": GLOBAL.LOGIN_TOKEN,
						"item_official_name": name,
						"ingredient_id": params.id,                
					})
				}).then((response) => response.json()).then((json) => {
					status = json["Status"]
					if (status == "OK") { // successful sign up        
						setItemAddingState("ADDED")
					}
					else if (status = "INVALID TOKEN")
					{
						alert("Invalid login token, log in again")
					}
				});
			}
			if (mode == "edit") {
				//TODO: Add pantry server code
				setItemAddingState("UPDATED")
				Alert.alert("Sure...", "Let's say that the pantry item was actually updated. It was detected, but the server code is TBD.")
			}

			// schedule notifications
			// try individually
			let data = [];
			loadData(data);
			console.log(data)

			let data2 = [true, true, false, true, true, false]
			console.log(data2)



			if (data[0]) {
				let date = new Date(expDate);
				date.setHours(9); // send at 9:00am
				
				if (data[1]) {
					let dayAfter = new Date(date.getTime());
					dayAfter.setDate(date.getDate() + 1);
					if (!isPastDate(dayAfter)) {
						scheduleNotification("Expired: " + name, name + " expired yesterday", dayAfter);
					}
				}
				if (data[2]) {
					if (!isPastDate(date)) {
						scheduleNotification("Expiring Soon: " + name, name + " expires today", date);
					}
				}
				if (data[3]) {
					let threeDaysBefore = new Date(date.getTime());
					threeDaysBefore.setDate(date.getDate() - 3);
					if (!isPastDate(threeDaysBefore)) {
						scheduleNotification("Expiring Soon: " + name, name + " expires in 3 days", threeDaysBefore);
					}
				}
				if (data[4]) {
					let weekBefore = new Date(date.getTime());
					weekBefore.setDate(date.getDate() - 7);
					if (!isPastDate(weekBefore)) {
						scheduleNotification("Expiring Soon: " + name, name + " expires in 1 week", weekBefore);
					}
				}
				if (data[5]) {
					let twoWeeksBefore = new Date(date.getTime());
					twoWeeksBefore.setDate(date.getDate() - 14);
					if (!isPastDate(twoWeeksBefore)) {
						scheduleNotification("Expiring Soon: " + name, name + " expires in 2 weeks", twoWeeksBefore);
					}
				}
				console.log("Allowed")
			}
			else {
				console.log("Not Allowed")
			}
		}
	}

	const handleCancel = () => {
		params.goBack(params.itemUnitPrice)
	}

	function isPastDate(date) {
		const now = new Date();
		if (date < now) return true;
		return false;
	}

	// get setting preferences from AsyncStorage
	const loadData = async (data) => {
		let allowNotifications = true;
		let allowNotifications_dayAfter = true;
		let allowNotifications_expDate = true;
		let allowNotifications_3daysBefore = true;
		let allowNotifications_weekBefore = true;
		let allowNotifications_2weeksBefore = true;

		try {
			if(await AsyncStorage.getItem('@allowNotifications') == "false")
				allowNotifications = false;
			if(await AsyncStorage.getItem('@allowNotifications_dayAfter') == "false")
				allowNotifications_dayAfter = false;
			if(await AsyncStorage.getItem('@allowNotifications_expDate') == "false")
				allowNotifications_expDate = false;
			if(await AsyncStorage.getItem('@allowNotifications_3daysBefore') == "false")
				allowNotifications_3daysBefore = false;
			if(await AsyncStorage.getItem('@allowNotifications_weekBefore') == "false")
				allowNotifications_weekBefore = false;
			if(await AsyncStorage.getItem('@allowNotifications_2weeksBefore') == "false")
				allowNotifications_2weeksBefore = false;
		} catch(err) {
			console.error(err);
		}

		data.push(allowNotifications);
		data.push(allowNotifications_dayAfter);
		data.push(allowNotifications_expDate);
		data.push(allowNotifications_3daysBefore);
		data.push(allowNotifications_weekBefore);
		data.push(allowNotifications_2weeksBefore);
	}

	return (
		<View style={styles.transparent_container}>
			<View style={[{ flex: 2, justifyContent:'flex-end'}]}>
				<TextInput
					style={styles.inputField}
					placeholder="Official Item Name"
					placeholderTextColor="#9E9791"
					defaultValue={name}
					onChangeText={(value) => name=value}
				/>
				<TextInput
					style={styles.inputField}
					placeholder="Common Item Name"
					placeholderTextColor="#9E9791"
					defaultValue={dispName}
					onChangeText={(value) => dispName=value}
				/>
				<TextInput
					style={styles.inputField}
					placeholder="Quantity"
					placeholderTextColor="#9E9791"
					keyboardType="numeric"
					defaultValue={quantity}
					onChangeText={(value) => quantity=value}
				/>
				<TextInput
					style={styles.inputField}
					placeholder="Unit Price"
					placeholderTextColor="#9E9791"
					keyboardType="numeric"
					defaultValue={price}
					onChangeText={(value) => price=value}
				/>
				<DatePicker
					style={itemInfoStyles.datePicker}
					date={expDate}
					mode="date"
					placeholder="Expiration Date"
					format="MMM DD, YYYY"
					minDate={new Date()}
					confirmBtnText="Confirm"
					cancelBtnText="Cancel"
					customStyles={{
						dateIcon: {
							position: 'absolute',
							left: 0,
							top: 4,
							marginLeft: 0
						},
						dateInput: {
							borderWidth: 0,
							alignItems: 'flex-start',
							marginLeft: 36,
						},
						placeholderText: {
							color: '#9E9791',
							fontSize: 22
						},
						dateText: {
							color: '#fff',
							fontSize: 22
						}
					}}
					onDateChange={(value) => setExpDate(value)}
				/>
			</View>

			<View style={itemInfoStyles.button_container}>
				{params.resetScanner && 
					<TouchableOpacity style={itemInfoStyles.submitBtn} onPress={() => params.resetScanner()}>
						<Text style={itemInfoStyles.submitBtnText}>Scan Again</Text>
					</TouchableOpacity>
				}
				{(itemAddingState == "EDITING_VALUES") &&
					<TouchableOpacity style={itemInfoStyles.submitBtn} onPress={() => handleSubmit()}>
						<Text style={itemInfoStyles.submitBtnText}>Submit</Text>
					</TouchableOpacity>
				}
				{(itemAddingState == "SENDING_TO_SERVER") &&
					<Text style={itemInfoStyles.submitBtnText}>Sending to Server</Text>
				}
				{(itemAddingState == "ADDED" || itemAddingState == "UPDATED") &&
					<TouchableOpacity style={itemInfoStyles.submitBtn} onPress={() => handleCancel()}>
						<Text style={itemInfoStyles.submitBtnText}>Done</Text>
					</TouchableOpacity>
				}
			</View>
		</View>
	);
}


const itemInfoStyles = StyleSheet.create({
	transparent_container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button_container: {
		flex: 1,		
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: "row"
	},
	submitBtn: {
		backgroundColor: '#5296E7',
		borderColor: '#fff',
		borderWidth: 0,
		borderRadius: 10
	},
	submitBtnText: {
		fontSize: 16,
		color: '#fff',
		padding: 8,
		letterSpacing: 2
	},
	datePicker: {
		width: 300,
		margin: 20,
		marginTop: 10,
		borderColor: '#fff',
		borderBottomWidth: 1
	}
});