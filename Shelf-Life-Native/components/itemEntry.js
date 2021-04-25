import React, { useState, useEffect } from 'react';
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
	let quantity = ""
	let price = ""
	let mode = "new" //set to "edit" for editing an ingredient	
	let exp_date = ""

	// get settings from AsyncStorage
	const [allowNotifications, setAllowNotifications] = useState();
	const [allowNotifications_dayAfter, setAllowNotifications_dayAfter] = useState();
	const [allowNotifications_expDate, setAllowNotifications_expDate] = useState();
	const [allowNotifications_3daysBefore, setAllowNotifications_3daysBefore] = useState();
	const [allowNotifications_weekBefore, setAllowNotifications_weekBefore] = useState();
	const [allowNotifications_2weeksBefore, setAllowNotifications_2weeksBefore] = useState();

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
			if (allowNotifications) {
				let date = new Date(expDate);
				//date.setHours(9); // send at 9:00am

				date.setHours(16);
				date.setMinutes(0);
				
				// if (allowNotifications_dayAfter) {
				// 	let dayAfter = new Date(date.getTime());
				// 	dayAfter.setDate(date.getDate() + 1);
				// 	if (isFutureDate(dayAfter)) {
				// 		scheduleNotification("Expired: " + name, name + " expired yesterday", dayAfter);
				// 	}
				// }
				if (allowNotifications_expDate) {
					if (isFutureDate(date)) {
						scheduleNotification("Expiring Soon: " + name, name + " expires today", date);
					}
				}
				// if (allowNotifications_3daysBefore) {
				// 	let threeDaysBefore = new Date(date.getTime());
				// 	threeDaysBefore.setDate(date.getDate() - 3);
				// 	if (isFutureDate(threeDaysBefore)) {
				// 		scheduleNotification("Expiring Soon: " + name, name + " expires in 3 days", threeDaysBefore);
				// 	}
				// }
				// if (allowNotifications_weekBefore) {
				// 	let weekBefore = new Date(date.getTime());
				// 	weekBefore.setDate(date.getDate() - 7);
				// 	if (isFutureDate(weekBefore)) {
				// 		scheduleNotification("Expiring Soon: " + name, name + " expires in 1 week", weekBefore);
				// 	}
				// }
				// if (allowNotifications_2weeksBefore) {
				// 	let twoWeeksBefore = new Date(date.getTime());
				// 	twoWeeksBefore.setDate(date.getDate() - 14);
				// 	if (isFutureDate(twoWeeksBefore)) {
				// 		scheduleNotification("Expiring Soon: " + name, name + " expires in 2 weeks", twoWeeksBefore);
				// 	}
				// }
			}
		}
	}

	const handleCancel = () => {
		params.goBack(params.itemUnitPrice)
	}

	function isFutureDate(date) {
		const now = new Date();
		if (date > now) return true;
		return false;
	}

	// get setting preferences from AsyncStorage
	const loadSettings = async () => {
		try {
		  const keys = [
			'@allowNotifications',
			'@allowNotifications_dayAfter',
			'@allowNotifications_expDate',
			'@allowNotifications_3daysBefore',
			'@allowNotifications_weekBefore',
			'@allowNotifications_2weeksBefore'
		  ];
	
		  for (let i = 0; i < keys.length; i++) {
			let settingValue = true;
			if(await AsyncStorage.getItem(keys[i]) == "false")
			  settingValue = false;
	
			switch (i) {
			  case 0:
				setAllowNotifications(settingValue);
				break;
			  case 1:
				setAllowNotifications_dayAfter(settingValue);
				break;
			  case 2:
				setAllowNotifications_expDate(settingValue);
				break;
			  case 3:
				setAllowNotifications_3daysBefore(settingValue);
				break;
			  case 4:
				setAllowNotifications_weekBefore(settingValue);
				break;
			  case 5:
				setAllowNotifications_2weeksBefore(settingValue);
				break;
			}
		  }
		} catch(err) {
		  console.error(err);
		}
	  }

	useEffect(() => {
		loadSettings();
	}, []);

	return (
		<View style={styles.transparent_container}>
			<View style={[{ flex: 2, justifyContent:'flex-end'}]}>
				<TextInput
					style={styles.inputField}
					placeholder="Official Item Name"
					placeholderTextColor="#9E9791"
					defaultValue={name}
					onEndEditing={(value) => name=value}
				/>
				<TextInput
					style={styles.inputField}
					placeholder="Common Item Name"
					placeholderTextColor="#9E9791"
					defaultValue={dispName}
					onEndEditing={(value) => dispName=value}
				/>
				<TextInput
					style={styles.inputField}
					placeholder="Quantity"
					placeholderTextColor="#9E9791"
					keyboardType="numeric"
					defaultValue={quantity}
					onEndEditing={(value) => quantity=value}
				/>
				<TextInput
					style={styles.inputField}
					placeholder="Unit Price"
					placeholderTextColor="#9E9791"
					keyboardType="numeric"
					defaultValue={price}
					onEndEditing={(value) => price=value}
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