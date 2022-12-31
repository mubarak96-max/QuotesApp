import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import BottomNav from '../components/BottomNav';
import tw from 'tailwind-react-native-classnames';

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`relative`}>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
