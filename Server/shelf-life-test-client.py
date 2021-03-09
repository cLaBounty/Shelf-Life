#!/usr/bin/env python

# WS client example

import asyncio
import websockets

async def hello():
    uri = "ws://localhost:20500"
    #uri = "ws://184.171.155.35:20500"
    async with websockets.connect(uri) as websocket:
        print("Connected!")
        message = input()
        print("Sending " + message)
        await websocket.send(message)        
        print("Sent")
        
        response = await websocket.recv()
        print("Received: " + response)
        await asyncio.sleep(10)
        print("closed")

asyncio.get_event_loop().run_until_complete(hello())