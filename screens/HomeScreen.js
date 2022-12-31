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
import { categoriesData } from '../assets/categoriesData';

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`mt-7 justify-center items-center mx-2`}>
      <StatusBar style='black' />
      <Text>HomeScreen</Text>
      <FlatList
        data={categoriesData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`w-36 p-6 my-5 items-center justify-center bg-blue-800 mx-3 rounded-2xl`}
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
