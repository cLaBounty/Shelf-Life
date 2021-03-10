#!/usr/bin/env python

# WS server example

import asyncio
import websockets
import requests
import json
from barcode_parser import findCommonNameFromOfficial

# UNDERSTANDING THE CODES
# CODE - RECEIVING BARCODE FROM CLIENT
# NEED_SELECTION - Just sent split name to client, client has to select
# SELECTION - Client just sent us the selection
# ALL_INFO - Respond to the client with common name, category, official name
# ERROR - Generic error out
async def messages(websocket, path):
    # While true keeps the connection open
    # This is a bit hacky
    # TODO: Have a timeout timer that counts up between messages
    # TODO: Look into parallization of tasks?    
    # TODO: Look into using a better delimeter than | ?
    
    api_response_json = None

    while True: 
        try:
            message = await websocket.recv()            
        except websockets.ConnectionClosed:
            print(f"Connection Terminated")
            break            
        if message != '':
            split_message = message.split('^')
            

            # TODO: Add improper input handling
            parseState = split_message[0]
            data = split_message[1]
            if parseState == 'CODE': # client just send barcode, respond with split official name
                print('======================')
                print("Sending split name")
                barcode = data                
                print('Barcode: ' + barcode)
                # 737628064502
                api_response = requests.get('https://world.openfoodfacts.org/api/v0/product/{0}.json'.format(barcode))
                api_response_json = api_response.json()
                if api_response_json['status_verbose'] == 'product found'
                    item_official_name = api_response_json["product"]["product_name_en"]

                    print('Item Official Name: ' + item_official_name)                
                
                    # TODO: Remove any non ABC chars, (include whitespace)
                    split_product_name = item_official_name.split(' ')                
                    response = "NEED_SELECTION^"
                    for x in range(len(split_product_name)-1):
                        response += split_product_name[x] + '|'
                    response += split_product_name[len(split_product_name)-1]
                    print("Response: " + response)
                    print('======================')
                    await websocket.send(response)  
                else:
                    response = "ERROR^Product Not Found"                    
                    print("Response: " + response)
                    print('======================')
                    await websocket.send(response)
            elif parseState == 'SELECTION': # client sent their selection 
                print('======================')
                print("Sending Official Name, Category, Common Name")
                official_name = 'Ronzoni, thin spaghetti'
                
                category = "MISSING"
                common_name = "MISSING"
                
                data = findCommonNameFromOfficial(data.split('|'))
                category = data[0]
                common_name = data[1]
                
                response = 'ALL_INFO^' + official_name + '|' + category + '|' + common_name                
                print("Response: " + response)
                print('======================')
                await websocket.send(response) 
    

start_server = websockets.serve(messages, "", 20500)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()