import { View, Text, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import React from "react";
import Navbar from "../components/filterNavbar/Navbar";
import PlayerList from "../components/player/PlayerList";
import { PlayerContext } from "../contexts/PlayerContext";
import Loading from "../components/common/Loading";
import { LoadingContext } from "../contexts/LoadingContext";

export default function HomePage() {
  const { teams, selectedCategory, setSelectedCategory } =
    useContext(PlayerContext);
  const { loading } = useContext(LoadingContext);
  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <Navbar
        categories={teams}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <PlayerList />
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
