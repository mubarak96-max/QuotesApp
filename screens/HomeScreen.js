import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { useState } from "react";
import { Banner } from "../utils/ads/Banner";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [allQuotes, setAllQuotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    firestore()
      .collection("quotes")
      .get()
      .then((querySnapshot) => {
        const pac = [];

        querySnapshot.forEach((documentSnapshot) => {
          pac.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });

        setAllQuotes(pac);
      })
      .catch(() => {});

    setLoading(false);
  }, []);

  return (
    <SafeAreaView>
      {loading ? (
        <View style={[styles.container]}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {allQuotes?.map((item, index) => {
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
          })}
        </ScrollView>
      )}
      {/* <Banner /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 200
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default HomeScreen;
