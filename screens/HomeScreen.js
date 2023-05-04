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
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { categoriesData } from '../assets/categoriesData';
import { setCategory, setQuotes } from '../utils/redux/slices/quotesSlice';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    firestore()
      .collection('quotes')
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
    <SafeAreaView style={tw`mt-7 justify-center items-center mx-2`}>
      <StatusBar style='black' />
      <FlatList
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
      />
    </SafeAreaView>
  );
};

const bannerId = 'ca-app-pub-8237514940582521/6183999893';

export default HomeScreen;
