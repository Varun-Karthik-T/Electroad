import React from "react";
import { SafeAreaView, Alert } from "react-native";
import { WebView } from "react-native-webview";

const Route = ({ olatitude, olongitude, dlatitude, dlongitude }) => {
  const origin = [olatitude || 13.0827, olongitude || 80.2707];
  const dest = [dlatitude || 13.0674, dlongitude || 80.2376];

  const html = `
  <!doctype html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
    <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.css" />
    <style>html,body,#map{height:100%;margin:0;padding:0;}</style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.js"></script>
    <script>
      const map = L.map('map').setView([${origin[0]}, ${origin[1]}], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19, attribution:'© OpenStreetMap contributors'}).addTo(map);

      const routingControl = L.Routing.control({
        waypoints: [ L.latLng(${origin[0]}, ${origin[1]}), L.latLng(${dest[0]}, ${dest[1]}) ],
        router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
        lineOptions: { styles: [{color: 'red', opacity: 0.8, weight: 6}] },
        show: true,
        routeWhileDragging: false
      }).addTo(map);

      routingControl.on('routesfound', function(e){
        const route = e.routes[0];
        const msg = { distance_m: route.summary.totalDistance, duration_s: route.summary.totalTime };
        if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
          window.ReactNativeWebView.postMessage(JSON.stringify(msg));
        }
      });
    </script>
  </body>
  </html>
  `;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        javaScriptEnabled
        domStorageEnabled
        onMessage={(event) => {
          try {
            const data = JSON.parse(event.nativeEvent.data);
            Alert.alert(
              "Route",
              `${(data.distance_m / 1000).toFixed(2)} km · ${Math.round(
                data.duration_s / 60
              )} min`
            );
          } catch (e) {
            console.log("route message", event.nativeEvent.data);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default Route;
