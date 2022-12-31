import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Qoutes = () => {
  const { quotes } = useSelector((state) => state.quotes);
  const navigation = useNavigation();
  //   console.log(quotes);
  return (
    <SafeAreaView style={tw`mt-8`}>
      <View
        style={tw`flex-row justify-between px-3 bg-green-600 h-8 items-center mx-4`}
      >
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Entypo name='chevron-left' size={30} color='white' />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-semibold`}>Quotes</Text>
      </View>
      <ScrollView>
        {quotes?.map((item, index) => {
          const { author, category, quote, commentary } = item;
          return (
            <TouchableOpacity
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
