import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

const FavoritesScreen = () => {
  const { favorites } = useSelector((state) => state.quotes);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Favorites'
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        {favorites?.map((item, index) => {
          const { author, category, quote, commentary, id } = item;
          return (
            <TouchableOpacity
              key={id}
              style={tw`flex-row  mx-4 my-3 items-center`}
              onPress={() => navigation.navigate('QuoteDetails', { item })}
            >
              <View
                style={tw`border-blue-400 border-4 p-3 rounded-full w-14 h-14 items-center mr-5`}
              >
                <Text style={tw`text-lg font-semibold text-green-700`}>
                  {index + 1}
                </Text>
              </View>

              <Text style={tw`text-base`}>
                {quote?.length > 80 ? `${quote.slice(0, 80)}...` : quote}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavoritesScreen;
