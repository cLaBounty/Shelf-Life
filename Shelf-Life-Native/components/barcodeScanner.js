// Code Written by Rhys Sullivan

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Animated, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


/*
Helpful Docs: https://docs.expo.io/versions/latest/sdk/bar-code-scanner/
https://blog.usejournal.com/creating-a-barcode-scanner-using-expo-barcode-scanner-in-a-react-native-cli-project-2d36a235ab41

*/

function Cam() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
      />
      <View style={styles.overlay}>
        <View style={styles.unfocusedContainer}></View>
        <View style={styles.middleContainer}>
          <View style={styles.unfocusedContainer}></View>
          <View
            style={styles.focusedContainer}>
            {!scanned && (
              <Animated.View
                style={[
                  styles.animationLineStyle,
                  {
                    transform: [
                      {
                        translateY: 225
                      },
                    ],
                  },
                ]}
              />
            )}
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}     
        </View>
        <View style={styles.unfocusedContainer}></View>
      </View>
      <View style={styles.unfocusedContainer}></View>
    </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  middleContainer: {
    flexDirection: 'row',
    flex: 1.5,
  },
  focusedContainer: {
    flex: 6,
  },
  animationLineStyle: {
    height: 2,
    width: '100%',
    backgroundColor: 'red',
  },
});

export default Cam;