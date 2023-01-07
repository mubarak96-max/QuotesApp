import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import React, { useEffect } from 'react';
import tw from 'tailwind-react-native-classnames';
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavorite,
  removeFavorite,
  setFavorites
} from '../utils/redux/slices/quotesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuoteDetails = ({ route }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const data = route?.params;
  const { author, category, commentary, quote } = data?.item;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.quotes);

  async function addItem(item) {
    try {
      // Get the current array from AsyncStorage
      const currentArray = await AsyncStorage.getItem('myFavorites');
      let array = [];
      if (currentArray) {
        // Parse the string value into a JavaScript array
        array = JSON.parse(currentArray);
      }

      // Add the new item to the array
      array.push(item);

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem('myFavorites', JSON.stringify(array));
    } catch (error) {
      console.error(error);
    }
  }

  async function getArray() {
    try {
      const arrayString = await AsyncStorage.getItem('myFavorites');
      if (arrayString) {
        dispatch(setFavorites(JSON.parse(arrayString)));
        // return console.log(JSON.parse(arrayString));
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function removeFromArray(item) {
    try {
      // Get the current array from AsyncStorage
      const currentArray = await AsyncStorage.getItem('myFavorites');
      let array = [];
      if (currentArray) {
        // Parse the string value into a JavaScript array
        array = JSON.parse(currentArray);
      }

      // Find the index of the item to remove
      const index = array.indexOf(item);

      // Remove the item from the array
      array.splice(index, 1);
      dispatch(setFavorites(array));

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem('myFavorites', JSON.stringify(array));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getArray();
  }, []);

  return (
    <SafeAreaView style={tw`mt-8 `}>
      <View style={tw`flex-row justify-between mx-6`}>
        <TouchableOpacity
          style={tw`flex-row items-center ml-4`}
          onPress={() => navigation.goBack()}
        >
          <Entypo name='chevron-left' size={30} color='black' />
          <Text>Back</Text>
        </TouchableOpacity>

        <View style={tw`flex-row`}>
          <TouchableOpacity
            style={tw`flex-row items-center ml-4`}
            onPress={async () => {
              if (!favorites.includes(data.item)) {
                await addItem(data?.item);
                ToastAndroid.show(
                  'Add to favorites successfully!',
                  ToastAndroid.SHORT
                );
                getArray();
              } else {
                ToastAndroid.show(
                  'Already exists in favorite',
                  ToastAndroid.SHORT
                );
              }
            }}
          >
            <MaterialIcons name='library-add' size={26} color='black' />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row items-center ml-4`}
            onPress={async () => {
              await removeFromArray(data?.item);
              getArray();
              ToastAndroid.show('Removed from favorites', ToastAndroid.SHORT);
            }}
          >
            <MaterialCommunityIcons
              name='book-remove-multiple'
              size={26}
              color='black'
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View style={tw`bg-blue-100 py-3 px-3 mt-3 mx-4 rounded-md shadow-xl`}>
          <Text style={tw`text-green-900 text-lg`}>{quote}</Text>
        </View>
        <Text style={tw`text-gray-400 ml-4 mt-2 capitalize`}>#{category}</Text>
        <Text
          style={tw`ml-4 mt-5 text-blue-900 text-base font-semibold capitalize underline`}
        >
          {author}
        </Text>
        <Text style={tw`mx-4 my-5 text-pink-900 text-base`}>{commentary}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuoteDetails;
