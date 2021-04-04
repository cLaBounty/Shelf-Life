#!/bin/bash

GREEN='\033[0;32m'

cd Shelf-Life-Native/
npm install -g expo-cli
expo install expo-barcode-scanner
npm install @react-navigation/native @react-navigation/stack
expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
npm install react-native-section-alphabet-list
npm install @react-navigation/bottom-tabs
npm i react-native-floating-action --save
npm install @react-navigation/material-top-tabs react-native-tab-view@^2.16.0
npm install @react-navigation/native
cd ..
echo -e "${GREEN}All dependencies were successfully installed"
