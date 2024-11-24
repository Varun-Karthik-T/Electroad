import React, { useState } from "react";
import { Text, View, Modal, ScrollView } from "react-native";
import { Button, Card, TextInput, List, Menu, RadioButton, IconButton, Avatar } from "react-native-paper";
import { useTheme } from "react-native-paper";

export default function ProfilePage() {
  const theme = useTheme();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedEV, setSelectedEV] = useState(null);
  const [carList, setCarList] = useState([{ id: 1, name: "", batteryType: "" }]);
  const [evMenuVisible, setEvMenuVisible] = useState(false);
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const [carInfoTitle, setCarInfoTitle] = useState("Car Information");
  const [batteryType, setBatteryType] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({}); // Object to store card details
  const [upiDetails, setUpiDetails] = useState("");
  const [userInformation, setUserInformation] = useState({
    name: "Test User",
    email: "test@example.com",
  });
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const EVOptions = [
    { name: "Tesla Model S", batteryType: "Lithium-ion" },
    { name: "Nissan Leaf", batteryType: "Lithium-ion" },

  ];
  const paymentMethods = ["UPI", "Cards", "Net Banking"];

  const styles = {
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      padding: 20,
      paddingBottom: 20, // Adjusted padding bottom
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme.colors.primary,
    },
    listItem: {
      backgroundColor: theme.colors.surface,
      marginBottom: 10,
    },
    text: {
      color: theme.colors.text,
      fontFamily: "monospace",
    },
    card: {
      marginBottom: 20,
      padding: 10,
      paddingBottom: 20,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      width: "80%",
    },
    input: {
      marginBottom: 10,
    },
    logoutButton: {
      marginBottom: 20, // Moved from styles to direct prop
    },
    menuContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    avatar: {
      marginBottom: 0,
      alignSelf: 'flex-end',
    },
  };

  const handleEditModal = () => {
    setEditModalVisible(!editModalVisible);
  };

  const handleSaveChanges = () => {
    setEditModalVisible(false); // Close the modal after saving changes
    // Perform actions to save changes here
  };

  const handleEVChange = (carIndex, evName) => {
    const updatedCarList = carList.map((car) => {
      if (car.id === carIndex) {
        const selectedOption = EVOptions.find((ev) => ev.name === evName);
        return { ...car, name: selectedOption.name, batteryType: selectedOption.batteryType };
      }
      return car;
    });
    setCarList(updatedCarList);
    setEvMenuVisible(false);
    setSelectedEV(true);
  };

  const handleAddCar = () => {
    if (carList.length < 5) {
      const newCarId = carList.length + 1;
      setCarList([...carList, { id: newCarId, name: "", batteryType: "" }]);
    }
    setSelectedEV(false);
  };

  const handleRemoveCar = (carId) => {
    if (carList.length > 1) {
      const updatedCarList = carList.filter((car) => car.id !== carId);
      setCarList(updatedCarList);
    }
  };

  const handlePaymentMethodChange = (value) => {
    setSelectedPaymentMethod(value);
    // Reset card details and UPI details when changing payment method
    setCardDetails({});
    setUpiDetails("");
  };

  const renderEditModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              label="Name"
              value={userInformation.name}
              onChangeText={(text) => setUserInformation({ ...userInformation, name: text })}
              style={styles.input}
            />
            <TextInput
              label="Email"
              value={userInformation.email}
              onChangeText={(text) => setUserInformation({ ...userInformation, email: text })}
              style={styles.input}
            />
            <Button mode="contained" onPress={handleSaveChanges}>
              Save
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  const renderCollapsibleSection = (title, content) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <View style={{ marginBottom: 20 }}>
        <List.Accordion
          title={title}
          expanded={expanded}
          onPress={() => setExpanded(!expanded)}
        >
          {content}
        </List.Accordion>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <Card.Title title="User Profile Information" />
          <Card.Content>
            <View style={{ flexDirection: "row", gap:40 }}>
              <View>
                <Text style={styles.text}>Name: {userInformation.name}</Text>
                <Text style={styles.text}>Email: {userInformation.email}</Text>
                </View>
              <View style={styles.avatar}>
                <Avatar.Image source={userInformation.avatar} size={70} />
              </View>
            </View>
            <Button
              mode="outlined"
              onPress={handleEditModal}
              style={{ marginTop: 20, paddingBottom: 0 }}
            >
              Edit
            </Button>
          </Card.Content>
        </Card>

        {carList.map((car, index) => (
          <Card key={car.id} style={styles.card}>
            <Text style={styles.cardTitle}>{index === 0 ? carInfoTitle : `Car ${index + 1}`}</Text>
            <Card.Content>
              <View style={styles.menuContainer, {paddingBottom: 30, top: 10}}>
                <Menu
                  visible={evMenuVisible && selectedCarIndex === car.id}
                  onDismiss={() => setEvMenuVisible(false)}
                  anchor={
                    <Button mode="outlined" onPress={() => {
                      setSelectedCarIndex(car.id);
                      setEvMenuVisible(true);
                    }}>
                      {car.name || "Select EV"}
                    </Button>
                  } style = {{width: "75%"}}
                >
                  {EVOptions.map((ev, evIndex) => (
                    <Menu.Item
                      key={evIndex}
                      onPress={() => handleEVChange(car.id, ev.name)}
                      title={ev.name}
                    />
                  ))}
                </Menu>
              </View>
              {/* {selectedEV && (
              <View style={{ alignItems: 'center', marginBottom: 10 }}>
                <Avatar.Image source={selectedEV.avatar} size={50} />
              </View>
            )}  */}
              <Text>Selected EV: {car.name}</Text>
              <Text>Battery Type: {car.batteryType}</Text>
            </Card.Content>
            <View style={styles.addRemoveButton,{paddingBottom: 40}}>
              {carList.length > 1 && (
                <IconButton
                  icon="minus"
                  onPress={() => handleRemoveCar(car.id)}
                  style={{ position: 'absolute', bottom: 10, top: 2, left: 10 }}
                />
              )}
              <IconButton
                icon="plus"
                onPress={handleAddCar}
                disabled={carList.length === 5}
                style={{ position: 'absolute', bottom: 10, top: 2, right: 10 }}
              />
            </View>


          </Card>
        ))}


        {renderCollapsibleSection("Payment Methods", (
          <View>
            <RadioButton.Group
              onValueChange={(value) => handlePaymentMethodChange(value)}
              value={selectedPaymentMethod}
            >
              {paymentMethods.map((method, index) => (
                <View key={index} style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value={method} />
                  <Text style={{ marginLeft: 8 }}>{method}</Text>
                </View>
              ))}
            </RadioButton.Group>
            {/* Render additional components based on selected payment method */}
            {selectedPaymentMethod === "Cards" && (
              <TextInput
                label="Card Details"
                value={cardDetails}
                onChangeText={(text) => setCardDetails(text)}
                style={styles.input}
              />
            )}
            {selectedPaymentMethod === "UPI" && (
              <TextInput
                label="UPI ID"
                value={upiDetails}
                onChangeText={(text) => setUpiDetails(text)}
                style={styles.input}
              />
            )}
          </View>
        ))}

        {/* Add other sections and components */}

        <Button
          mode="contained"
          style={styles.logoutButton}
          onPress={() => alert("Logout")}
        >
          Logout
        </Button>

      </ScrollView>
      {renderEditModal()}
    </View>
  );
}
