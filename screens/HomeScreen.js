import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { StatusBar } from 'expo-status-bar';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as FileSystem from 'expo-file-system';
import { categoriesData } from '../assets/categoriesData';
import { setCategory, setQuotes } from '../utils/redux/slices/quotesSlice';
import { useEffect } from 'react';
import { db } from '../firebase';

const HomeScreen = () => {
  const { quotes } = useSelector((state) => state.quotes);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [quotesList, setQuotesList] = useState([]);

  useEffect(() => {
    try {
      const col = collection(db, 'quotes');
      const q = query(col, orderBy('timestamp', 'desc'));
      let quotesArr = [];

      onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
        snapshot.forEach((doc) => {
          quotesArr.push(doc.data());
        });

        async function saveDataToFileSystem(data) {
          try {
            await FileSystem.writeAsStringAsync(
              `${FileSystem.documentDirectory}myData.json`,
              JSON.stringify(data)
            );
            console.log('wrote data', JSON.parse(data));
          } catch (e) {
            console.log('Error saving data to file system', e);
          }
        }

        async function readDataFromFileSystem() {
          try {
            const data = await FileSystem.readAsStringAsync(
              `${FileSystem.documentDirectory}myData.json`
            );
            console.log('read data', JSON.parse(data));
            let uniqueQuotes = [...new Set(JSON.parse(data))];

            dispatch(setQuotes(uniqueQuotes));
            return uniqueQuotes;
          } catch (e) {
            console.log('Error reading data from file system', e);
          }
        }

        async function updateDataInFileSystem(newData) {
          try {
            const existingData = await readDataFromFileSystem();
            const updatedData = { ...existingData, ...newData };
            await FileSystem.writeAsStringAsync(
              `${FileSystem.documentDirectory}myData.json`,
              JSON.stringify(updatedData)
            );
          } catch (e) {
            console.log('Error updating data in file system', e);
          }
        }

        saveDataToFileSystem(quotesArr);
        updateDataInFileSystem(quotesArr);
        readDataFromFileSystem();

        // console.log('new quotes', quotes);
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
