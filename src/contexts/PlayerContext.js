import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useContext,
} from "react";
import {
  createPlayer,
  updatePlayer,
  deletePlayer,
  fetchPlayerById,
  fetchPlayers,
} from "../api/mockApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoadingContext } from "./LoadingContext";
export const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, setLoading } = useContext(LoadingContext);

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesTeam =
        selectedCategory === "All" || player.team === selectedCategory;
      const matchesSearch = player.playerName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesTeam && matchesSearch;
    });
  }, [players, selectedCategory, searchQuery]);

  const getFavorites = async () => {
    try {
      const data = await AsyncStorage.getItem("favorites");
      setFavorites(data ? JSON.parse(data) : {});
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const markFavorite = async (playerId, favorites, setFavorites) => {
    try {
      if (favorites[playerId]) {
        delete favorites[playerId];
        console.log("Remove favorite", playerId);
      } else {
        favorites[playerId] = true;
        console.log("Add favorite", playerId);
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
      setFavorites({ ...favorites });
      console.log("Favorites saved");
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  const getPlayers = async () => {
    try {
      const fetchedPlayers = await fetchPlayers();
      setPlayers(fetchedPlayers);
      return fetchedPlayers;
    } catch (error) {
      console.error("Failed to fetch players:", error);
    }
  };
  const getPlayerById = (id) => {
    const player = players.find((player) => player.id === id);
    return player || null;
  };

  const handleCreatePlayer = async (player) => {
    try {
      const newPlayer = await createPlayer(player);

      const newPlayers = [...players, newPlayer];
      setPlayers(newPlayers);
    } catch (error) {
      console.error("Failed to create new player:", error);
    }
  };

  const handleUpdatePlayer = async (id, updatedData) => {
    try {
      await updatePlayer(id, updatedData);

      const updatedPlayer = players.map((player) =>
        player.id === id ? { ...player, ...updatedData } : player
      );
      setPlayers(updatedPlayer);
    } catch (error) {
      console.error("Failed to update player:", error);
    }
  };

  const handleDeletePlayer = async (id) => {
    try {
      console.log(id);
      await deletePlayer(id);
      const updatedPlayers = players.filter((player) => player.id !== id);
      setPlayers(updatedPlayers);
    } catch (error) {
      console.error("Failed to delete player:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchedPlayers = await getPlayers();
      const teamsList = [
        ...new Set(fetchedPlayers.map((player) => player.team)),
      ];
      setTeams(teamsList);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFavorites();
    fetchData();
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        players,
        favorites,
        teams,
        selectedCategory,
        searchQuery,
        filteredPlayers,
        setSearchQuery,
        setSelectedCategory,
        setFavorites,
        setTeams,
        setPlayers,
        handleCreatePlayer,
        handleUpdatePlayer,
        handleDeletePlayer,
        markFavorite,
        getPlayerById,
        getPlayers,
        fetchData,
        loading,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
