// LoadingIndicator.js
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { MD2Colors } from "react-native-paper";

const LoadingIndicator = ({ isLoading }) => {
  return (
    isLoading && (
      <View style={styles.container}>
        <ActivityIndicator size="large" animating={true} color={MD2Colors.red800} />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
});

export default LoadingIndicator;
