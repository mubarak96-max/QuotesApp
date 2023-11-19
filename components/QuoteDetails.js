import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Share
} from "react-native";
import React, { useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../utils/redux/slices/quotesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import InterstitialAdComponent from "../utils/ads/Interstitial";
import { Banner } from "../utils/ads/Banner";

const QuoteDetails = ({ route }) => {
  const data = route?.params;
  const { author, quote } = data?.item;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.quotes);

  const copyToClipboard = async (_quote, _author) => {
    await Clipboard.setStringAsync(`"${_quote}" - ${_author}`);
    ToastAndroid.show("Copied", ToastAndroid.SHORT);
  };

  const onShare = async (_quote, _author) => {
    try {
      const result = await Share.share({
        message: `"${_quote}" - ${_author}`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  async function addItem(item) {
    try {
      // Get the current array from AsyncStorage
      const currentArray = await AsyncStorage.getItem("myFavorites");

      let array = [];
      if (currentArray) {
        // Parse the string value into a JavaScript array
        array = JSON.parse(currentArray);
      }

      // Add the new item to the array

      array.push(item);

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem("myFavorites", JSON.stringify(array));
      dispatch(setFavorites(array));
    } catch (error) {
      console.error(error);
    }
  }

  async function getArray() {
    try {
      const arrayString = await AsyncStorage.getItem("myFavorites");
      if (arrayString) {
        dispatch(setFavorites(JSON.parse(arrayString)));
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
      const currentArray = await AsyncStorage.getItem("myFavorites");
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

      ToastAndroid.show(
        "Removed from favorites successfully!",
        ToastAndroid.SHORT
      );

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem("myFavorites", JSON.stringify(array));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getArray();
  }, []);

  async function addFavorite(array, item) {
    let exists = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === item.id) {
        exists = true;
        break;
      }
    }
    if (exists) {
      ToastAndroid.show("Already exists in favorites", ToastAndroid.SHORT);
    } else {
      addItem(item);

      ToastAndroid.show("Added to favorites successfully!", ToastAndroid.SHORT);
    }
  }

  return (
    <SafeAreaView style={tw`mt-8 `}>
      <View style={tw`flex-row justify-between mx-6`}>
        <TouchableOpacity
          style={tw`flex-row items-center ml-4`}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={30} color="black" />
          <Text>Back</Text>
        </TouchableOpacity>

        <View style={tw`flex-row`}>
          {favorites.some((item) => item?.id === data?.item?.id) ? (
            <TouchableOpacity
              onPress={() => {
                removeFromArray(data?.item);
                // getArray();
              }}
            >
              <AntDesign name="heart" size={26} color="green" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                addFavorite(favorites, data?.item);
                // getArray();
              }}
            >
              <AntDesign name="hearto" size={26} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={tw`mb-6`}>
        <View style={tw`bg-blue-100 py-3 px-3 mt-3 mx-4 rounded-md shadow-xl`}>
          <Text style={tw`text-green-900 text-xl`}>"{quote}"</Text>
        </View>

        <Text
          style={tw`ml-4 mt-5 text-blue-900 text-base font-semibold capitalize underline`}
        >
          {author}
        </Text>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={tw`flex-row ml-3 mt-4 items-center bg-gray-700 w-20 justify-center py-1 rounded-md shadow-xl`}
            onPress={() => copyToClipboard(quote, author)}
            activeOpacity={0.8}
          >
            <Text style={tw`text-white text-base font-semibold px-2`}>
              Copy
            </Text>
            <Ionicons name="copy" size={18} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row ml-3 mt-4 items-center bg-blue-700 w-20 justify-center py-1 rounded-md shadow-xl`}
            onPress={() => onShare(quote, author)}
            activeOpacity={0.8}
          >
            <Text style={tw`text-white text-base font-semibold px-2`}>
              Share
            </Text>
            <Entypo name="share" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* <Banner /> */}
      </ScrollView>
      {/* <InterstitialAdComponent /> */}
    </SafeAreaView>
  );
};

export default QuoteDetails;
