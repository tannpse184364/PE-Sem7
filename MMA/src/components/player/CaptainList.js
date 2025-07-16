import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { RefreshContext } from "../../contexts/RefreshContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Empty from "../common/Empty";
import ConfirmModal from "../modals/ConfirmModal";

export default function CaptainList() {
  const { filteredPlayers, favorites, setFavorites, markFavorite } =
    useContext(PlayerContext);
  const { refreshing, handleRefresh } = useContext(RefreshContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleFavoriteToggle = (player) => {
    if (favorites[player.id]) {
      setSelectedPlayer(player);
      setModalVisible(true);
    } else {
      markFavorite(player.id, favorites, setFavorites);
    }
  };

  const confirmRemoveFavorite = () => {
    if (selectedPlayer) {
      markFavorite(selectedPlayer.id, favorites, setFavorites);
      setSelectedPlayer(null);
    }
  };

  const filteredPlayersByBoolean = filteredPlayers
    .filter((player) => player.isCaptain)
    .sort((a, b) => a.MinutesPlayed - b.MinutesPlayed);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed && "#d4d5d6",
              },
            ]}
            onPress={() => navigation.navigate("Detail", { item: item })}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.cardImage}
              resizeMode="cover"
            />
          </Pressable>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => {
              handleFavoriteToggle(item);
            }}
          >
            {favorites[item.id] ? (
              <MaterialIcons name="favorite" size={24} color="red" />
            ) : (
              <MaterialIcons name="favorite-border" size={24} color="red" />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.cardInfo}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed && "#d4d5d6",
              },
            ]}
            onPress={() => navigation.navigate("Detail", { item: item })}
          >
            <Text style={styles.cardName} numberOfLines={2}>
              {item.playerName} - {item.team}
            </Text>
          </Pressable>
          <Text style={styles.information} numberOfLines={2}>
            Age: {new Date().getFullYear() - parseInt(item.YoB)}
          </Text>
          <Text style={styles.information} numberOfLines={2}>
            Minutes Played: {(item.MinutesPlayed / 60).toFixed(1)} hours
          </Text>
          <Text style={styles.information} numberOfLines={2}>
            Position: {item.position}
          </Text>
          <Text style={styles.information} numberOfLines={2}>
            Passing Accuracy: {item.PassingAccuracy * 100}%
          </Text>
          <View style={styles.informationWithIcon}>
            <Text style={styles.information} numberOfLines={2}>
              isCaptain:{" "}
            </Text>
            {item.isCaptain ? (
              <Ionicons name="checkmark-circle" size={16} color="green" />
            ) : (
              <Ionicons name="close-circle" size={16} color="red" />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {filteredPlayersByBoolean.length > 0 ? (
        <FlatList
          data={filteredPlayersByBoolean}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      ) : (
        <Empty />
      )}

      <ConfirmModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedPlayer(null);
        }}
        onConfirm={confirmRemoveFavorite}
        playerName={selectedPlayer?.playerName}
        type="remove"
        confirmText="Remove"
        cancelText="Cancel"
      />
    </View>
  );
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 40) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 4,
    overflow: "hidden",
    elevation: 2,
  },
  imageContainer: {
    padding: 10,
    width: "100%",
    height: 250,
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  favoriteButton: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    padding: 4,
  },
  cardInfo: {
    padding: 12,
  },
  cardName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  information: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  informationWithIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
