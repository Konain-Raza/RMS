import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import useStore from '../../store';
import { useColorScheme } from 'react-native';

const OrderCard = ({ order }) => {
  const { user, updateOrderStatus } = useStore();
  const navigation = useNavigation();
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const statusOptions = [
    'pending',
    'processing',
    'on-hold',
    'completed',
    'cancelled',
    'refunded',
    'failed',
  ];

  const handleStatusChange = async newStatus => {
    if (!user?.baseURL || !user?.consumerKey || !user?.consumerSecret) {
      console.error('User data is incomplete:', user);
      return;
    }

    setSelectedStatus(newStatus);
    setLoading(true);

    try {
      await updateOrderStatus(order.id, newStatus);
      console.log('Order status updated successfully.');
    } catch (error) {
      console.error(
        'Failed to update order status:',
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const item = {
    status: selectedStatus,
    name: (order.line_items || []).map(item => item.name).join(', ') || 'None',
    qty: (order.line_items || []).map(item => item.quantity).join(', ') || '0',
    subtotal: `${order.total} ${order.currency_symbol}`,
  };

  return (
    <TouchableOpacity
      className="w-full rounded-lg shadow-md mb-4 p-4 border-l-4 dark:bg-dark-card  dark:border-dark-border border-blue-500"
      onPress={() => navigation.navigate('OrderDetails', { order })}
    >
      <Text className={`text-lg font-bold dark:text-dark-text' : 'text-gray-800'}`}>
        {item.name.length > 30 ? `${item.name.slice(0, 30)}...` : item.name}
      </Text>
      <Text className={`text-sm  dark:'text-dark-text' : 'text-gray-600'} mb-2`}>
        Quantity: <Text className={`font-bold dark:text-dark-text' : 'text-gray-800'}`}>{item.qty}</Text>
      </Text>
      <View className="flex-row justify-between items-center">
        <View className={`border-2 rounded-2xl overflow-hidden dark:border-dark-border' : 'border-gray-200'}`}>
          <Picker
            selectedValue={selectedStatus}
            dropdownIconColor={isDarkMode ? 'white' : 'black'}
            dropdownIconRippleColor={isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}
            style={{
              backgroundColor: isDarkMode ? '#3d3d3d' : 'white',
              height: 50,
              width: 160,
              color: isDarkMode ? 'white' : 'black',
            }}
            onValueChange={itemValue => handleStatusChange(itemValue)}
            enabled={!loading}
          >
            {statusOptions.map(status => (
              <Picker.Item
                style={{
                  backgroundColor: isDarkMode ? '#3d3d3d' : 'white',
                  height: 50,
                  width: 160,
                  color: isDarkMode ? 'white' : 'black',
                }}
                key={status}
                label={status.charAt(0).toUpperCase() + status.slice(1)}
                value={status}
              />
            ))}
          </Picker>
        </View>
        <Text className={`text-xl font-bold dark:text-green-300' : 'text-green-700'}`}>
          {item.subtotal}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
