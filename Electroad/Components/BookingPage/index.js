import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, Modal, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Card, Title, Paragraph, useTheme } from "react-native-paper";

export default function BookingPage() {
  const theme = useTheme();
  const [bookingDetailsModalVisible, setBookingDetailsModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = () => {
    setRefreshing(true);
    // Simulating asynchronous data fetching
    setTimeout(() => {
      // Sample booking data (past and active)
      const pastBookings = [
        {
          id: 1,
          date: "2024-03-20",
          time: "10:00 AM",
          station: "Station A",
          details: {
            cost: "$50",
            duration: "2 hours",
            vehicle: "Tesla Model S",
          },
        },
        {
          id: 2,
          date: "2024-03-21",
          time: "2:00 PM",
          station: "Station B",
          details: {
            cost: "$40",
            duration: "1.5 hours",
            vehicle: "Nissan Leaf",
          },
        },
        {
          id: 3,
          date: "2024-03-22",
          time: "3:30 PM",
          station: "Station C",
          details: {
            cost: "$60",
            duration: "3 hours",
            vehicle: "Chevrolet Bolt",
          },
        },
        // Add more past bookings as needed
      ];
           
      const activeBookings = [
        {
          id: 4,
          date: "2024-03-25",
          time: "10:00 AM",
          station: "Station C",
          details: {
            cost: "Estimated Later",
            duration: "2 hours (estimated)",
            vehicle: "Toyota Prius",
          },
        },
        // Add more active bookings as needed
      ];

      setBookings([...pastBookings, ...activeBookings]);
      setRefreshing(false);
    }, 2000); // Simulating a delay of 2 seconds for data fetching
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.primary,
      paddingBottom: 10,
    },
    card: {
      marginBottom: 20,
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      elevation: 3,
      padding: 15,
      width: '100%',
    },
    cardText: {
      fontSize: 16,
      marginBottom: 5,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
      width: "80%",
    },
    modalText: {
      fontSize: 18,
      marginBottom: 10,
    },
    closeButton: {
      marginTop: 20,
      alignSelf: "center",
    },
    activityIndicator: {
      marginTop: 20,
    },
  });

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setBookingDetailsModalVisible(true);
  };

  const renderBookingCards = (bookings, title) => {
    return (
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        <ScrollView horizontal={true}>
          {bookings.map((booking) => (
            <TouchableOpacity key={booking.id} onPress={() => handleViewDetails(booking)}>
              <Card style={styles.card}>
                <Title style={styles.cardText}>{booking.date}</Title>
                <Paragraph style={styles.cardText}>{booking.time}</Paragraph>
                <Paragraph style={styles.cardText}>{booking.station}</Paragraph>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderBookingDetailsModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={bookingDetailsModalVisible}
        onRequestClose={() => setBookingDetailsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedBooking && (
              <View>
                <Title style={styles.modalText}>{selectedBooking.date}</Title>
                <Paragraph style={styles.modalText}>{selectedBooking.time}</Paragraph>
                <Paragraph style={styles.modalText}>{selectedBooking.station}</Paragraph>
                <Paragraph style={styles.modalText}>Cost: {selectedBooking.details.cost}</Paragraph>
                <Paragraph style={styles.modalText}>Duration: {selectedBooking.details.duration}</Paragraph>
                <Paragraph style={styles.modalText}>Vehicle: {selectedBooking.details.vehicle}</Paragraph>
                <Button mode="outlined" onPress={() => setBookingDetailsModalVisible(false)} style={styles.closeButton}>
                  Close
                </Button>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  const activeBookings = bookings.filter((booking) => booking.details.cost === "Estimated Later");
  const pastBookings = bookings.filter((booking) => booking.details.cost !== "Estimated Later");

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderBookingCards(activeBookings, "Active Bookings")}
        {renderBookingCards(pastBookings, "Past Bookings")}
        {renderBookingDetailsModal()}
      </ScrollView>
      <Button
        mode="contained"
        onPress={fetchBookingData}
        loading={refreshing}
        disabled={refreshing}
        style={{ margin: 20 }}
      >
        Refresh
      </Button>
    </View>
  );
}
