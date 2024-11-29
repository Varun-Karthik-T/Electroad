import {
  Card,
  Text,
  Button,
  useTheme,
  ProgressBar,
  IconButton,
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { View, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getStationById } from "@/Components/api/api";
import AppBar from "@/Components/AppBar";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const station = useLocalSearchParams();
  const [data, setData] = useState(null);

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

  useEffect(() => {
    async function fetchData() {
      AsyncStorage.setItem("stationID", station.id);
      const response = await getStationById(station.id);
      
      setData(response.data);
    }
    fetchData();
  }, [station.id]);

  if (!data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  const { location, name, ports, rating } = data;

  return (
    <PaperProvider theme={theme}>
      <ScrollView>
      <AppBar title="Station Details" />
      <View style={stationStyles.container}>
        <Card style={stationStyles.card}>
          <Card.Title
            title={name}
            subtitle={`Lat: ${location.lat}, Lon: ${location.lon}`}
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
                router.navigate(`/booking/${station.id}`);
              }}
            >
              Book a Slot
            </Button>
            <IconButton
              icon="directions"
              onPress={() => {
                router.navigate(`route/${station.id}`);
              }}
            />
          </Card.Actions>
        </Card>
        <Card style={stationStyles.card}>
          <Card.Content>
            <Text>No. of Charging Ports: {ports.length}</Text>
            {ports.map((port, index) => (
              <View key={index} style={stationStyles.port}>
                <Text>Type: {port.type}</Text>
                <Text>
                  Status: {port.enabled ? "Available" : "Unavailable"}
                </Text>
                {port.portId && <Text>Port ID: {port.portId}</Text>}
              </View>
            ))}
            <View style={stationStyles.review}>
              <Text>Rating: {rating} / 5</Text>
              <ProgressBar progress={rating / 5} color={theme.colors.primary} />
              <Button mode="contained-tonal" onPress={() => {}}>
                Leave a Review
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
      </ScrollView>
    </PaperProvider>
  );
}
