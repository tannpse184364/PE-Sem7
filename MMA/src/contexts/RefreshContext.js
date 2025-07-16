import React, { createContext, useState, useContext } from "react";
import { PlayerContext } from "./PlayerContext";

export const RefreshContext = createContext(null);

export const RefreshProvider = ({ children }) => {
  const { fetchData } = useContext(PlayerContext);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchData();
    } catch (err) {
      console.error("Error in handleRefresh:", err);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <RefreshContext.Provider value={{ refreshing, handleRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};
