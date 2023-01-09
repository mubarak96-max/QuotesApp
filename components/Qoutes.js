import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

const Qoutes = () => {
  const { quotes, categories } = useSelector((state) => state.quotes);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: categories[0]?.category.toUpperCase()
    });
  }, [navigation]);

  console.log(categories[0]?.category);

  return (
    <SafeAreaView style={tw`mt-1`}>
      <ScrollView>
        {categories?.map((item, index) => {
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

export default Qoutes;
