const MOCKAPI_URL = process.env.EXPO_PUBLIC_MOCKAPI_URL;

export const fetchPlayers = async () => {
  try {
    const res = await fetch(MOCKAPI_URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching players", error);
    throw error;
  }
};

export const createPlayer = async (PlayerData) => {
  try {
    const res = await fetch(MOCKAPI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(PlayerData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating player", error);
    throw error;
  }
};
export const fetchPlayerById = async (id) => {
  try {
    const res = await fetch(`${MOCKAPI_URL}/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching player with id ${id}`, error);
    throw error;
  }
};

export const updatePlayer = async (id, PlayerData) => {
  try {
    const res = await fetch(`${MOCKAPI_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(PlayerData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error updating player with id ${id}`, error);
    throw error;
  }
};

export const deletePlayer = async (id) => {
  try {
    await fetch(`${MOCKAPI_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(`Error deleting player with id ${id}`, error);
    throw error;
  }
};
