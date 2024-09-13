import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-remix-icon';

import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({user}) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userData');
    navigation.navigate('Login');
  };
  return (
    <View className=" w-full flex items-center flex-row justify-between ">
      <View className="flex flex-colitems-start justify-center">
        <Text className="text-xl leading-none p-0 font-outfit-medium text-gray-700">
          Welcome 👋
        </Text>
        <Text className="text-2xl m-0 p-0 font-bold text-black">
          {user?.name}
        </Text>
      </View>
      <View className="w-max gap-2 flex-row justify-around">
        {user?.image ? (
          <Image
            source={{uri: user?.image || ''}}
            className="w-16 h-16 rounded-full border-4 border-gray-300 shadow-md"
          />
        ) : (
          <Text>No Image Available</Text>
        )}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 px-3 py-2 rounded-2xl items-center justify-center">
          <Icon name="logout-box-r-line" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
