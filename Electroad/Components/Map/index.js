import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';

const MapWithCurrentLocation = () => {
  const [point, setPoint] = useState({
    latitude: 0.0827,
    longitude: 0.2707,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});
    setPoint({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.8,
      longitudeDelta: 0.8,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      userLocation();
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={point}>
        <Marker coordinate={point} title='marker' />
      </MapView>
      {errorMsg ? <Text>{errorMsg}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    flex: 1,
  },
});

export default MapWithCurrentLocation;
