import { StyleSheet, View, ActivityIndicator } from "react-native";
import React from "react";

export default function Loading({ size = "large" }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color="#64b9f5" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
