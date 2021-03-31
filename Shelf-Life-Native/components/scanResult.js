// Code Written by Rhys Sullivan

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Animated, TouchableOpacity } from 'react-native';
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
    const [officialName, setOfficialName] = useState([]);
    const [commonName, setCommonName] = useState('');
    const [category, setCategory] = useState('');
    const [selected, setSelected] = useState([])

    useEffect(() => {
        (async () => {
            if (parseState == "CODE")
            {
                sendBarcodeToServer(props.barcode)
            }
        })();
      }, []);
      
    sendBarcodeToServer = (barcode) => {
        fetch(GLOBAL.BASE_URL+ '/api/barcode/?barcode=' + barcode).then((response) => response.json()).then((json) => {
            status = json["Status"]
            if (status == "OK") { // successful sign up        
                setParseState("NEED_SELECTION")
                setOfficialName(json["Official Name"].split(" "))
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
            selected_parts.push(officialName[selected[i]])
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
                setParseState("ALL_INFO")
                setOfficialName(json["Official Name"])
                setCategory(json["Category"])
                setCommonName(json["Common Name"])
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
                <View>
                    {officialName.map((part, index) =>
                        <TouchableOpacity
                            style={selected.includes(index) ? tempStyles.selected_btn : tempStyles.btn}
                            key={index}
                            onPress={() => updateSelected(index)}>
                            <Text style={tempStyles.btnText}>{part}</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={tempStyles.btn} onPress={() => sendSelectionToServer()}>
                        <Text style={tempStyles.btnText}>Send To Server</Text>
                    </TouchableOpacity>
                </View>
            }
            {(parseState == 'ALL_INFO') &&
                <View>
                    <Text style={tempStyles.btnText}>Official Name: {officialName}</Text>
                    <Text style={tempStyles.btnText}>Category: {category}</Text>
                    <Text style={tempStyles.btnText}>Common Name: {commonName}</Text>
                    <Button title={'Tap to Scan Again'} onPress={props.press} />
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
        backgroundColor: '#595959',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        margin: 5
    },
    selected_btn: {
        backgroundColor: '#000000',
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
    }
});

export default ScanResult;