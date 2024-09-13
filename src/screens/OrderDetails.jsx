import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import useStore from '../../store';

const OrderDetails = ({route}) => {
  const {user} = useStore();
  const [selectedStatus, setSelectedStatus] = useState(
    route?.params?.order?.status || '',
  );
  const navigation = useNavigation();
  useEffect(() => {
    route?.params?.order?.status ?? navigation.navigate('Home');
  });
  const [loading, setLoading] = useState(false);

  const order = route?.params?.order;

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
    if (!order || !user) {
      console.error('Order or user data is missing.');
      return;
    }

    setSelectedStatus(newStatus);
    setLoading(true);

    const statusUpdateURL = `${user?.baseURL}/wp-json/wc/v3/orders/${order.id}?consumer_key=${user?.consumerKey}&consumer_secret=${user?.consumerSecret}`;
    console.log(statusUpdateURL);
    try {
      await axios.put(
        statusUpdateURL,
        {status: newStatus},
        {headers: {'Content-Type': 'application/json'}},
      );
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
  useEffect(() => {
    if (order) {
      navigation.setOptions({
        title: `Order #${order.id}`,
        headerStyle: {backgroundColor: '#f8f9fa'},
        headerTitleStyle: {color: '#333', fontWeight: 'bold'},
      });
    }
  }, [order, navigation]);

  return (
    <ScrollView className="bg-gray-100 p-4">
      {/* Order Header */}
      <View className="mb-4 bg-white p-6 rounded-xl shadow-lg">
        <Text className="text-2xl font-semibold text-gray-900">
          Order #{order?.id}
        </Text>
        <Text className="text-sm text-gray-500 mt-1">
          Date: {new Date(order?.date_created).toLocaleDateString()}
        </Text>

        <View className="border-gray-200 w-1/2 border-2 rounded-2xl overflow-hidden">
          <Picker
            selectedValue={selectedStatus}
            style={{
              backgroundColor: 'white',
              height: 50, // Adjust height for better touch
              width: 'max-content',
              color: 'black',
            }}
            onValueChange={itemValue => handleStatusChange(itemValue)}
            enabled={!loading}>
            {statusOptions.map(status => (
              <Picker.Item
                style={{
                  backgroundColor: 'white',
                  height: 50, // Adjust height for better touch
                  color: 'black',
                }}
                key={status}
                label={status.charAt(0).toUpperCase() + status.slice(1)}
                value={status}
              />
            ))}
          </Picker>
        </View>
      </View>

      {/* Customer Details */}
      <View className="mb-4 bg-white p-6 rounded-xl shadow-lg flex-row">
        <View>
          <Text className="text-lg font-semibold text-gray-800">
            Customer Details
          </Text>
          <Text className="text-sm text-gray-600">
            {order?.billing?.first_name} {order?.billing?.last_name}
          </Text>
          <Text className="text-sm text-gray-600">
            Email: {order?.billing?.email}
          </Text>
          <Text className="text-sm text-gray-600">
            Phone: {order?.billing?.phone}
          </Text>
          <Text className="text-sm text-gray-600">
            Address: {order?.billing?.address_1}, {order?.billing?.city}
          </Text>
        </View>
      </View>

      {/* Line Items */}
      <View className="mb-4 bg-white p-6 rounded-xl shadow-2xl">
        <Text className="text-lg font-semibold text-gray-800 mb-4">Items</Text>
        {order?.line_items?.map((item, index) => (
          <View
            key={index}
            className="flex-row items-center justify-between mb-3">
            <Image
              source={{uri: item.image.src || 'https://via.placeholder.com/60'}} // Replace with actual product image URL
              className="w-12 h-12 rounded-md mr-3"
            />
            <View className="flex-1">
              <Text className="text-sm text-gray-800 font-medium">
                {item.name}
              </Text>
              <Text className="text-sm text-gray-500">
                Quantity: {item.quantity}
              </Text>
            </View>
            <Text className="text-sm text-gray-600 font-medium">
              ₨ {item.total}
            </Text>
          </View>
        ))}
      </View>

      {/* Order Total */}
      <View className="bg-white p-6 rounded-xl shadow-lg mb-16">
        <Text className="text-lg font-semibold text-gray-800">
          Order Summary
        </Text>

        {/* Item Prices */}
        {order?.line_items?.map((item, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center mt-1">
            <Text className="text-sm text-gray-600">
              {item.quantity} x {item.name}
            </Text>
            <Text className="text-sm text-gray-600">₨ {item.total}</Text>
          </View>
        ))}
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-sm text-gray-600">Shipping Charges</Text>
          <Text className="text-sm text-gray-600">
            ₨ {order?.shipping_total || '0.00'}
          </Text>
        </View>
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-sm text-gray-600">Payment Method: </Text>
          <Text className="text-sm text-gray-600">
            {order?.payment_method_title}
          </Text>
        </View>
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-lg font-bold text-gray-600">Total: </Text>
          <Text className="text-lg font-bold text-gray-600">
            {order?.total}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetails;
