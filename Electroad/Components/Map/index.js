import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";
import { FAB } from "react-native-paper";
import * as Location from "expo-location";
import { router } from "expo-router";
import LocationButton from "./LocationButton";
import { WebView } from "react-native-webview";
import { sampleData } from "./data";
import LottieView from "lottie-react-native";

export default function MapWithCurrentLocation() {
  const [point, setPoint] = useState({
    latitude: 13.0827, // default center to Chennai
    longitude: 80.2707,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [evStations, setEvStations] = useState(sampleData.ev);
  const [leisure, setLeisureSpots] = useState(sampleData.leisure);

  const CurrentLocationFinder = async () => {
    try {
      let location = await Location.getLastKnownPositionAsync();
      if (!location) {
        location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low,
        });
      }
      console.log("location", location);
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
      let locationServicesEnabled = await Location.hasServicesEnabledAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.");
        return;
      }

      const location = await CurrentLocationFinder();
      setLocation(location);

      if (location && location.coords) {
        setPoint({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
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
      }, 2200);
    }
  };

  useEffect(() => {
    // Use static data instead of API calls
    setEvStations(sampleData.ev);
    setLeisureSpots(sampleData.leisure);
    userLocation();
  }, []);

  // Build HTML for WebView, inject sample data and current position
  const html = `
  <!doctype html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
    <style>
      html,body,#map { height: 100%; margin: 0; padding: 0; }
      .searchBox { position: absolute; top: 8px; left: 8px; z-index: 1000; background: white; border-radius: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); }
      .searchBox input { width: 260px; padding:8px; border: none; outline: none; }
      .legend { position:absolute; bottom:8px; left:8px; background:white; padding:8px 12px; z-index:1000; font-size:12px; border-radius: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); }
      .legend-item { display: flex; align-items: center; margin: 4px 0; }
      .legend-color { width: 12px; height: 12px; border-radius: 50%; margin-right: 8px; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <div class="searchBox"><input id="q" placeholder="Search address (press Enter)"/></div>
    <div class="legend">
      <div class="legend-item"><div class="legend-color" style="background: green;"></div>EV Stations</div>
      <div class="legend-item"><div class="legend-color" style="background: red;"></div>Current Location</div>
      <div class="legend-item"><div class="legend-color" style="background: blue;"></div>Leisure Spots</div>
    </div>

    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script>
      const injected = ${JSON.stringify({
        point,
        ev: evStations,
        leisure: leisure,
      })};

      const startCenter = [injected.point.latitude || 13.0827, injected.point.longitude || 80.2707];
      const map = L.map('map').setView(startCenter, 12);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Custom icons
      const greenIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      const redIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      const blueIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Add current location marker (red)
      L.marker(startCenter, {icon: redIcon, title: 'Current Location'})
        .addTo(map)
        .bindPopup('📍 Current Location');

      // Add EV markers (green)
      (injected.ev || []).forEach(s => {
        try {
          const m = L.marker([s.latitude, s.longitude], {icon: greenIcon, title: s.name}).addTo(map);
          m.bindPopup('🔋 EV Station: ' + s.name);
          m.on('click', function(){
            if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ 
                type: 'station_click', 
                id: s._id || s.id,
                latitude: s.latitude,
                longitude: s.longitude,
                title: s.name,
                currentLat: startCenter[0],
                currentLng: startCenter[1]
              }));
            }
          });
        } catch(e){}
      });

      // Add leisure markers (blue)
      (injected.leisure || []).forEach(l => {
        const m = L.marker([l.latitude, l.longitude], {icon: blueIcon, title: l.name}).addTo(map);
        m.bindPopup('🎯 ' + (l.category || '') + ': ' + l.name);
      });

      // Search box using Nominatim
      document.getElementById('q').addEventListener('keydown', async function(e){
        if (e.key !== 'Enter') return;
        const q = e.target.value.trim();
        if (!q) return;
        const url = 'https://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + encodeURIComponent(q);
        try {
          const res = await fetch(url, { headers: { 'Accept': 'application/json' }});
          const data = await res.json();
          if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat), lon = parseFloat(data[0].lon);
            map.setView([lat, lon], 14);
          } else {
            alert('Not found');
          }
        } catch (err) {
          alert('Search error: ' + err.message);
        }
      });

    </script>
  </body>
  </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      {isLoading && (
        <LottieView
          source={require("../../assets/map2.json")}
          autoPlay
          loop
          style={styles.lottie}
          speed={1.1}
        />
      )}

      {!isLoading && (
        <SafeAreaView style={{ flex: 1 }}>
          <WebView
            originWhitelist={["*"]}
            source={{ html }}
            javaScriptEnabled
            domStorageEnabled
            onMessage={(event) => {
              try {
                const msg = JSON.parse(event.nativeEvent.data);
                if (msg.type === "station_click") {
                  // Navigate to station page with coordinates for routing
                  if (msg.id) {
                    router.push({
                      pathname: `/station/${msg.id}`,
                      params: {
                        stationLat: msg.latitude,
                        stationLng: msg.longitude,
                        currentLat: msg.currentLat,
                        currentLng: msg.currentLng,
                        stationTitle: msg.title,
                      },
                    });
                  }
                } else {
                  console.log("message from webview", msg);
                }
              } catch (e) {
                console.log("webview message raw:", event.nativeEvent.data);
              }
            }}
          />
        </SafeAreaView>
      )}

      <View
        style={{
          position: "absolute",
          margin: 30,
          right: 0,
          bottom: 0,
          zIndex: 100,
          flexDirection: "column",
          gap: 10,
        }}
      >
        <FAB
          icon="ev-station"
          onPress={() => {
            router.push("/station/f3e46b80-38d6-4043-9f79-3978f5ae839d");
          }}
        />
        <FAB icon="crosshairs-gps" onPress={userLocation} />
      </View>

      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  lottie: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
