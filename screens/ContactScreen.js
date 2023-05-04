import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const ContactScreen = () => {
  return (
    <View style={tw`flex-1 justify-center `}>
      <View style={tw`my-2`}>
        <BannerAd
          unitId='ca-app-pub-8237514940582521/6183999893'
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true
          }}
        />
      </View>
      <View style={tw`flex-row items-center my-3`}>
        <MaterialIcons name='email' size={34} color='black' />
        <Text style={tw`text-2xl ml-3`}>mubarakmmm5@gmail.com</Text>
      </View>

      <View style={tw`flex-row items-center my-3 `}>
        <Ionicons name='logo-whatsapp' size={34} color='green' />
        <Text style={tw`text-2xl ml-3`}>+256-759-984846</Text>
      </View>
    </View>
  );
};

export default ContactScreen;
