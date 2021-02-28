// Code Written by Rhys Sullivan

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Animated} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


/*
Helpful Docs: 
https://docs.expo.io/versions/latest/sdk/bar-code-scanner/
https://blog.usejournal.com/creating-a-barcode-scanner-using-expo-barcode-scanner-in-a-react-native-cli-project-2d36a235ab41

This is currently a functional component however it may be better suited as a class component
*/

function Cam() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);


  // Some reading on 'useEffect'
  // https://reactjs.org/docs/hooks-effect.html
  // Important Notes:
  // Runs on each render & every update
  // This portion handles camera permissions

  // In this case we are passing an anonymous function to useEffect & calling it right away
  // https://www.javascripttutorial.net/javascript-anonymous-functions/

  // the [] at the end of UseEffect is to run the effect and clean it up only once, 
  // this tells react that your effect doesn't depend on any values from props or state,
  // so it never needs to rerun
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    // TODO: EXTEND CODE HERE WITH DATA HANDLING
  };

  // Can add barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]} to BarCodeScanner
  // for efficiency

  // onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
  // if scanned is true, then we pass undefined in as the function to handle a scanned barcode
  // this pauses the barcode scanner, allowing for us to handle the scanned result

  // {scanned && ...} is an example of conditional rendering, if scanned is true,
  // the elements after the && will be added to the screen
  // https://reactjs.org/docs/conditional-rendering.html
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}/>
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