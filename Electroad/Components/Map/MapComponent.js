// MapComponent.js
import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapComponent = ({ region, onMapReady }) => {
  return (
    <MapView style={styles.map} region={region} onMapReady={onMapReady}>
      <Marker coordinate={region} title="marker" />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapComponent;
