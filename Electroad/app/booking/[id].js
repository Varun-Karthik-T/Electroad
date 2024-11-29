import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TextInput,
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
import { getStationById, fetchUserEV } from "@/Components/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SlotBookingPage({ navigation }) {
  const [ports, setPorts] = useState([]);
  const [cars, setCars] = useState([]);
  const [showAvailablePorts, setShowAvailablePorts] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [remainingPercent, setRemainingPercent] = useState("");
  const [selectedPort, setSelectedPort] = useState();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [slotTimings, setSlotTimings] = useState("");
  const [startChargePercent, setStartChargePercent] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("stationID").then(async (stationId) => {
      const resp = await getStationById(stationId);
      setPorts(resp.data.ports);
      const c = await fetchUserEV();
      setCars(c.data.Vehicles);
    });
  }, []);

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

  const handleModalSubmit = () => {
    setModalVisible(false);
    schedulePushNotification(
      "Booking successful!",
      "You have successfully booked the port."
    );
    setRemainingPercent("");
    setSelectedVehicle(null);
    setStartChargePercent("");
    setSlotTimings("");
    alert("Booking successful!");
  };

  const getSlotTimings = (vehicle, chargerType, startCharge) => {
    const batteryType = vehicle?.batteryType || "unknown";
    const chargeRequired = 100 - startCharge;

    let duration = "No duration available";

    if (batteryType === "Lithium-Ion" && chargerType === "Fast") {
      duration = `${Math.ceil((chargeRequired / 100) * 1)} hour (Fast Charging)`;
    } else if (batteryType === "Lithium-Ion" && chargerType === "Slow") {
      duration = `${Math.ceil((chargeRequired / 100) * 2)} hours (Slow Charging)`;
    } else if (chargerType === "Fast") {
      duration = `${Math.ceil((chargeRequired / 100) * 1.5)} hours (Fast Charging)`;
    } else if (chargerType === "Slow") {
      duration = `${Math.ceil((chargeRequired / 100) * 3)} hours (Slow Charging)`;
    }

    return duration;
  };

  const handleVehicleSelection = (vehicle) => {
    setSelectedVehicle(vehicle);
    if (selectedPort && startChargePercent !== "") {
      const timings = getSlotTimings(vehicle, selectedPort.type, parseInt(startChargePercent));
      setSlotTimings(timings);
    }
  };

  const handleChargePercentageChange = (charge) => {
    setStartChargePercent(charge);
    if (selectedVehicle && selectedPort) {
      const timings = getSlotTimings(
        selectedVehicle,
        selectedPort.type,
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
              <Pressable key={port.id} onPress={() => handlePortSelection(port)}>
                <Card style={styles.cardContainer}>
                  <Title>Port ID: {port.portId}</Title>
                  <Paragraph>Charger Type: {port.type}</Paragraph>
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
              <Picker
                selectedValue={selectedVehicle}
                style={styles.picker}
                onValueChange={handleVehicleSelection}
              >
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
              />
              <Text>Charging Duration: {slotTimings}</Text>
              <Button mode="contained" onPress={handleModalSubmit}>
                Confirm Booking
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </PaperProvider>
  );
}
