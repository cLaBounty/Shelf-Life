#! /bin/bash
npm install -g expo-cli
npm install @react-navigation/native @react-navigation/stack
expo install expo-barcode-scanner
expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
chmod 755 android/gradlew
cd ios
pod install
