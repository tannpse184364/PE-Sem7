import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { PlayerContext } from "../../contexts/PlayerContext";
import ConfirmModal from "../modals/ConfirmModal";

export const Detail = ({ item }) => {
  const { favorites, setFavorites, markFavorite } = useContext(PlayerContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleFavoriteToggle = () => {
    if (favorites[item.id]) {
      setModalVisible(true);
    } else {
      markFavorite(item.id, favorites, setFavorites);
    }
  };

  const confirmRemoveFavorite = () => {
    markFavorite(item.id, favorites, setFavorites);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <View style={styles.detailHeader}>
            <Text style={styles.name}>{item.playerName}</Text>
            <Text style={styles.position}>{item.position}</Text>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={handleFavoriteToggle}
            >
              {favorites[item.id] ? (
                <MaterialIcons name="favorite" size={24} color="red" />
              ) : (
                <MaterialIcons name="favorite-border" size={24} color="red" />
              )}
            </TouchableOpacity>
          </View>
          <Text style={{ color: "#666" }}>{item.team}</Text>

          <View style={styles.tableDetail}>
            <View style={styles.detail}>
              <Text style={styles.detailTitile}>Age</Text>
              <Text style={styles.detailValue}>
                {new Date().getFullYear() - parseInt(item.YoB)}
              </Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.detailTitile}>Played</Text>
              <Text style={styles.detailValue}>
                {(item.MinutesPlayed / 60).toFixed(1)} hrs
              </Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.detailTitile}>Precision</Text>
              <Text style={styles.detailValue}>
                {item.PassingAccuracy * 100}%
              </Text>
            </View>
            <View style={[styles.detail, { borderRightWidth: 0 }]}>
              <Text style={styles.detailTitile}>Captain </Text>
              {item.isCaptain ? (
                <Ionicons name="checkmark-circle" size={20} color="green" />
              ) : (
                <Ionicons name="close-circle" size={20} color="red" />
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <ConfirmModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={confirmRemoveFavorite}
        playerName={item.playerName}
        type="remove"
        confirmText="Remove"
        cancelText="Cancel"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  favoriteButton: {
    position: "absolute",
    right: 0,
    padding: 4,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  info: {
    padding: 16,
  },
  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    width: 200,
  },
  position: {
    backgroundColor: "#f5d5d5",
    fontSize: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "red",
    fontWeight: "bold",
    color: "red",
    paddingHorizontal: 2,
    marginHorizontal: 8,
  },
  tableDetail: {
    marginTop: 16,
    paddingVertical: 10,
    backgroundColor: "#5c5b5b",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detail: {
    width: "25%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#666",
  },
  detailTitile: {
    color: "white",
    fontWeight: "bold",
    paddingBottom: 4,
  },
  detailValue: {
    color: "white",
  },
});
