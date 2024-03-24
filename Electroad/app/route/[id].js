import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import MapViewDirections from "react-native-maps-directions";
import { mapData } from "../../constants/index";
import * as Location from "expo-location";

const Route = () => {
  const station = useLocalSearchParams();
  
  const [flag,setFlag] = useState(false);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [leistDest, setLeistDest] = useState({
    latitude: null,
    longitude: null,
  });
  const [destination, setDestination] = useState({
    latitude: null,
    longitude: null,
  });
  const [origin, setOrigin] = useState({
    latitude: null,
    longitude: null,
  });

  const [point, setPoint] = useState({
    latitude: 0.0827,
    longitude: 0.2707,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let temp = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    setLocation(temp.coords);
  };

  useEffect(() => {
    userLocation();
    let tempDestination = mapData.ev.find(
      (loc) => loc.id === parseInt(station.id)
    );
    let tempLeistDest = mapData.leisure.find(
      (loc) => loc.id === parseInt(station.leisure_id)
    );

    console.log("Destination: " + JSON.stringify(tempDestination));
    console.log("Leisure Destination: " + JSON.stringify(tempLeistDest));
    if (tempDestination) {
      setDestination({
        latitude: tempDestination.latitude,
        longitude: tempDestination.longitude,
      });
    }
    if (tempLeistDest) {
      setFlag(true);
      setLeistDest({
        latitude: tempLeistDest.latitude,
        longitude: tempLeistDest.longitude,
      });
    }
  }, []);
  useEffect(() => {
    if (location.latitude != null) {
      setPoint({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.8,
        longitudeDelta: 0.8,
      });
      setOrigin({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  }, [location]);

  return (
    <View style={styles.container}>
      {location.latitude != null &&
        destination.latitude != null &&
        origin.latitude != null && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: (origin.latitude + destination.latitude) / 2,
              longitude: (origin.longitude + destination.longitude) / 2,
              latitudeDelta:
                Math.abs(origin.latitude - destination.latitude) + 1.0,
              longitudeDelta:
                Math.abs(origin.longitude - destination.longitude) + 0.0,
            }}
          >
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
              strokeWidth={2}
              strokeColor="green"
              mode={"DRIVING"}
            />
            {flag &&
              ((
                <MapViewDirections
                  origin={destination}
                  destination={leistDest}
                  apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
                  strokeWidth={1}
                  strokeColor="yellow"
                  mode={"WALKING"}
                />
              ) || (
                <Marker
                  coordinate={destination}
                  title="Leisure Point"
                  pinColor="Yellow"
                />
              ))}
            <Marker coordinate={origin} title="Starting Point" />
            <Marker
              coordinate={destination}
              title="Destination Point"
              pinColor="blue"
            />
          </MapView>
        )}
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
