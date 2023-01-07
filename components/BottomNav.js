import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

const BottomNav = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`bg-gray-800 py-2 px-2 flex-row justify-between px-6`}>
      <TouchableOpacity
        style={tw`justify-center items-center`}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Entypo name='home' size={24} color='white' />
        <Text style={tw`text-white text-base`}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`justify-center items-center`}
        onPress={() => navigation.navigate('FavoritesScreen')}
      >
        <MaterialIcons name='favorite' size={24} color='white' />
        <Text style={tw`text-white text-base`}>Favorites</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`justify-center items-center`}
        onPress={() => navigation.navigate('More')}
      >
        <MaterialIcons name='more-vert' size={24} color='white' />
        <Text style={tw`text-white text-base`}>More</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;
