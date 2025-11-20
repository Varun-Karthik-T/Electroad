// import React, { useState, useEffect } from "react";
// import { Text, StyleSheet, View } from "react-native";
// // import { FAB } from "react-native-paper";
// import MapView, { Marker } from "react-native-maps";
// // import * as Location from "expo-location";
// // import { router } from "expo-router";
// // import LocationButton from "./LocationButton";
// // import { getAllEvs } from "../api/api";
// // import LottieView from "lottie-react-native";
// // import loader from "@/assets/map1.json";

// const MapWithCurrentLocation = () => {
//   const [point, setPoint] = useState({
//     latitude: 0.0827,
//     longitude: 0.2707,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });
//   // const [errorMsg, setErrorMsg] = useState(null);
//   // const [isLoading, setIsLoading] = useState(true);
//   // const [location, setLocation] = useState(null);
//   // const [evStations, setEvStations] = useState([]); // State to hold EV station data

//   // const CurrentLocationFinder = async () => {
//   //   try {
//   //     let location = await Location.getLastKnownPositionAsync();
//   //     if (!location) {
//   //       location = await Location.getCurrentPositionAsync({
//   //         accuracy: Location.Accuracy.Low,
//   //       });
//   //     }
//   //     return location;
//   //   } catch (error) {
//   //     console.error("Error fetching location:", error);
//   //     throw error;
//   //   }
//   // };

//   // const userLocation = async () => {
//   //   try {
//   //     setIsLoading(true);
//   //     let { status } = await Location.requestForegroundPermissionsAsync();
//   //     let locationServicesEnabled = await Location.hasServicesEnabledAsync();

//   //     if (status !== "granted") {
//   //       setErrorMsg("Permission to access location was denied.");

//   //       return;
//   //     }

//   //     const location = await CurrentLocationFinder();
//   //     setLocation(location);

//   //     if (location && location.coords) {
//   //       setPoint({
//   //         latitude: location.coords.latitude,
//   //         longitude: location.coords.longitude,
//   //         latitudeDelta: 0.1,
//   //         longitudeDelta: 0.1,
//   //       });
//   //     } else {
//   //       setErrorMsg("Unable to fetch your current location.");
//   //     }
//   //   } catch (error) {
//   //     console.error(error);
//   //     setErrorMsg(
//   //       error.message || "An error occurred while fetching location."
//   //     );
//   //   } finally {
//   //     setInterval(() => {
//   //       setIsLoading(false);
//   //     }, 2200);
//   //   }
//   // };

//   // useEffect(() => {
//   //   const fetchEVs = async () => {
//   //     try {
//   //       const response = await getAllEvs();
//   //       setEvStations(response?.data || []);
//   //     } catch (error) {
//   //       console.error("Error fetching EVs:", error);
//   //     }
//   //   };

//   //   userLocation();
//   //   fetchEVs();
//   // }, []);

//   // return (
//   //   <View style={{ flex: 1 }}>
//   //     {isLoading && (
//   //       <LottieView
//   //         source={require("../../assets/map2.json")}
//   //         autoPlay
//   //         loop
//   //         style={styles.lottie}
//   //         speed={1.1}
//   //       />
//   //     )}
//   //     {!isLoading && (
//   //       <MapView
//   //         style={styles.map}
//   //         region={point}
//   //         initialRegion={point}
//   //         showsUserLocation={true}
//   //         showsMyLocationButton={false}
//   //         showsCompass={true}
//   //         userLocationAnnotationTitle="Current Location"
//   //         provider="google"
//   //         followsUserLocation={true}
//   //         showsScale={true}
//   //         scrollDuringRotateOrZoomEnabled={true}
//   //         zoomControlEnabled={false}
//   //       >
//   //         {/* Markers for EV stations */}
//   //         {evStations.map(
//   //           (station) => (
//   //             console.log("station", station),
//   //             (
//   //               <Marker
//   //                 key={station.id}
//   //                 coordinate={{
//   //                   latitude: station.location.lat,
//   //                   longitude: station.location.long,
//   //                 }}
//   //                 title={station.name}
//   //                 onPress={() => router.push(`/station/${station.id}`)}
//   //                 pinColor="blue"
//   //               />
//   //             )
//   //           )
//   //         )}
//   //       </MapView>
//   //     )}
//   //     <View
//   //       style={{
//   //         position: "absolute",
//   //         margin: 30,
//   //         right: 0,
//   //         bottom: 0,
//   //         zIndex: 100,
//   //         flexDirection: "column",
//   //         gap: 10,
//   //       }}
//   //     >
//   //       <FAB
//   //         icon="ev-station"
//   //         onPress={() => {
//   //           router.push("/station/f3e46b80-38d6-4043-9f79-3978f5ae839d");
//   //         }}
//   //       />
//   //       <FAB icon="crosshairs-gps" onPress={userLocation} />
//   //     </View>

//   //     {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
//   //   </View>
//   // );

//   return (
//     <View style={{ flex: 1 }}>
//       <MapView
//         style={styles.map}
//         initialRegion={point}
//         showsCompass={true}
        
//       />
//       </View>)
// };

// const styles = StyleSheet.create({
//   map: {
//     flex: 1
//   },
//   errorText: {
//     color: "red",
//     textAlign: "center",
//     marginTop: 10,
//   },
//   lottie: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default MapWithCurrentLocation;


import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapWithCurrentLocation = () => {
  const [point, setPoint] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <Text style={{ padding: 20, fontSize: 16 }}>Map should load below:</Text>
      <MapView
        style={styles.map}
        initialRegion={point}
        showsCompass={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    backgroundColor: '#e0e0e0'
  },
});

export default MapWithCurrentLocation;