import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Appearance} from 'react-native';
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
  const colorScheme = Appearance.getColorScheme();

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

        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#00000' : '#00000',
        },
        headerTitleStyle: {
          color: colorScheme === 'dark' ? '#f8f9fa' : '#333',
          fontWeight: 'bold',
        },
      });
    }
  }, [order, navigation, colorScheme]);

  return (
    <ScrollView
      className="bg-gray-100 p-4 dark:bg-dark-card"
      showsVerticalScrollIndicator={false}>
      <View className="mb-4 bg-white p-6 rounded-xl shadow-lg dark:bg-dark-card border dark:border-dark-border">
        <Text className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Order #{order?.id}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Date: {new Date(order?.date_created).toLocaleDateString()}
        </Text>

        <View
          className={`border rounded-xl overflow-hidden dark:border-dark-border' border-gray-400 mt-3`}>
          <Picker
            selectedValue={selectedStatus}
            dropdownIconColor={colorScheme === 'dark' ? 'white' : 'black'}
            dropdownIconRippleColor={
              colorScheme === 'dark'
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.2)'
            }
            style={{
              backgroundColor: colorScheme === 'dark' ? '#3d3d3d' : 'white',
              height: 50,
              width: 'max-content',
              color: colorScheme === 'dark' ? 'white' : 'black',
            }}
            onValueChange={itemValue => handleStatusChange(itemValue)}
            enabled={!loading}>
            {statusOptions.map(status => (
              <Picker.Item
                style={{
                  backgroundColor: colorScheme === 'dark' ? '#3d3d3d' : 'white',
                  height: 50,
                  width: 160,
                  color: colorScheme === 'dark' ? 'white' : 'black',
                }}
                key={status}
                label={status.charAt(0).toUpperCase() + status.slice(1)}
                value={status}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View className="mb-4 bg-white p-6 rounded-xl shadow-lg dark:bg-dark-card border dark:border-dark-border  flex-row">
        <View>
          <Text className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Customer Details
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            {order?.billing?.first_name} {order?.billing?.last_name}
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            Email: {order?.billing?.email}
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            Phone: {order?.billing?.phone}
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            Address: {order?.billing?.address_1}, {order?.billing?.city}
          </Text>
        </View>
      </View>

      <View className="mb-4 bg-white p-6 rounded-xl shadow-2xl dark:bg-dark-card border dark:border-dark-border">
        <Text className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Items
        </Text>
        {order?.line_items?.map((item, index) => (
          <View
            key={index}
            className="flex-row items-center justify-between mb-3">
            <Image
              source={{uri: item.image.src || 'https://via.placeholder.com/60'}}
              className="w-12 h-12 rounded-md mr-3"
            />
            <View className="flex-1">
              <Text className="text-sm text-gray-800 dark:text-gray-100 font-medium">
                {item.name}
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                Quantity: {item.quantity}
              </Text>
            </View>
            <Text className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              ₨ {item.total}
            </Text>
          </View>
        ))}
      </View>

      <View className="bg-white p-6 rounded-xl shadow-lg dark:bg-dark-card border dark:border-dark-border mb-16">
        <Text className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Order Summary
        </Text>

        {order?.line_items?.map((item, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center mt-1">
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              {item.quantity} x {item.name}
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              ₨ {item.total}
            </Text>
          </View>
        ))}
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            Shipping Charges
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            ₨ {order?.shipping_total || '0.00'}
          </Text>
        </View>
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            Payment Method:
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            {order?.payment_method_title}
          </Text>
        </View>
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-lg font-bold text-gray-600 dark:text-gray-100">
            Total:
          </Text>
          <Text className="text-lg font-bold text-gray-600 dark:text-gray-100">
            {order?.total}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetails;
