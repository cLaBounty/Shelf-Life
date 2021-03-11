// Code Written by Rhys Sullivan

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Animated, TouchableOpacity } from 'react-native';

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
    const [ws, setWs] = useState(new WebSocket('ws://143.198.232.184:20500'));
    const [selected, setSelected] = useState([])
    // it would be good to find a way to keep this persistantly open
    ws.onopen = () => {
        // connection opened
        console.log('Connected to Server')        
        if (parseState == 'CODE') // only run if we haven't started to parse this barcode
        {
            message = "CODE^" + props.barcode
            console.log(message)
            ws.send(message); // send the barcode that was scanned to kick off conversation
        }
    };

    ws.onmessage = (e) => {
        console.log(`SERVER MESSAGE: ${e.data}`);
        split_message = e.data.split('^');
        status = split_message[0]
        data = split_message[1]
        switch (split_message[0]) {
            case 'NEED_SELECTION':
                setParseState(split_message[0])
                console.log(data.split('|'))
                setOfficialName(data.split('|'))
                break
            case 'ALL_INFO': // formatted as ALL_INFO|Official|Category|Common
                setParseState(split_message[0])
                data = data.split('|')
                setOfficialName(data[0])
                setCategory(data[1])
                setCommonName(data[2])
                break
            case 'ERROR':
                alert(data)
                setParseState('')
            default:
                break
        }


    };

    ws.onerror = (e) => {
        console.log(`SERVER ERROR: ${e.message}`);
    };

    ws.onclose = (e) => {
        console.log(`Closed Connection - Code: ${e.code} Reason: ${e.reason}`);
    };
    /*
    alert(`Barcode: ${props.barcode}
           Official Name: ${officalName}
           Common Name: ${commonName}
           Category: ${category}`);
    */


    
    sendSelectionToServer = () => {
        message = 'SELECTION^'
        if(selected.length == 0)
        {
            // TODO: ADD PROPER ERROR HANDLING
            alert('no selection')

            return
        }
        for(var i = 0; i < selected.length-1; i++)
        {
            message += officialName[selected[i]] + '|'
        }
        message += officialName[selected[selected.length-1]]
        console.log(message)
        ws.send(message);
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
                    <TouchableOpacity style={tempStyles.btn} onPress={()=>sendSelectionToServer()}>
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