// LocationButton.js
import React from "react";
import {View} from "react-native";
import { FAB } from "react-native-paper";

const LocationButton = ({ onPress }) => {
  return (
    <View style={{ position: "absolute",
    margin: 30,
    right: 0,
    bottom: 0,
    zIndex: 100,
    flexDirection: "column",
    gap: 10}}>
      <FAB
        icon="ev-station"
      />
      <FAB
        icon="map-search"
      />
      <FAB
        icon="crosshairs-gps"
        onPress={onPress}
      />
    </View>
  );
};

export default LocationButton;
