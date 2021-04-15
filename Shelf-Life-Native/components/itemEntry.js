import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import styles from '../Style';
const GLOBAL = require('../Globals')

export default function ItemEntryPage(params) {
    const [officialName, setOfficialName] = useState(params.itemNameOfficial);
    const [name, setName] = useState(params.itemName);
    const [quantity, setQuantity] = useState(params.itemQuantity);
    const [price, setPrice] = useState(params.itemUnitPrice);
    const [expDate, setExpDate] = useState(params.itemExpDate);
    const [itemAddingState, setItemAddingState] = useState("EDITING_VALUES");

    handleSubmit = (officialName, name, quantity, price, expDate) => {
        setItemAddingState("SENDING_TO_SERVER")
        fetch(GLOBAL.BASE_URL + '/api/user/pantry/add', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "key": GLOBAL.LOGIN_TOKEN,
                "item_official_name": officialName
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
        }
        );
    }

    handleCancel = () =>
    {        
        params.goBack()
    }

    return (
        <View style={styles.transparent_container}>            
            <View style={[{ flex: 2, justifyContent:'flex-end'}]}>
                <TextInput
                    style={styles.inputField}
                    placeholder="Official Item Name"
                    placeholderTextColor="#9E9791"
                    defaultValue={params.itemNameOfficial}
                    onChangeText={(value) => setOfficialName(value)}
                />
                <TextInput
                    style={styles.inputField}
                    placeholder="Common Item Name"
                    placeholderTextColor="#9E9791"
                    defaultValue={params.itemName}
                    onChangeText={(value) => setName(value)}
                />
                <TextInput
                    style={styles.inputField}
                    placeholder="Quantity"
                    placeholderTextColor="#9E9791"
                    keyboardType="numeric"
                    defaultValue={"1"}
                    onChangeText={(value) => setQuantity(value)}
                />
                <TextInput
                    style={styles.inputField}
                    placeholder="Unit Price"
                    placeholderTextColor="#9E9791"
                    keyboardType="numeric"
                    defaultValue={params.itemUnitPrice}
                    onChangeText={(value) => setPrice(value)}
                />
                <TextInput
                    style={styles.inputField}
                    placeholder="Expiration Date"
                    placeholderTextColor="#9E9791"
                    keyboardType="numbers-and-punctuation"
                    defaultValue={params.itemExpDate}
                    onChangeText={(value) => setExpDate(value)}
                />
            </View>
            <View style={itemInfoStyles.button_container}>                
                {params.resetScanner && 
                <TouchableOpacity style={itemInfoStyles.submitBtn} onPress={() => params.resetScanner()}>
                    <Text style={itemInfoStyles.submitBtnText}>Scan Again</Text>
                </TouchableOpacity>
                }
                {(itemAddingState == "EDITING_VALUES") &&
                <TouchableOpacity style={itemInfoStyles.submitBtn} onPress={() => handleSubmit(officialName, name, quantity, price, expDate)}>
                    <Text style={itemInfoStyles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
                }
                {(itemAddingState == "SENDING_TO_SERVER") &&                
                    <Text style={itemInfoStyles.submitBtnText}>Sending to Server</Text>                
                }
                {(itemAddingState == "ADDED") &&                
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
    }
});