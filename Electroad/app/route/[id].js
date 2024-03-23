import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocalSearchParams } from 'expo-router';
import MapViewDirections from 'react-native-maps-directions';
import { mapData } from '../../constants/index';

const Route = () => {  
  const { station } = useLocalSearchParams();
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    (async () => {
      let { coords } = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});
      setLocation(coords);

      let destination = mapData.ev.find((loc) => loc.id === parseInt(station));
      if (destination) {
        setDestination({
          latitude: destination.latitude,
          longitude: destination.longitude,
        });
      }
    })();
  }, []);

  if (!location || !destination) {
    return null; // or a loading indicator
  }

  const origin = {
    latitude: location.latitude,
    longitude: location.longitude,
  };



  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: (origin.latitude + destination.latitude) / 2,
          longitude: (origin.longitude + destination.longitude) / 2,
          latitudeDelta: Math.abs(origin.latitude - destination.latitude) + 1.0,
          longitudeDelta: Math.abs(origin.longitude - destination.longitude) + 0.0,
        }}
      >
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey= {process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
          strokeWidth={2}
          strokeColor="red"
          mode={'DRIVING'}
        />
        <Marker coordinate={origin} title="Starting Point" />
        <Marker coordinate={destination} title="Destination Point" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Route;
