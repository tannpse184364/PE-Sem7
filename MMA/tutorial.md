# Run command line

npx create-expo-app --template blank

npx expo install react-native-dotenv react-native-screens react-native-safe-area-context

npm install @react-native-async-storage/async-storage @react-navigation/bottom-tabs @react-navigation/native-stack @react-navigation/native

# Mock API

Nhớ đổi tên biến, theo format.

```bash
EXPO_PUBLIC_[NAME]=VALUE
```

[Go to file](./src/api/mockApi.js)

**_ Nhớ (ctr + shift + f) & (Alt + C)-> replace Player/player + Team/team _**

# Component

## Filter by category/brand

[Go to file](./src/pages/HomePage.js#L19)

sử dụng navbar bằng component:

```bash
 <Navbar
        categories={teams}  # list categories/ brand
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
```

## Bottom tabs

[Go to file](./src/components/navigations/BottomTab.js#L42)

## Stack Navigation

[Go to file](./src/components/navigations/StackNavigation.js)

```bash
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import DetailPage from "../../pages/DetailPage";

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Back"
        component={BottomTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailPage}
        options={{
          headerTintColor: "black",
          headerTitle: "Detail Screen",
          headerStyle: {
            backgroundColor: "#00a8a8",
          },
        }}
      />
    </Stack.Navigator>
  );
}
```

## Favourite

**_ getFavorites _**
[Go to file](./src/contexts/PlayerContext.js#L38)

**_ markFavorite _**
[Go to file](./src/contexts/PlayerContext.js#L47)

## Confirm Modal

[Go to file](./src/components/modals/ConfirmModal.js)

Use at: **_ Nhớ coi handleFavoriteToggle() & confirmRemoveFavorite(). Mỗi component 2 function này khác nhau nha!! _**
[Go to file](./src/components/player/PlayerList.js#L124)
[Go to file](./src/components/player/FavoriteList.js#L122)
[Go to file](./src/components/player/Detail.js#L83)
