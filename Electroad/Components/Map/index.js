import React, { useState, useEffect, useRef } from "react";
import MapComponent from "./MapComponent";
import LocationButton from "./LocationButton";
import LoadingIndicator from "./LoadingIndicator";
import * as Location from "expo-location";

import data from "./data";

const MapWithCurrentLocation = () => {
  const [point, setPoint] = useState({
    latitude: 0.0827,
    longitude: 0.2707,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);

  const userLocation = async () => {
    setIsLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    const newPoint = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setPoint(newPoint);
    mapRef.current.animateToRegion(newPoint, 500);
    setIsLoading(false);
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <>
      <MapComponent
        region={point}
        onMapReady={() => setIsLoading(false)}
        data={data}
      />
      <LocationButton onPress={userLocation} />
      <LoadingIndicator isLoading={isLoading} />
      {errorMsg && <Text>{errorMsg}</Text>}
    </>
  );
};

export default MapWithCurrentLocation;
