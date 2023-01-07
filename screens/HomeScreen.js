import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { StatusBar } from 'expo-status-bar';
import { collection, onSnapshot, where, query } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesData } from '../assets/categoriesData';
import { setCategory, setQuotes } from '../utils/redux/slices/quotesSlice';
import { useEffect } from 'react';
import { db } from '../firebase';

const HomeScreen = () => {
  const { quotes } = useSelector((state) => state.quotes);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    try {
      const col = collection(db, 'quotes');
      let quotesArr = [];

      onSnapshot(col, { includeMetadataChanges: true }, (snapshot) => {
        snapshot.forEach((doc) => {
          quotesArr.push(doc.data());

          // console.log('quotesArr', quotesArr);
          dispatch(setQuotes([...quotesArr]));
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <SafeAreaView style={tw`mt-7 justify-center items-center mx-2`}>
      <StatusBar style='black' />
      <FlatList
        data={categoriesData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`w-36 p-6 my-5 items-center justify-center bg-blue-800 mx-3 rounded-2xl`}
            onPress={() => {
              dispatch(setCategory(item?.title));
              navigation.navigate('Quotes');
            }}
          >
            <View style={tw`bg-white rounded-3xl`}>
              <Image source={item.image} style={{ width: 70, height: 70 }} />
            </View>

            <Text style={tw`text-base mt-2 text-white capitalize font-bold`}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
