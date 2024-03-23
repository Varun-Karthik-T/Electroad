import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import { FAB, ActivityIndicator, MD2Colors } from "react-native-paper";

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
    <View style={styles.container}>
      {isLoading && <ActivityIndicator animating={true} color={MD2Colors.red800} style={styles.activityindicator} />}
      <MapView
        ref={mapRef}
        style={styles.map}
        region={point}
        onMapReady={() => setIsLoading(false)}
      >
        <Marker coordinate={point} title="marker" />
      </MapView>
      <FAB
        icon="crosshairs-gps"
        style={styles.fab}
        onPress={() => {
          userLocation();
        }}
      />
      {errorMsg ? <Text>{errorMsg}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  map: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 30,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  activityindicator: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  }
});

export default MapWithCurrentLocation;