import { View, Text, Image } from "react-native";
import React from "react";

export default function Empty() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>
        Empty
      </Text>
    </View>
  );
}
