import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import React, { useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../utils/redux/slices/quotesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  InterstitialAd,
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  BannerAd,
  BannerAdSize
} from "react-native-google-mobile-ads";
import { useState } from "react";

const interstitial = InterstitialAd.createForAdRequest(
  "ca-app-pub-8237514940582521/9356958145",
  {
    requestNonPersonalizedAdsOnly: true
  }
);

const rewarded = RewardedAd.createForAdRequest(
  "ca-app-pub-8237514940582521/2408406414",
  {
    requestNonPersonalizedAdsOnly: true
  }
);

const QuoteDetails = ({ route }) => {
  const data = route?.params;
  const { author, category, commentary, quote } = data?.item;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.quotes);

  //reward ads

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of ", reward);
      }
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  //interstitial ads

  const [adLoaded, setAdLoaded] = useState(false);

  const loadInterstitial = () => {
    const unsubscribeLoading = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setAdLoaded(true);
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setAdLoaded(false);
        interstitial.load();
      }
    );

    interstitial.load();

    return () => {
      unsubscribeClosed();
      unsubscribeLoading();
    };
  };

  useEffect(() => {
    const unsubscribeInterstitialEvent = loadInterstitial();

    return unsubscribeInterstitialEvent;
  }, []);

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
      ToastAndroid.show("Already exists in favorite", ToastAndroid.SHORT);
    } else {
      addItem(item);
      ToastAndroid.show("Add to favorites successfully!", ToastAndroid.SHORT);
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
          <TouchableOpacity
            style={tw`flex-row items-center ml-4`}
            onPress={async () => {
              addFavorite(favorites, data?.item);
              interstitial.show();
            }}
          >
            <MaterialIcons name="library-add" size={26} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row items-center ml-4`}
            onPress={async () => {
              await removeFromArray(data?.item);
              await getArray();
              ToastAndroid.show("Removed from favorites", ToastAndroid.SHORT);
              rewarded.show();
            }}
          >
            <MaterialCommunityIcons
              name="book-remove-multiple"
              size={26}
              color="black"
            />
          </TouchableOpacity>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuoteDetails;
