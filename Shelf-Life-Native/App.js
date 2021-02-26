import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Cam from './components/barcodeScanner'

export default function App() {
  return (
      <Cam />
  );
}