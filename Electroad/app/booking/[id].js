import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, Pressable, StyleSheet } from "react-native";
import { Card, Title, Paragraph, useTheme, Switch } from "react-native-paper";
import { router } from "expo-router";

export default function SlotBookingPage({ navigation }) {
  const theme = useTheme();
  const [ports, setPorts] = useState([]);
  const [showAvailablePorts, setShowAvailablePorts] = useState(false);

  useEffect(() => {
    // Sample port data
    const portData = [
      { id: 1, status: "available", chargerType: "Type 1" },
      { id: 2, status: "booked", remainingTime: "1 hour 30 minutes", chargerType: "Type 2" },
      { id: 3, status: "disabled", chargerType: "Type 1" },
      // Add more ports as needed
    ];

    setPorts(portData);
  }, []);

  const handlePortSelection = (port) => {
    console.log("port: " + port)
    if (port.status === "available") {
      router.navigate(`port/${port}`)
    } else if (port.status === "disabled") {
      alert("This port is currently unavailable.");
    } else {
      alert("This port is currently booked/in use.");
    }
  };

  const toggleAvailablePorts = () => {
    setShowAvailablePorts(!showAvailablePorts);
  };

  const filteredPorts = showAvailablePorts ? ports.filter(port => port.status === "available") : ports;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme.colors.primary,
    },
    filterContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    filterText: {
      fontSize: 16,
      marginRight: 10,
    },
    cardContainer: {
      marginBottom: 20,
      borderRadius: 10,
      elevation: 3,
      padding: 15,
      borderWidth: 1,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
    },
    cardText: {
      fontSize: 16,
      marginBottom: 5,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ports in the Station</Text>
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Show Available Ports</Text>
        <Switch value={showAvailablePorts} onValueChange={toggleAvailablePorts} color={theme.colors.primary}/>
      </View>
      <ScrollView>
        {filteredPorts.map((port) => (
          <Pressable
            key={port.id}
            onPress={() => handlePortSelection(port)}
          >
            <Card style={styles.cardContainer}>
              <Title style={styles.cardTitle}>Port ID: {port.id}</Title>
              <Paragraph style={styles.cardText}>Charger Type: {port.chargerType}</Paragraph>
              {port.status === "booked" && (
                <Paragraph style={styles.cardText}>Remaining Time: {port.remainingTime}</Paragraph>
              )}
              {port.status === "disabled" && (
                <Paragraph style={styles.cardText}>This port is currently disabled.</Paragraph>
              )}
            </Card>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}