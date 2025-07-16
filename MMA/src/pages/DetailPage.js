import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Detail } from "../components/player/Detail";

export default function DetailPage({ route }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Detail item={item} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3e3e3",
    alignItems: "center",
    justifyContent: "center",
  },
});
