// Code Written by Rhys Sullivan

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Animated, TouchableOpacity } from 'react-native';
import ItemEntryPage from './itemEntry'
const GLOBAL = require('../Globals')
/*
Data Flow From Client <-> Server

Client sends barcode to server

Server looks up barcode, returns product name to client

Client picks relevant part of product name, sends that to server

Server reads through relevant parts of product name, finds matches, returns Common Name and Category

TODO: Add Nutritonal Info

ParseStates:
0 - nothing
1 - received broken up name
2 - received common name and category
*/




function ScanResult(props) {
    const [parseState, setParseState] = useState('CODE');
    const [officialNameSplit, setOfficialNameSplit] = useState([]);
    const [officialName, setOfficialName] = useState([]);
    const [commonName, setCommonName] = useState('');    
    const [category, setCategory] = useState('');
    const [nutritionInfo, setNutritionInfo] = useState();
    const [selected, setSelected] = useState([])
    const [id, setID] = useState(-1)
    useEffect(() => {
        (async () => {
            if (parseState == "CODE") {
                sendBarcodeToServer(props.barcode)
            }
        })();
    }, []);

    sendBarcodeToServer = (barcode) => {
        fetch(GLOBAL.BASE_URL + '/api/barcode/?barcode=' + barcode).then((response) => response.json()).then((json) => {
            status = json["Status"]
            if (status == "OK") { // successful sign up        
                setParseState("NEED_SELECTION")
                setOfficialName(json["Official Name"])
                setOfficialNameSplit(json["Official Name"].split(" "))
                if(json["Nutrition"]["Status"] == "OK")
                {
                    setNutritionInfo(json["Nutrition"])
                    console.log(json["Nutrition"])
                }
            } else if (status == "NOT_FOUND") {
                setParseState("NOT_FOUND")
            }
        }
        );
    }

    sendSelectionToServer = () => {
        if (selected.length == 0) {
            // TODO: ADD PROPER ERROR HANDLING
            alert('no selection')
            return
        }
        selected_parts = []
        for (var i = 0; i < selected.length; i++) {
            selected_parts.push(officialNameSplit[selected[i]])
        }
        selection_message = {}
        fetch(GLOBAL.BASE_URL + '/api/selection/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Selection": selected_parts,
                "Official Name": "Official Name"
            })

        }).then((response) => response.json()).then((json) => {
            status = json["Status"]
            if (status == "OK") { // successful sign up        
                setParseState("ENTERING_INFO")
                setOfficialNameSplit(json["Official Name"])
                setCategory(json["Category"])
                setCommonName(json["Common Name"])
                setID(json["Ingredient ID"])
            }
        }
        );
    }

    updateSelected = (index) => {
        newSelected = selected.slice()
        if (newSelected.includes(index)) {
            newSelected.splice(newSelected.indexOf(index), 1)
        }
        else {
            newSelected.push(index)
        }
        setSelected(newSelected)
    }


    return (
        <View style={styles.container}>
            {(parseState == 'CODE') && <Text style={tempStyles.btnText}>Awaiting Response from Server</Text>}
            {(parseState == '') && <Button title={'Tap to Scan Again'} onPress={props.press} />}
            {(parseState == 'NEED_SELECTION') &&
                <View >
                    {officialNameSplit.map((part, index) =>
                        <View style={{ flex: 0, marginBottom: 10 }} key={index}>
                            <TouchableOpacity
                                style={selected.includes(index) ? tempStyles.selected_btn : tempStyles.btn}
                                onPress={() => updateSelected(index)}>
                                <Text style={tempStyles.btnText}>{part}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <TouchableOpacity style={tempStyles.btn} onPress={() => sendSelectionToServer()}>
                        <Text style={tempStyles.btnText}>Send To Server</Text>
                    </TouchableOpacity>
                </View>
            }
            {(parseState == 'ENTERING_INFO') &&
                <ItemEntryPage itemNameOfficial={officialName}
                    itemName={commonName}
                    category={category}
                    barcode={props.barcode}
                    id={id}
                    nutritionInfo={nutritionInfo}
                    resetScanner={props.press}
                    goBack={() => props.goBack()}
                />
            }
            {(parseState == 'NOT_FOUND') &&
                <View>
                    <View style={{ flex: 0, marginBottom: 10 }}>
                        <Text style={tempStyles.btnText}>Not Found</Text>
                        <TouchableOpacity style={tempStyles.btn} onPress={() => props.goBack()}>
                            <Text style={tempStyles.btnText}>Quit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0, marginBottom: 10 }}>
                        <TouchableOpacity style={tempStyles.btn} onPress={() => setParseState("ENTERING_INFO")}>
                            <Text style={tempStyles.btnText}>Manual Entry</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0, marginBottom: 10 }}>
                        <TouchableOpacity style={tempStyles.btn} onPress={() => props.press()}>
                            <Text style={tempStyles.btnText}>Scan Again</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        opacity: 0.50
    },
    title: {
        fontSize: 72,
        fontFamily: 'Baskerville-Italic',
        fontWeight: '300',
        color: '#fff',
        letterSpacing: 4
    },
    loginInput: {
        width: 300,
        fontSize: 22,
        color: '#fff',
        margin: 25,
        padding: 3,
        paddingLeft: 0,
        borderColor: '#fff',
        borderBottomWidth: 1
    },
    loginBtn: {
        backgroundColor: '#5296E7',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10
    },
    loginBtnText: {
        fontSize: 16,
        color: '#fff',
        textTransform: 'uppercase',
        padding: 8,
        letterSpacing: 2
    }
});

{/* Temporary */ }
const tempStyles = StyleSheet.create({
    text: {
        fontSize: 24,
        color: '#fff',
        margin: 10
    },
    btn: {
        backgroundColor: '#5296E7',
        borderWidth: 0,
        borderRadius: 10
    },
    selected_btn: {
        backgroundColor: '#38689E',
        borderWidth: 0,
        borderRadius: 10
    },
    btnText: {
        fontSize: 16,
        color: '#fff',
        padding: 8,
        letterSpacing: 2
    }
});

export default ScanResult;