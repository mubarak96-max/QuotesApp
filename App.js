import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import AboutScreen from "./screens/AboutScreen";
import BottomNav from "./components/BottomNav";
import { store } from "./utils/redux/store";
import QuoteDetails from "./components/QuoteDetails";
import MoreScreen from "./screens/MoreScreen";
import ContactScreen from "./screens/ContactScreen";
import { LinearGradient } from "expo-linear-gradient";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <LinearGradient
        style={{ flex: 1 }}
        colors={["#C9FFBF", "#FFAFBD"]}
        start={[0, 0]}
        end={[1, 2]}
      >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="Contact" component={ContactScreen} />
            <Stack.Screen
              name="QuoteDetails"
              component={QuoteDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="More"
              component={MoreScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>

          <BottomNav />
        </NavigationContainer>
      </LinearGradient>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
