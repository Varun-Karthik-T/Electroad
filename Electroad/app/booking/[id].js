import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  Card,
  Title,
  Paragraph,
  useTheme,
  Switch,
  PaperProvider,
  Button,
} from "react-native-paper";
import { schedulePushNotification } from "../../Components/notify";
import { sampleData } from "@/Components/Map/data";
import { useLocalSearchParams } from "expo-router";
import AppBar from "@/Components/AppBar";

export default function SlotBookingPage() {
  const params = useLocalSearchParams();
  const { id } = params;

  const [ports, setPorts] = useState([]);
  const [cars, setCars] = useState([
    {
      id: 1,
      name: "Tesla Model 3",
      batteryType: "Lithium-Ion",
      batteryCapacity: 75,
    },
    {
      id: 2,
      name: "Tata Nexon EV",
      batteryType: "Lithium-Ion",
      batteryCapacity: 30.2,
    },
    {
      id: 3,
      name: "MG ZS EV",
      batteryType: "Lithium-Ion",
      batteryCapacity: 44.5,
    },
  ]);
  const [showAvailablePorts, setShowAvailablePorts] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [remainingPercent, setRemainingPercent] = useState("");
  const [selectedPort, setSelectedPort] = useState();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [slotTimings, setSlotTimings] = useState("");
  const [startChargePercent, setStartChargePercent] = useState("");

  useEffect(() => {
    const station = sampleData.ev.find(
      (s) => s._id === id || s.id === id || s.name === id
    );

    if (station) {
      const stationPorts =
        station.connectors?.map((connector, idx) => ({
          id: idx + 1,
          portId: `PORT-${idx + 1}`,
          type: connector,
          enabled: station.status === "available",
          power: station.power,
        })) || [];
      setPorts(stationPorts);
    }
  }, [id]);

  const handlePortSelection = (port) => {
    if (port.enabled === true) {
      setSelectedPort(port);
      setModalVisible(true);
    } else if (port.status === false) {
      alert("This port is currently unavailable.");
    } else {
      alert("This port is currently booked/in use.");
    }
  };

  const toggleAvailablePorts = () => {
    setShowAvailablePorts(!showAvailablePorts);
  };

  const handleModalSubmit = async () => {
    if (!selectedVehicle || !startChargePercent || !selectedPort) {
      alert("Please fill in all details");
      return;
    }

    try {
      // Schedule notification
      await schedulePushNotification(
        "Booking Confirmed! 🔋",
        `Your charging slot at Port ${selectedPort.portId} has been booked. Estimated time: ${slotTimings}`
      );

      // Close modal and reset
      setModalVisible(false);
      setSelectedVehicle(null);
      setStartChargePercent("");
      setSlotTimings("");
      setSelectedPort(null);

      // Show success message
      Alert.alert(
        "Booking Successful! ✅",
        `Port: ${selectedPort.portId}\nVehicle: ${selectedVehicle.name}\nCharging Time: ${slotTimings}`,
        [
          {
            text: "OK",
            onPress: () => {
              // Optionally navigate back or to another screen
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error scheduling notification:", error);
      alert("Booking successful but notification failed");
    }
  };

  const getSlotTimings = (vehicle, port, startCharge) => {
    const batteryType = vehicle?.batteryType || "Lithium-Ion";
    const chargeRequired = 100 - startCharge;
    const powerKw = port?.power || 50;

    // Rough estimate: charging time = (battery capacity * charge required) / (power * efficiency)
    const batteryCapacity = vehicle?.batteryCapacity || 50;
    const chargingEfficiency = 0.9;

    const timeHours =
      (batteryCapacity * chargeRequired) / 100 / (powerKw * chargingEfficiency);
    const hours = Math.floor(timeHours);
    const minutes = Math.round((timeHours - hours) * 60);

    return `${hours}h ${minutes}m (${powerKw} kW charging)`;
  };

  const handleVehicleSelection = (vehicle) => {
    setSelectedVehicle(vehicle);
    if (selectedPort && startChargePercent !== "") {
      const timings = getSlotTimings(
        vehicle,
        selectedPort,
        parseInt(startChargePercent)
      );
      setSlotTimings(timings);
    }
  };

  const handleChargePercentageChange = (charge) => {
    setStartChargePercent(charge);
    if (selectedVehicle && selectedPort) {
      const timings = getSlotTimings(
        selectedVehicle,
        selectedPort,
        parseInt(charge)
      );
      setSlotTimings(timings);
    }
  };

  const theme = {
    colors: {
      primary: "rgb(0, 110, 11)",
      onPrimary: "rgb(255, 255, 255)",
      primaryContainer: "rgb(138, 252, 122)",
      onPrimaryContainer: "rgb(0, 34, 1)",
    },
  };

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
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: "white",
      borderRadius: 10,
    },
    input: {
      width: "100%",
      padding: 10,
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
      textAlign: "center",
    },
    picker: {
      width: "100%",
      height: 50,
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
    },
  });

  return (
    <PaperProvider theme={theme}>
      <AppBar title="Book Charging Slot" />
      <View style={styles.container}>
        <Text style={styles.title}>Ports in the Station</Text>
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>Show Available Ports</Text>
          <Switch
            value={showAvailablePorts}
            onValueChange={toggleAvailablePorts}
            color={theme.colors.primary}
          />
        </View>

        <ScrollView>
          {ports
            .filter((port) => (showAvailablePorts ? port.enabled : true))
            .map((port) => (
              <Pressable
                key={port.id}
                onPress={() => handlePortSelection(port)}
              >
                <Card style={styles.cardContainer}>
                  <Title>Port ID: {port.portId}</Title>
                  <Paragraph>Charger Type: {port.type}</Paragraph>
                  <Paragraph>Power: {port.power} kW</Paragraph>
                  <Paragraph>
                    Status: {port.enabled ? "✅ Available" : "❌ Unavailable"}
                  </Paragraph>
                </Card>
              </Pressable>
            ))}
        </ScrollView>

        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Booking Information</Text>
              <Text style={{ marginBottom: 5 }}>
                Port: {selectedPort?.portId}
              </Text>
              <Text
                style={{
                  marginBottom: 10,
                }}
              >
                Type: {selectedPort?.type} ({selectedPort?.power} kW)
              </Text>

              <Picker
                selectedValue={selectedVehicle}
                style={styles.picker}
                onValueChange={handleVehicleSelection}
              >
                <Picker.Item label="Select Vehicle" value={null} />
                {cars.map((car) => (
                  <Picker.Item key={car.id} label={car.name} value={car} />
                ))}
              </Picker>

              <TextInput
                style={styles.input}
                placeholder="Enter Current Charge (%)"
                value={startChargePercent}
                onChangeText={handleChargePercentageChange}
                keyboardType="numeric"
                maxLength={3}
              />

              {slotTimings && (
                <Text
                  style={{
                    marginBottom: 15,
                    fontWeight: "bold",
                    color: theme.colors.primary,
                  }}
                >
                  ⏱️ Charging Duration: {slotTimings}
                </Text>
              )}

              <Button
                mode="contained"
                onPress={handleModalSubmit}
                disabled={!selectedVehicle || !startChargePercent}
                style={{ marginBottom: 10 }}
              >
                Confirm Booking
              </Button>
              <Button mode="text" onPress={() => setModalVisible(false)}>
                Cancel
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </PaperProvider>
  );
}
