#!/usr/bin/env python

# WS server example

import asyncio
import websockets

async def messages(websocket, path):
    message = await websocket.recv()    
    print(message)
    await asyncio.sleep(10)
    await websocket.send('pong')        
    await asyncio.sleep(10)
    await websocket.send('ping')        

start_server = websockets.serve(messages, "", 20500)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()