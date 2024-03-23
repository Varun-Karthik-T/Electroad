import React, { useState } from "react";
import { Text, View, Modal, ScrollView } from "react-native";
import { Button, Card, TextInput, List, Menu } from "react-native-paper";
import { useTheme } from "react-native-paper";

export default function ProfilePage() {
  const theme = useTheme();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedEV, setSelectedEV] = useState("");
  const [carName, setCarName] = useState("");
  const [batteryType, setBatteryType] = useState("");
  const [userInformation, setUserInformation] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const EVOptions = [
    { name: "Tesla Model S", batteryType: "Lithium-ion" },
    { name: "Nissan Leaf", batteryType: "Lithium-ion" },
    // Add more EV options as needed
  ];

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
      justifyContent: "flex-end",
    },
  };

  const handleEditModal = () => {
    setEditModalVisible(!editModalVisible);
  };

  const handleSaveChanges = () => {
    setEditModalVisible(false); // Close the modal after saving changes
    // Perform actions to save changes here
  };

  const handleEVChange = (value) => {
    setSelectedEV(value);
    setIsMenuVisible(false); // Close the dropdown menu when an option is selected
    const selectedOption = EVOptions.find((ev) => ev.name === value);
    if (selectedOption) {
      setCarName(selectedOption.name);
      setBatteryType(selectedOption.batteryType);
    }
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
            <Text style={styles.text}>Name: {userInformation.name}</Text>
            <Text style={styles.text}>Email: {userInformation.email}</Text>
            <Button
              mode="outlined"
              onPress={handleEditModal}
              style={{ marginTop: 10 }}
            >
              Edit
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Car Information" />
          <Card.Content>
            <View style={styles.menuContainer}>
              <Menu
                visible={isMenuVisible}
                onDismiss={() => setIsMenuVisible(false)}
                anchor={
                  <Button mode="outlined" onPress={() => setIsMenuVisible(true)}>
                    {selectedEV || "Select EV"}
                  </Button>
                }
              >
                {EVOptions.map((ev, index) => (
                  <Menu.Item
                    key={index}
                    onPress={() => handleEVChange(ev.name)}
                    title={ev.name}
                  />
                ))}
              </Menu>
            </View>
            <Text style={styles.text}>Selected EV: {carName}</Text>
            <Text style={styles.text}>Battery Type: {batteryType}</Text>
          </Card.Content>
        </Card>

        {renderCollapsibleSection("Account Settings", (
          <View>
            {/* Add options for managing account settings */}
            <Text style={styles.text}>Account Settings</Text>
          </View>
        ))}

        {renderCollapsibleSection("Payment Methods", (
          <View>
            {/* Add options for managing saved payment methods */}
            <Text style={styles.text}>Payment Methods</Text>
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
