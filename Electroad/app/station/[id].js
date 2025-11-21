import {
  Card,
  Text,
  Button,
  useTheme,
  ProgressBar,
  IconButton,
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Chip,
} from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { View, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AppBar from "@/Components/AppBar";
import { ActivityIndicator } from "react-native-paper";
//import { sampleData } from "@/Components/Map/data";
import { getAllEvs } from "../../Components/api/api";

export default function StationPage() {
  const theme = {
    ...DefaultTheme,
    colors: {
      primary: "rgb(0, 110, 11)",
      onPrimary: "rgb(255, 255, 255)",
      background: "rgb(252, 253, 246)",
      surface: "rgb(252, 253, 246)",
      onSurface: "rgb(26, 28, 25)",
    },
  };

  const params = useLocalSearchParams();
  const { id, stationLat, stationLng, currentLat, currentLng, stationTitle } =
    params;
  const [isLoading, setIsLoading] = useState(false);
  const [station, setStation] = useState(null);
  const [nearbyLeisure, setNearbyLeisure] = useState([]);


  // Find station from sample data
 // const station = sampleData.ev.find((s) => s.id === parseInt(id));
 

    useEffect(() => {
      const load = async () => {
        const resp = await getAllEvs();
        const allStations = resp?.data || [];

        const s = allStations.find(x => 
          x._id === id || x.id === id || x.name === id
        );

        setStation(s);
      };
      load();
    }, []);


  // Find leisure activities near this station
 // const nearbyLeisure = sampleData.leisure.filter((l) => l.id === parseInt(id));

  const stationStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    card: {
      width: "85%",
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 8,
      padding: 1,
      margin: 16,
      backgroundColor: theme.colors.surface,
    },
    review: {
      borderColor: theme.colors.primary,
      borderStyle: "solid",
      borderWidth: 2,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginVertical: 10,
    },
    port: {
      padding: 10,
      marginVertical: 5,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    coverImage: {
      marginVertical: 10,
      marginHorizontal: 22,
    },
    actions: {
      justifyContent: "space-between",
      paddingHorizontal: 10,
    },
  });

  const handleGetDirections = () => {
    const oLat = currentLat || params.currentLat;
    const oLng = currentLng || params.currentLng;
    const dLat = stationLat || station?.latitude;
    const dLng = stationLng || station?.longitude;
    const sTitle = stationTitle || station?.title;

    router.push({
      pathname: "/route",
      params: {
        olatitude: oLat,
        olongitude: oLng,
        dlatitude: dLat,
        dlongitude: dLng,
        stationName: sTitle,
      },
    });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  if (!station) {
    return (
      <PaperProvider theme={theme}>
        <AppBar title="Station Details" />
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.error}>⚠️ Station not found</Text>
            </Card.Content>
          </Card>
        </View>
      </PaperProvider>
    );
  }

  const displayTitle = stationTitle || station.title;
  const displayLat = stationLat || station.latitude;
  const displayLng = stationLng || station.longitude;

  // Sample port data for demo
  // const samplePorts = [
  //   { type: "Type 2 (AC)", enabled: true, portId: "P001" },
  //   { type: "CCS (DC)", enabled: true, portId: "P002" },
  //   { type: "CHAdeMO (DC)", enabled: false, portId: "P003" },
  // ];

  return (
    <PaperProvider theme={theme}>
      <ScrollView>
        <AppBar title="Station Details" />
        <View style={stationStyles.container}>
          <Card style={stationStyles.card}>
            <Card.Title
              title={`🔋 ${displayTitle}`}
              subtitle={`Lat: ${displayLat}, Lon: ${displayLng}`}
            />
            <Card.Cover
              style={stationStyles.coverImage}
              source={{
                uri: "https://d382rz2cea0pah.cloudfront.net/wp-content/uploads/2023/06/Untitled-design-2023-06-21T142313.086.jpg",
              }}
            />
            <Card.Actions style={stationStyles.actions}>
              <Button
                mode="contained"
                onPress={() => {
                  router.navigate(`/booking/${id}`);
                }}
              >
                Book a Slot
              </Button>
              <IconButton icon="directions" onPress={handleGetDirections} />
            </Card.Actions>
          </Card>

          <Card style={stationStyles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>⚡ Charging Ports</Text>
              <Text>No. of Charging Ports: {station.connectors.length}</Text>

              {station.connectors.map((port, index) => (
                <View key={index} style={stationStyles.port}>
                  <Text>Type: {port}</Text>
                  <Text>Status: {station.status === "available" ? "✅ Available" : "❌ Unavailable"}</Text>
                  <Text>Power Output: {station.power} kW</Text>
                </View>
              ))}
              <View style={stationStyles.review}>
                <Text>⭐ Rating: 4.5 / 5</Text>
                <ProgressBar progress={4.5 / 5} color={theme.colors.primary} />
                <Button mode="contained-tonal" onPress={() => {}}>
                  Leave a Review
                </Button>
              </View>
            </Card.Content>
          </Card>

          {nearbyLeisure.length > 0 && (
            <Card style={stationStyles.card}>
              <Card.Content>
                <Text style={styles.sectionTitle}>
                  🎯 Nearby Leisure Activities
                </Text>
                {nearbyLeisure.map((leisure) => (
                  <View key={leisure.leisure_id} style={styles.leisureItem}>
                    <Chip icon="map-marker" style={styles.chip} mode="outlined">
                      {leisure.category}
                    </Chip>
                    <Text style={styles.leisureName}>{leisure.name}</Text>
                  </View>
                ))}
              </Card.Content>
            </Card>
          )}

          <Button
            mode="contained"
            onPress={handleGetDirections}
            style={styles.button}
            icon="directions"
            contentStyle={styles.buttonContent}
          >
            Get Directions to {displayTitle}
          </Button>
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 12,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    width: 100,
  },
  info: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  divider: {
    marginVertical: 16,
  },
  leisureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  chip: {
    marginRight: 12,
  },
  leisureName: {
    fontSize: 14,
    flex: 1,
    fontWeight: "500",
  },
  button: {
    marginTop: 8,
    marginBottom: 24,
    marginHorizontal: 16,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  error: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
