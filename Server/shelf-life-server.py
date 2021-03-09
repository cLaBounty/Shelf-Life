#!/usr/bin/env python

# WS server example

import asyncio
import websockets

async def messages(websocket, path):
    # While true keeps the connection open
    # This is a bit hacky
    # TODO: Have a timeout timer that counts up between messages
    # TODO: Look into parallization of tasks?    
            
    while True: 
        try:
            message = await websocket.recv()
            print(message)
        except websockets.ConnectionClosed:
            print(f"Connection Terminated")
            break    
        print(message)
        if message != '':
            await websocket.send('pong')            
    

start_server = websockets.serve(messages, "", 20500)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()