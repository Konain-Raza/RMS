import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import useStore from '../../store';
import CouponCard from '../components/CouponCard';
const Coupons = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const {coupons, addCoupon} = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [discountType, setDiscountType] = useState('percent');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddCoupon = async () => {
    if (!couponCode || !amount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (discountType === 'percent' && (amount <= 0 || amount > 100)) {
      Alert.alert(
        'Error',
        'Discount Amount should not be more than 100 percent',
      );
      return;
    }
    setLoading(true);
    try {
      await addCoupon(couponCode, discountType, amount);
      setCouponCode('');
      setAmount('');
      console.log('Success', 'Coupon added successfully');
    } catch (error) {
      console.error('Error adding coupon:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="p-4 dark:bg-dark-bg">
      <Text className="text-2xl font-bold mb-4 text-black dark:text-dark-text">
        Coupons
      </Text>

      <TextInput
        value={couponCode}
        onChangeText={setCouponCode}
        placeholder="Enter Coupon Code"
        placeholderTextColor="#a0a0a0"
        className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full dark:bg-dark-card dark:border-dark-border dark:text-white"
      />

      <View className="w-full flex-row flex justify-between items-center">
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter Discount Amount"
          keyboardType="numeric"
          placeholderTextColor="#a0a0a0"
          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg p-3 w-max dark:bg-dark-card dark:border-dark-border dark:text-white"
        />
        <View
          className={`border-2 w-44 rounded-2xl overflow-hidden dark:border-dark-border' : 'border-gray-200'}`}>
          <Picker
            selectedValue={discountType}
            onValueChange={itemValue => setDiscountType(itemValue)}
            dropdownIconColor={isDarkMode ? 'white' : 'black'}
            dropdownIconRippleColor={
              isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
            }
            style={{
              backgroundColor: isDarkMode ? '#3d3d3d' : 'white',
              height: 50,
              width: 'max-content',
              color: isDarkMode ? 'white' : 'black',
            }}>
            <Picker.Item label="Percentage" value="percent" />
            <Picker.Item label="Fixed Cart Discount" value="fixed_cart" />
            <Picker.Item label="Fixed Product Discount" value="fixed_product" />
            <Picker.Item label="Free Shipping" value="free_shipping" />
          </Picker>
        </View>
      </View>
      <TouchableOpacity
        disabled={loading}
        onPress={handleAddCoupon}
        className={`mt-4 p-3 rounded-full ${
          loading ? 'bg-gray-400' : 'bg-green-600'
        } dark:${loading ? 'bg-gray-500' : 'bg-green-700'}`}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-bold">Add Coupon</Text>
        )}
      </TouchableOpacity>

      <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
        {coupons.map(coupon => (
          <CouponCard coupon={coupon} key={coupon.id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Coupons;
