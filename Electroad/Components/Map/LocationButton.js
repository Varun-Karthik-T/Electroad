// LocationButton.js
import React from "react";
import { FAB } from "react-native-paper";

const LocationButton = ({ onPress }) => {
  return (
    <FAB
      icon="crosshairs-gps"
      onPress={onPress}
      style={{
        position: "absolute",
        margin: 30,
        right: 0,
        bottom: 0,
        zIndex: 100,
      }}
    />
  );
};

export default LocationButton;
