import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const QuoteDetails = ({ route }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const data = route?.params;
  const { author, category, commentary, quote } = data?.item;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`mt-8 `}>
      <View style={tw`flex-row justify-between mx-6`}>
        <TouchableOpacity
          style={tw`flex-row items-center ml-4`}
          onPress={() => navigation.goBack()}
        >
          <Entypo name='chevron-left' size={30} color='black' />
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row items-center ml-4`}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <MaterialIcons
            name='favorite'
            size={35}
            color={`${isFavorite ? 'red' : 'black'}`}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={tw`bg-blue-100 py-3 px-3 mt-3 mx-4 rounded-md shadow-xl`}>
          <Text style={tw`text-green-900 text-lg`}>{quote}</Text>
        </View>
        <Text style={tw`text-gray-400 ml-4 mt-2 capitalize`}>#{category}</Text>
        <Text
          style={tw`ml-4 mt-5 text-blue-900 text-base font-semibold capitalize underline`}
        >
          {author}
        </Text>
        <Text style={tw`mx-4 my-5 text-pink-900 text-base`}>{commentary}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuoteDetails;
