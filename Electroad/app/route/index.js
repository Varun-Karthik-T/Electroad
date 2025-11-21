import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Route from "@/Components/Map/route";

export default function RoutePage() {
  const params = useLocalSearchParams();
  const { olatitude, olongitude, dlatitude, dlongitude, stationName } = params;

  return (
    <View style={styles.container}>
      {stationName && (
        <View style={styles.header}>
          <Text style={styles.headerText}>Route to: {stationName}</Text>
        </View>
      )}
      <Route
        olatitude={parseFloat(olatitude)}
        olongitude={parseFloat(olongitude)}
        dlatitude={parseFloat(dlatitude)}
        dlongitude={parseFloat(dlongitude)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#4CAF50",
    padding: 12,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
