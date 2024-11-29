import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Alert } from "react-native";
import { Button, Card, Menu, IconButton, TextInput, RadioButton } from "react-native-paper";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUserEV, changeUserEV } from "../api/api"; 


export default function ProfilePage() {
  const theme = useTheme();
  const [carList, setCarList] = useState([]);
  const [email, setEmail] = useState("name here");
  const [evMenuVisible, setEvMenuVisible] = useState(false);
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);


  const EVOptions = [
    { name: "Tesla Model S", batteryType: "Lithium-ion" },
    { name: "Nissan Leaf", batteryType: "Solid-state" },
    { name: "Chevrolet Bolt", batteryType: "Lithium-ion" },
    { name: "BMW i3", batteryType: "Lithium-ion" },
    { name: "Renault Zoe", batteryType: "Lithium-ion" }
  ];

  const paymentMethods = ["UPI", "Cards", "Net Banking"];

  useEffect(() => {
    const getStoredCredentials = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("email");
        if (storedEmail) setEmail(storedEmail);

        const evList = await fetchUserEV();
        if (evList?.data?.Vehicles) {
          setCarList(
            evList.data.Vehicles.map((vehicle, index) => ({
              id: index + 1,
              name: vehicle.name || "",
              batteryType: vehicle.batteryType || "",
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getStoredCredentials();
  }, []);

  const handleEVChange = (carId, evName) => {
    const selectedOption = EVOptions.find((ev) => ev.name === evName);
    setCarList((prevList) =>
      prevList.map((car) =>
        car.id === carId
          ? { ...car, name: selectedOption.name, batteryType: selectedOption.batteryType }
          : car
      )
    );
    setEvMenuVisible(false);
  };

  const handleAddCar = () => {
    if (carList.length < 5) {
      const newCarId = carList.length + 1;
      setCarList([...carList, { id: newCarId, name: "", batteryType: "" }]);
    }
  };

  const handleRemoveCar = (carId) => {
    if (carList.length > 1) {
      setCarList(carList.filter((car) => car.id !== carId));
    }
  };

  const handleSaveVehicles = async () => {
    try {
      const payload = carList.map(({ name, batteryType }) => ({
        name,
        batteryType,
      }));
      await changeUserEV(payload);
      Alert.alert("Success", "Vehicle details saved successfully!");
    } catch (error) {
      console.error("Error saving vehicles:", error);
      Alert.alert("Error", "Failed to save vehicle details.");
    }
  };

  const styles = {
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      padding: 20,
    },
    card: {
      marginBottom: 20,
      padding: 10,
    },
    menuContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    addRemoveButton: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <Card.Title title="User Profile Information" />
          <Card.Content>
            <Text>Email: {email}</Text>
          </Card.Content>
        </Card>

        {carList.map((car) => (
          <Card key={car.id} style={styles.card}>
            <Card.Content>
              <View style={styles.menuContainer}>
                <Menu
                  visible={evMenuVisible && selectedCarIndex === car.id}
                  onDismiss={() => setEvMenuVisible(false)}
                  anchor={
                    <Button
                      mode="outlined"
                      onPress={() => {
                        setSelectedCarIndex(car.id);
                        setEvMenuVisible(true);
                      }}
                    >
                      {car.name || "Select EV"}
                    </Button>
                  }
                >
                  {EVOptions.map((ev, index) => (
                    <Menu.Item
                      key={index}
                      onPress={() => handleEVChange(car.id, ev.name)}
                      title={ev.name}
                    />
                  ))}
                </Menu>
              </View>
              <Text>Selected EV: {car.name}</Text>
              <Text>Battery Type: {car.batteryType}</Text>
              <View style={styles.addRemoveButton}>
                {carList.length > 1 && (
                  <IconButton
                    icon="minus"
                    onPress={() => handleRemoveCar(car.id)}
                  />
                )}
                <IconButton
                  icon="plus"
                  onPress={handleAddCar}
                  disabled={carList.length === 5}
                />
              </View>
            </Card.Content>
          </Card>
        ))}

        <Button
          mode="contained"
          onPress={handleSaveVehicles}
        >
          Save Vehicles
        </Button>
      </ScrollView>
    </View>
  );
}
