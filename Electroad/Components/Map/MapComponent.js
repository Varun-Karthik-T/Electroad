// MapComponent.js
import React from "react";
import { StyleSheet } from "react-native";

import MapView, { Marker } from "react-native-maps";

const MapComponent = ({ region, onMapReady, data }) => {
  
  return (
    <MapView style={styles.map} region={region} onMapReady={onMapReady}>
      <Marker coordinate={region} title="Current Location" />

      {data.ev.map((location) => (
        <Marker
          key={location.id}
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          // ev staion id here
          title={location.title}  onPress={() => {alert('You clicked on ' + location.title)}}
          pinColor="blue"
          
        />
      ))}


    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapComponent;