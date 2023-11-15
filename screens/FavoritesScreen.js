import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { setFavorites } from "../utils/redux/slices/quotesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Banner } from "../utils/ads/Banner";

const FavoritesScreen = () => {
  const { favorites } = useSelector((state) => state.quotes);
  const dispatch = useDispatch();

  const navigation = useNavigation();

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

  useEffect(() => {
    getArray();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Favorites"
    });
  }, [navigation]);

  return (
    <ScrollView>
      {favorites?.length === 0 ? (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={tw`text-2xl text-red-500`}>
            Your favorites list is empty
          </Text>
        </View>
      ) : (
        favorites?.map((item, index) => {
          const { quote, id } = item;
          return (
            <TouchableOpacity
              activeOpacity={8}
              key={id}
              style={tw`flex-row -mx-4 mr-4 my-2 px-5 items-center`}
              onPress={() => navigation.navigate("QuoteDetails", { item })}
            >
              <View
                style={tw`border-blue-400 border-2 p-1 rounded-full w-11 h-11 justify-center items-center mr-5`}
              >
                <Text style={tw`text-xs font-semibold text-green-700`}>
                  {index + 1}
                </Text>
              </View>

              <Text style={tw`text-sm -ml-3 pr-14`}>
                {quote?.length > 75
                  ? `${quote.slice(0, 75)}... see more`
                  : quote}
              </Text>
            </TouchableOpacity>
          );
        })
      )}
      <Banner />
    </ScrollView>
  );
};

export default FavoritesScreen;
