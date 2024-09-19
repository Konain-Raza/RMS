import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useState} from 'react';
import React from 'react';
import useStore from '../../store';

const CouponCard = ({coupon}) => {
  const {deleteCoupon} = useStore();
  const [deleting, setDeleting] = useState(null);

  const handleDeleteCoupon = async id => {
    setDeleting(id);
    try {
      await deleteCoupon(id);
      Alert.alert('Success', 'Coupon deleted successfully');
    } catch (error) {
      console.error(
        'Error deleting coupon:',
        error.response ? error.response.data : error.message,
      );
    } finally {
      setDeleting(null);
    }
  };

  return (
    <View className="bg-white p-6  dark:bg-dark-card  rounded-xl shadow-lg mb-6 border border-gray-200">
      <Text className="text-xl font-bold text-gray-800 dark:text-white tracking-wide">
        🎟️ {coupon.code}
      </Text>
      <Text className="mt-2 text-lg text-gray-600">
        Discount: <Text className="text-green-500">{coupon.amount}%</Text>
      </Text>
      <Text className="mt-2 text-sm text-gray-500">
        Created on: {new Date(coupon.date_created).toLocaleDateString()}
      </Text>

      <TouchableOpacity
        onPress={() => handleDeleteCoupon(coupon.id)}
        className={`mt-4 p-3 rounded-full ${
          deleting === coupon.id ? 'bg-gray-400' : 'bg-red-600'
        }`}
        disabled={deleting === coupon.id}>
        {deleting === coupon.id ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-bold">Delete</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CouponCard;
