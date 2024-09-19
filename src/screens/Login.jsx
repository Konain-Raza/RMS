import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useStore from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const { getOrders, orders, setUser,getReservations, getCoupons } = useStore();
  const [consumerKey, setConsumerKey] = useState('');
  const [consumerSecret, setConsumerSecret] = useState('');
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleGetOrders = async () => {
    setLoading(true);
    try {
      await getOrders();
      navigation.navigate('Drawer', { orders });
    } catch (error) {
      Alert.alert(
        'Error fetching orders',
        error.response ? error.response.data : error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const userData = {
        baseURL: 'https://wordpress-1080859-4789281.cloudwaysapps.com',
        consumerKey: 'ck_eb7698b41251ff4823b78d8201aa5d42b80f417a',
        consumerSecret: 'cs_6a985635a7030f0ce82b99eb2eeaa0abf8ce7e7f',
        username: 'support@wpexperts.io',
        password: 'Mqc1 onty rSP2 CGGa unTj UCTk',
      };
  
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData)
      await handleGetOrders();
      await getCoupons();
      await getReservations();
    } catch (error) {
      console.error('Error during login:', error.message);
      Alert.alert('Login Error', 'An error occurred while logging in. Please try again.');
    }
  };
  

  const handleQRLogin = () => {
    navigation.navigate('Scanner');
  };

  return (
    <View className="flex-1 w-full bg-white dark:bg-dark-bg px-3 justify-center">
    <Text className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
      🎉 Gourmet Access: Your Woocommerce Portal 🍽️
    </Text>
  
    <View className="p-6 rounded-xl shadow-lg bg-white dark:bg-dark-card">
      <TextInput
        placeholder="Domain (e.g., myrestaurant.com)"
        placeholderTextColor="#a0a0a0"
        value={domain}
        onChangeText={text => setDomain(text)}
        className="bg-gray-50 dark:bg-gray-700 border mb-4 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg p-2.5 w-full"
      />
  
      <TextInput
        placeholder="Consumer Key"
        value={consumerKey}
        placeholderTextColor="#a0a0a0"
        onChangeText={text => setConsumerKey(text)}
        className="bg-gray-50 dark:bg-gray-700 border mb-4 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg p-2.5 w-full"
      />
  
      <TextInput
        placeholder="Consumer Secret"
        secureTextEntry
        placeholderTextColor="#a0a0a0"
        value={consumerSecret}
        onChangeText={text => setConsumerSecret(text)}
        className="bg-gray-50 dark:bg-gray-700 border mb-4 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg p-2.5 w-full"
      />
  
      <TouchableOpacity
        disabled={loading}
        onPress={handleLogin}
        className="bg-blue-500 dark:bg-blue-600 p-3 rounded-lg mb-4">
        <Text className="text-white text-center text-lg font-bold">
          {loading ? 'Loading' : 'Login'}
        </Text>
      </TouchableOpacity>
  
      <Text className="w-full text-black dark:text-white text-lg text-center my-2">OR</Text>
  
      <TouchableOpacity
        onPress={handleQRLogin}
        className="border border-blue-500 dark:border-blue-600 p-3 rounded-lg">
        <Text className="text-blue-500 dark:text-blue-400 text-center text-lg font-bold">
          Scan QR to Login
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  
  );
};

export default Login;
