import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { DatePicker } from "react-native-paper";

export default function SlotBookingDetails() {
  const theme = useTheme();
  const [startTime, setStartTime] = useState(new Date());
  const [estimatedChargingTime, setEstimatedChargingTime] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handleStartTimeChange = (time) => {
    const remainingHours = 2; 
    setEstimatedChargingTime(`${remainingHours} hours`);
    setEstimatedCost("$10");
    setStartTime(time);
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleConfirmBooking = () => {

    alert("Booking confirmed! Payment method: " + selectedPaymentMethod);

    router.navigate("/");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    textInput: {
      marginBottom: 20,
    },
    button: {
      marginTop: 20,
    },
  });

  return (
    <View style={styles.container}>
      <DatePicker
        label="Select Start Time"
        value={startTime}
        mode="time"
        onDateChange={handleStartTimeChange}
        style={styles.textInput}
      />
      <Text>Estimated Charging Time: {estimatedChargingTime}</Text>
      <Text>Estimated Cost: {estimatedCost}</Text>
      <Text>Select Payment Method:</Text>
      <Button
        mode="outlined"
        onPress={() => handlePaymentMethodChange("Credit Card")}
        style={styles.button}
      >
        Credit Card
      </Button>
      <Button
        mode="outlined"
        onPress={() => handlePaymentMethodChange("Debit Card")}
        style={styles.button}
      >
        Debit Card
      </Button>
      <Button
        mode="outlined"
        onPress={() => handlePaymentMethodChange("UPI")}
        style={styles.button}
      >
        UPI
      </Button>
      <Button
        mode="contained"
        onPress={handleConfirmBooking}
        disabled={!selectedPaymentMethod}
        style={styles.button}
      >
        Confirm Booking
      </Button>
    </View>
  );
}
