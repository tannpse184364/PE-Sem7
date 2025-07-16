import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

const Navbar = ({ categories, selectedCategory, setSelectedCategory }) => {
  const allCategories = ["All", ...(categories || [])];
  return (
    <View style={styles.navbar}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.navListContainer}
        data={allCategories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.navItem,
              selectedCategory === item && styles.selectedNavItem,
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text
              style={[
                styles.navText,
                selectedCategory === item && styles.selectedNavText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "white",
    height: 60,
  },
  navListContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  navText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
  },
  selectedNavItem: {
    fontSize: "bold",
    borderBottomColor: "#00a8a8",
    borderBottomWidth: 2,
  },
  selectedNavText: {
    color: "#black",
    fontWeight: "600",
  },
});

export default Navbar;
