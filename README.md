# Shelf Life

### [Demo](https://www.youtube.com/watch?v=1QK9zoBEifo)

## Summary
An iOS/Android application to digitize your pantry. Shelf Life tracks nutritional information, expiration dates, budget, and suggests recipes using the ingredients you already have. Built with React Native as well as Python, Flask, and SQL for the backend.

## Team Members
- Cameron LaBounty
- Ben Roberts
- Adam Cerutti
- Rhys Sullivan
- William Kloppenberg

## Setup Instructions
1. Install node/npm from https://nodejs.org/en/
2. Run `./dependencies.sh`
3. Install the Expo client app on your iOS or Android device

## Server Run Instructions
1. Follow the setup instructions in [Server/README](Server/README.md)
2. Edit [Globals.js](Shelf-Life-Native/Globals.js#L2) to your PC's IPv4 Address (if you're on windows type `ipconfig` into the command line to find this)
3. Run `python3 Server.py`

## Run Instructions
1. Open the Shelf-Life-Native folder in the command line and type `expo start`
2. Android -> Scan the QR Code using the Expo app | iOS -> Scan the QR Code using the Camera app