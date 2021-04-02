import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../Style';

export default function ItemInfoScreen(params) {
    const [officialName, setOfficialName] = useState(params.itemNameOfficial);
    const [name, setName] = useState(params.itemName);
    const [quantity, setQuantity] = useState(params.itemQuantity);
    const [price, setPrice] = useState(params.itemUnitPrice);
    const [expDate, setExpDate] = useState(params.itemExpDate);

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
                <TouchableOpacity style={itemInfoStyles.submitBtn} onPress={() => params.resetScanner()}>
                    <Text style={itemInfoStyles.submitBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={itemInfoStyles.submitBtn} onPress={() => handleSubmit(officialName, name, quantity, price, expDate)}>
                    <Text style={itemInfoStyles.submitBtnText}>Submit</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const handleSubmit = (officialName, name, quantity, price, expDate) => {
    // TODO: Add item to pantry
    console.log(officialName)
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