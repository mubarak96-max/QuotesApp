import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { categoriesData } from "../assets/categoriesData";
import { setCategory, setQuotes } from "../utils/redux/slices/quotesSlice";
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { quotes } = useSelector((state) => state.quotes);

  useEffect(() => {
    firestore()
      .collection("quotes")
      .get()
      .then((querySnapshot) => {
        const pac = [];

        querySnapshot.forEach((documentSnapshot) => {
          pac.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });

        setQuotes(pac);
        dispatch(setQuotes(pac));
      })
      .catch(() => {});
  }, []);

  return (
    <SafeAreaView style={tw`mt-7 justify-center items-center ml-1 mr-5`}>
      <StatusBar style="black" />
      {/* <FlatList
        data={categoriesData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false} 
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={8}
            style={tw`w-36 p-6 my-5 items-center justify-center bg-blue-800 mx-3 rounded-2xl`}
            onPress={() => {
              dispatch(setCategory(item?.title));
              navigation.navigate('Quotes');
            }}
          >
            <View style={tw`bg-white rounded-3xl`}>
              <Image
                source={item.image}
                style={{ width: 65, height: 65, resizeMode: 'contain' }}
              />
            </View>

            <Text style={tw`text-base mt-2 text-white capitalize font-bold`}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      /> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {quotes?.map((item, index) => {
          const { quote, id } = item;
          return (
            <TouchableOpacity
              activeOpacity={8}
              key={id}
              style={tw`flex-row -mx-4 mr-4 my-2 px-5 items-center`}
              onPress={() => navigation.navigate("QuoteDetails", { item })}
            >
              <View
                style={tw`border-blue-400 border-2 p-2 rounded-full w-10 h-10 items-center mr-5`}
              >
                <Text style={tw`text-sm font-semibold text-green-700`}>
                  {index + 1}
                </Text>
              </View>

              <Text style={tw`text-base -ml-3 pr-14`}>
                {quote?.length > 80
                  ? `${quote.slice(0, 80)}... see more`
                  : quote}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const bannerId = "ca-app-pub-8237514940582521/6183999893";

export default HomeScreen;
