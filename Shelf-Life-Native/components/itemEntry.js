import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import styles from '../Style';
const GLOBAL = require('../Globals')

export default function ItemEntryPage(params) {
	let name = ""
	let dispName = ""
	let amount = ""
	let price = ""
	let mode = "new" //set to "edit" for editing an ingredient	
	let exp_date = ""
	let barcode = -1
	let category = "Misc"
	let nutritionInfo = {
		Status: "ERROR"
	}
	if (params.item) {
		exp_date = params.item.expDate
	}
	const [expDate, setExpDate] = useState(exp_date);
	const [itemAddingState, setItemAddingState] = useState("EDITING_VALUES")

	if (params.item) { //Check data for existing item in if one is passed
		name = params.item.name
		dispName = params.item.dispName
		amount = params.item.quantity
		mode = "edit"
		price = params.item.price
	}
	else if (params.itemName) { //Adding a new pantry item
		name = params.itemNameOfficial
		dispName = params.itemName
		category = params.category
		barcode = params.barcode
		nutritionInfo = params.nutritionInfo
	}

	const handleSubmit = () => {
		console.log(amount)
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
					"barcode": barcode,
					"nutrition_info": nutritionInfo,
					"category": category,
					"price": price,
					"exp_date": expDate,
					"quantity": amount
				})

			}).then((response) => response.json()).then((json) => {
				status = json["Status"]
				if (status == "OK") { // successful sign up        
					setItemAddingState("ADDED")
				}
				else if (status = "INVALID TOKEN") {
					alert("Invalid login token, log in again")
				}
			}
			);
		}
		if (mode == "edit") {
			//TODO: Add pantry server code
			setItemAddingState("UPDATED")
			fetch(GLOBAL.BASE_URL + '/api/user/pantry/remove', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"key": GLOBAL.LOGIN_TOKEN,
					"item_id": params.item.id,
				})

			}).then((response) => response.json()).then((json) => {
				status = json["Status"]
				if (status == "OK") { // successful sign up     
					mode = "new"
					handleSubmit()
				}
				else if (status == "INVALID TOKEN") {
					alert("Invalid login token, log in again")
				} else if (status == "INVALID ITEM ID") {
					alert("Item ID not found in database")
				}
			}
			);
		}
	}


	const handleCancel = () => {
		params.goBack(params.itemUnitPrice)
	}

	return (
		<View style={styles.transparent_container}>
			<View style={[{ flex: 2, justifyContent: 'flex-end' }]}>
				<TextInput
					style={styles.inputField}
					placeholder="Official Item Name"
					placeholderTextColor="#9E9791"
					defaultValue={name}
					onChangeText={(value) => name = value}
				/>
				<TextInput
					style={styles.inputField}
					placeholder="Quantity"
					placeholderTextColor="#9E9791"
					keyboardType="numeric"
					defaultValue={amount.toString()}
					onChangeText={(value) => amount = value}
				/>
				<TextInput
					style={styles.inputField}
					placeholder="Unit Price"
					placeholderTextColor="#9E9791"
					keyboardType="numeric"
					defaultValue={price.toString()}
					onChangeText={(value) => price = value}
				/>
				<DatePicker
					style={itemInfoStyles.datePicker}
					date={expDate}
					mode="date"
					placeholder="Expiration Date"
					format="MMMM Do, YYYY"
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