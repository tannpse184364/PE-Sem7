import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { PlayerProvider } from "./src/contexts/PlayerContext";
import StackNavigation from "./src/components/navigations/StackNavigation";
import { RefreshProvider } from "./src/contexts/RefreshContext";
import { LoadingProvider } from "./src/contexts/LoadingContext";

export default function App() {
  return (
    <LoadingProvider>
      <PlayerProvider>
        <RefreshProvider>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </RefreshProvider>
      </PlayerProvider>
    </LoadingProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
