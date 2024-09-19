import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme,Alert } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      Alert.alert(
        'Confirm Logout',
        'Are you sure you want to log out?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              try {
                await AsyncStorage.removeItem('userData');
                navigation.navigate('Login');
         
              } catch (error) {
                console.error('Error during logout:', error.message);
                Alert.alert('Logout Error', 'An error occurred while logging out. Please try again.');
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error during logout:', error.message);
      Alert.alert('Logout Error', 'An error occurred while logging out. Please try again.');
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      className={`p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} dark:bg-gray-900`}
    >
      <View className="flex-1">
        {/* Close Button */}
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
          className={`p-2 rounded-md mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} dark:bg-gray-700`}
        >
          <Text className={`text-center ${isDarkMode ? 'text-white' : 'text-black'} dark:text-white`}>
            Close
          </Text>
        </TouchableOpacity>

        {/* Header */}
        <View className="mb-6">
          <Text className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} dark:text-white`}>
            Restaurant for Woocommerce
          </Text>
          <Text className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} dark:text-gray-400`}>
            Welcome back!
          </Text>
        </View>

        {/* Drawer Items */}
        <DrawerItemList {...props} />

        <View className="mt-auto">
          <TouchableOpacity
            onPress={handleLogout}
            className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} dark:bg-gray-600`}
          >
            <Text className={`text-center ${isDarkMode ? 'text-white' : 'text-black'} dark:text-white`}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
