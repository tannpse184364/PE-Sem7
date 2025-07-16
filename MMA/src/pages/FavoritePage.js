import { StyleSheet, View } from "react-native";
import FavoriteList from "../components/player/FavoriteList";

export default function FavoritePage() {
  return (
    <View style={styles.container}>
      <FavoriteList />
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
