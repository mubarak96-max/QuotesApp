import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';

const AboutScreen = () => {
  return (
    <View style={tw`px-3 py-5`}>
      <Text style={tw`py-2 text-xl font-semibold text-blue-500 italic`}>
        Our minds are constantly fed with lots and lots of information. This all
        influences our beliefs and attitude towards ourselves, fellow humans
        being, other creatures and most importantly towards our Creator, Allah
      </Text>
      <Text style={tw`py-2 text-xl font-semibold text-blue-500 italic`}>
        It is a fact that most of that information overload is a like a virus to
        our minds. The purpose of this app is to provide Muslims with the right
        words to shape their minds and build mental models basing on the right
        Islamic teachings
      </Text>
      <Text style={tw`py-2 text-xl font-semibold text-blue-500 italic`}>
        We collected these quotes, words, sayings from the Quran, teachings of
        the Prophet Muhammad (Peace be upon him), and sayings of Muslim scholars
      </Text>
      <Text style={tw`text-xl font-semibold text-blue-500 italic`}>
        This app was developed by Mutesasira Mubarak
      </Text>
    </View>
  );
};

export default AboutScreen;
