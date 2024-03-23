import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocalSearchParams } from 'expo-router';
import MapViewDirections from 'react-native-maps-directions';

const Route = ({ olatitude, olongitude, dlatitude, dlongitude }) => {
  const [destination, setDestination] = useState({
    latitude: dlatitude,
    longitude: dlongitude,
  });

  const station_id = useLocalSearchParams();

  const [origin, setOrigin] = useState({
    latitude: olatitude,
    longitude: olongitude,
  });

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
