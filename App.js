import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import AboutScreen from './screens/AboutScreen';
import BottomNav from './components/BottomNav';
import Qoutes from './components/Qoutes';
import { store } from './utils/redux/store';
import QuoteDetails from './components/QuoteDetails';
import MoreScreen from './screens/MoreScreen';
import ContactScreen from './screens/ContactScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name='FavoritesScreen' component={FavoritesScreen} />
          <Stack.Screen name='About' component={AboutScreen} />
          <Stack.Screen name='Contact' component={ContactScreen} />
          <Stack.Screen name='Quotes' component={Qoutes} />
          <Stack.Screen
            name='QuoteDetails'
            component={QuoteDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='More'
            component={MoreScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <BottomNav />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
