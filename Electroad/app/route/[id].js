import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import MapViewDirections from "react-native-maps-directions";
import { FAB, PaperProvider } from "react-native-paper";
import * as Location from "expo-location";
import { getStationById } from "@/Components/api/api";
import LottieView from "lottie-react-native";
import AppBar from "@/Components/AppBar";

const Route = () => {
  const station = useLocalSearchParams();
  const theme = {
    colors: {
      primary: "rgb(0, 110, 11)",
      onPrimary: "rgb(255, 255, 255)",
      primaryContainer: "rgb(138, 252, 122)",
      onPrimaryContainer: "rgb(0, 34, 1)",
      secondary: "rgb(38, 108, 43)",
      onSecondary: "rgb(255, 255, 255)",
      secondaryContainer: "rgb(170, 245, 164)",
      onSecondaryContainer: "rgb(0, 34, 4)",
      tertiary: "rgb(4, 110, 22)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(47, 49, 45)",
      inverseOnSurface: "rgb(241, 241, 235)",
      inversePrimary: "rgb(110, 222, 97)",
  
      surfaceDisabled: "rgba(26, 28, 25, 0.12)",
      onSurfaceDisabled: "rgba(26, 28, 25, 0.38)",
      backdrop: "rgba(44, 50, 42, 0.4)",
    },
  };
  const [destination, setDestination] = useState({
    latitude: 12.936259,
    longitude: 80.130957,
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

  const CurrentLocationFinder = async () => {
    try {
      let location = await Location.getLastKnownPositionAsync();
      if (!location) {
        location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low,
        });
      }
      return location;
    } catch (error) {
      console.error("Error fetching location:", error);
      throw error;
    }
  };

  const userLocation = async () => {
    try {
      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      await Location.hasServicesEnabledAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.");
        setIsLoading(false);
        return;
      }

      const location = await CurrentLocationFinder();
      setOrigin(location);

      if (location && location.coords) {
        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setPoint({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
        console.log("Origin:", {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        setErrorMsg("Unable to fetch your current location.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error.message || "An error occurred while fetching location."
      );
    } finally {
      setInterval(() => {
        setIsLoading(false);
      }, 3800);
    }
  };

  useEffect(() => {
    userLocation();

    const fetchData = async () => {
      try {
        const response = await getStationById(station.id);
        setDestination({
          latitude: response.data.location.lat,
          longitude: response.data.location.lon,
        });
        console.log("Destination:", JSON.stringify(destination));
      } catch (error) {
        console.error("Failed to fetch station by ID:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <AppBar title="Route" />
      {isLoading && (
        <LottieView
          source={require("../../assets/map1.json")}
          autoPlay
          loop
          style={styles.lottie}
          speed={1.8}
          colorFilters={[
            {
              keypath: "button",
              color: "rgb(0, 200, 0)",
            },
            {
              keypath: "Sending Loader",
              color: "rgb(120, 200, 120)",
            },
            {
              keypath: "Layer 1",
              color: "rgb(140, 200, 40)",
            },
            {
              keypath: "Layer 2",
              color: "rgb(120, 200, 120)",
            },
            {
              keypath: "Layer 3",
              color: "rgb(0, 200, 100)",
            },
            {
              keypath: "Layer 4",
              color: "rgb(120, 200, 120)",
            },
            {
              keypath: "Layer 5",
              color: "rgb(0, 200, 0)",
            },
            {
              keypath: "Layer 6",
              color: "rgb(255, 255, 255)",
            },
            {
              keypath: "Layer 7",
              color: "rgb(255, 255, 255)",
            },
            {
              keypath: "Layer 8",
              color: "rgb(255, 255, 255)",
            },
            {
              keypath: "Layer 9",
              color: "rgb(255, 255, 255)",
            },
            {
              keypath: "Layer 10",
              color: "rgb(255, 255, 255)",
            },
          ]}
        />
      )}
      {!isLoading && (
        <View style={styles.container}>
          {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
          {!isLoading &&
            destination.latitude != null &&
            origin.latitude != null && (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: (origin.latitude + destination.latitude) / 2,
                  longitude: (origin.longitude + destination.longitude) / 2,
                  latitudeDelta:
                    Math.abs(origin.latitude - destination.latitude) + 0.1,
                  longitudeDelta:
                    Math.abs(origin.longitude - destination.longitude) + 0.1,
                }}
                initialCamera={{
                  center: {
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                  },
                  pitch: 90,
                  heading: 0,
                  altitude: 800,
                  zoom: 18,
                }}
                camera={{
                  center: {
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                  },
                  pitch: 80,
                  heading: 90,
                  altitude: 800,
                  zoom: 19,
                }}
                region={point}
                showsUserLocation={true}
                showsMyLocationButton={false}
                showsCompass={true}
                userLocationAnnotationTitle="Current Location"
                provider="google"
                followsUserLocation={true}
                showsScale={true}
                userLocationUpdateInterval={500}
                showsBuildings={true}
                showsIndoors={true}
                scrollDuringRotateOrZoomEnabled={true}
                showsTraffic={true}
                userLocationFastestInterval={500}
              >
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
                  strokeWidth={6}
                  strokeColor="green"
                  mode={"DRIVING"}
                />

                <Marker
                  coordinate={destination}
                  title="Destination Point"
                  pinColor="blue"
                />
              </MapView>
            )}
          <FAB
            style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
            icon="refresh"
            onPress={userLocation}
          />
        </View>
      )}
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  lottie: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Route;
