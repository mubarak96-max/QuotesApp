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
import { setQuotes } from '../utils/redux/slices/quotesSlice';
import { useEffect } from 'react';
import { db } from '../firebase';

const HomeScreen = () => {
  const { quotes } = useSelector((state) => state.quotes);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const col = collection(db, 'quotes');
      let quotesArr = [];
      // const q = query(collection(db, 'cities'), where('state', '==', 'CA'));
      onSnapshot(col, { includeMetadataChanges: true }, (snapshot) => {
        // console.log('snapshot', snapshot);
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            // console.log('quotes: ', change.doc.data());
            quotesArr.push(change?.doc?.data());
            dispatch(setQuotes(quotesArr.flat()));
          }

          //   console.log('quotes', quotes);
          //   console.log('length', quotes?.length);

          //   const source = snapshot.metadata.fromCache ? 'local cache' : 'server';
          //   console.log('Data came from ' + source);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const navigation = useNavigation();

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
            onPress={() => navigation.navigate('Quotes')}
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
