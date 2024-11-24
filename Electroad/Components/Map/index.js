import React, { useState, useEffect, useRef } from "react";
import MapComponent from "./MapComponent";
import LocationButton from "./LocationButton";
import LoadingIndicator from "./LoadingIndicator";
import * as Location from "expo-location";

import {mapData as data} from "@/constants";

const MapWithCurrentLocation = () => {
  const [point, setPoint] = useState({
    latitude: 0.0827,
    longitude: 0.2707,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userLocation = async () => {
  try{
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

    } catch (error) {
        console.log(error);
        setErrorMsg(error);
    }

  };

  useEffect(() => {
const interval = setInterval(() => {
      userLocation();
    }, 5000);

    userLocation();

   return () => clearInterval(interval);
  }, []);

  return (
    <>
      <MapComponent
        region={point}
        onMapReady={() => setIsLoading(false)}
        data={data}
      />
      <LocationButton onPress={userLocation} />
      <LocationButton/>
      <LoadingIndicator isLoading={isLoading} />
      {errorMsg && <Text>{errorMsg}</Text>}
    </>
  );
};

export default MapWithCurrentLocation;
