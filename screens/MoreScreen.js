import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import * as StoreReview from "expo-store-review";

const MoreScreen = () => {
  const navigation = useNavigation();

  const handleReview = async () => {
    if (StoreReview.isAvailableAsync()) {
      await StoreReview.requestReview();
    } else {
      Alert.alert(
        "Store review not available",
        "Sorry, we cannot open the review page at this moment. Please try again later.",
        [{ text: "OK" }]
      );
      // If store review is not available, you can provide a fallback option such as a custom feedback form
      Linking.openURL(
        `market://details?id=${com.mubarak96.QuotesApp}&showAllReviews=true`
      );
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      <View style={tw`mb-14`}></View>
      <View style={tw`h-1 w-48 bg-green-600`}></View>

      <TouchableOpacity
        style={tw`my-5`}
        onPress={() => navigation.navigate("About")}
      >
        <Text style={tw`text-3xl font-semibold text-blue-600`}>About</Text>
      </TouchableOpacity>
      <View style={tw`h-1 w-48 bg-green-600`}></View>
      <TouchableOpacity
        style={tw`my-5`}
        onPress={() => navigation.navigate("Contact")}
      >
        <Text style={tw`text-3xl font-semibold text-blue-600`}>Contact</Text>
      </TouchableOpacity>
      <View style={tw`h-1 w-48 bg-green-600`}></View>
      <TouchableOpacity style={tw`my-5`} onPress={handleReview}>
        <Text style={tw`text-3xl font-semibold text-blue-600`}>Rate App</Text>
      </TouchableOpacity>
      <View style={tw`h-1 w-48 bg-green-600`}></View>
    </SafeAreaView>
  );
};

export default MoreScreen;
