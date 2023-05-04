import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const MoreScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      <View style={tw`mb-14`}>
        <BannerAd
          unitId='ca-app-pub-8237514940582521/6183999893'
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true
          }}
        />
      </View>
      <View style={tw`h-1 w-48 bg-green-600`}></View>

      <TouchableOpacity
        style={tw`my-5`}
        onPress={() => navigation.navigate('About')}
      >
        <Text style={tw`text-3xl font-semibold text-blue-600`}>About</Text>
      </TouchableOpacity>
      <View style={tw`h-1 w-48 bg-green-600`}></View>
      <TouchableOpacity
        style={tw`my-5`}
        onPress={() => navigation.navigate('Contact')}
      >
        <Text style={tw`text-3xl font-semibold text-blue-600`}>Contact</Text>
      </TouchableOpacity>
      <View style={tw`h-1 w-48 bg-green-600`}></View>
    </SafeAreaView>
  );
};

export default MoreScreen;
