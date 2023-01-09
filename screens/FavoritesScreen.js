import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

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
        {favorites?.length === 0 ? (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={tw`text-2xl text-red-500`}>
              Your favorites list is empty
            </Text>
          </View>
        ) : (
          favorites?.map((item, index) => {
            const { quote, id } = item;
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
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavoritesScreen;
