import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-remix-icon';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustomDrawerContent = props => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      const logoutConfirmed = await new Promise(resolve => {
        Alert.alert(
          'Confirm Logout',
          'Are you sure you want to log out?',
          [
            {text: 'Cancel', style: 'cancel', onPress: () => resolve(false)},
            {text: 'OK', onPress: () => resolve(true)},
          ],
          {cancelable: false},
        );
      });

      if (logoutConfirmed) {
        await AsyncStorage.removeItem('userData');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error during logout:', error.message);
      Alert.alert(
        'Logout Error',
        'An error occurred while logging out. Please try again.',
      );
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      className={`p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <View className="flex-1">
        <View className="mb-6 w-full flex-row justify-between items-center p-5">
          <View>
            <Text
              className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
              Restaurant for Woocommerce
            </Text>
            <Text
              className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-700'
              }`}>
              Welcome back!
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
            className={`p-2 rounded-md mb-4 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
            <Icon name="close-circle-line" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <DrawerItemList {...props} />

        <View className="mt-auto mx-3">
          <TouchableOpacity
            onPress={handleLogout}
            className="px-2 py-3 rounded-lg bg-gray-200 dark:bg-gray-600 flex flex-row justify-start items-center w-max">
            <Icon name="logout-box-line" size={28} color="white" />
            <Text className="ml-6 text-black dark:text-white text-md font-bold">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
