import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const ContactScreen = () => {
  return (
    <View style={tw`flex-1 justify-center ml-5`}>
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
