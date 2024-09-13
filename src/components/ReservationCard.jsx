import React, {useState} from 'react';
import {View, Text, useColorScheme} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import useStore from '../../store';

const ReservationCard = ({reservation}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const {updateReservation} = useStore();
  const [status, setStatus] = useState(reservation.data.reservation_status);

  const updateReservationStatus = async newStatus => {
    setStatus(newStatus);
    try {
      await updateReservation(reservation.ID, newStatus);
      console.log('Updated status for reservation');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="bg-white  dark:bg-dark-card  dark:border-dark-border border-[1px] p-4 m-3 rounded-lg shadow dark:shadow-dark">
      <View className="relative">
        {status === 'Confirmed' && (
          <View className="absolute top-2 right-2 flex-row">
            <Text className="text-green-500 text-xl">✓</Text>
            <Text className="text-green-500 text-xl ml-1">✓</Text>
          </View>
        )}

        <View className="flex-row justify-between mb-3">
          <Text className="text-xl font-bold text-gray-800 dark:text-dark-text">
            {reservation.data.reservation_first_name}{' '}
            {reservation.data.reservation_last_name}
          </Text>
          <Text className="text-sm font-semibold text-yellow-500 dark:text-yellow-400">
            {status}
          </Text>
        </View>

        <Text className="text-gray-600 dark:text-gray-400">
          Date: {reservation.data.reservation_date}
        </Text>
        <Text className="text-gray-600 dark:text-gray-400">
          Time: {reservation.data.reservation_reserve_from} -{' '}
          {reservation.data.reservation_reserve_till}
        </Text>
        <Text className="text-gray-600 dark:text-gray-400">
          Guests: {reservation.data.reservation_total_guests}
        </Text>
        <Text className="text-gray-600 dark:text-gray-400">
          {reservation.data.reservation_reserve_information}
        </Text>
        <Text className="text-gray-600 dark:text-gray-400">
          Branch: {reservation.data.reservation_branch}
        </Text>
        <Text className="text-gray-600 dark:text-gray-400">
          Email: {reservation.data.reservation_email}
        </Text>
        <Text className="text-gray-600 dark:text-gray-400">
          Phone: {reservation.data.reservation_phone_number}
        </Text>

        <View className="mt-4">
          <View
            className={`border-2 w-40 rounded-2xl overflow-hidden dark:border-dark-border' : 'border-gray-200'}`}>
            <Picker
              dropdownIconColor={isDarkMode ? 'white' : 'black'}
              dropdownIconRippleColor={
                isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
              } 
              style={{
                backgroundColor: isDarkMode ? '#3d3d3d' : 'white',
                height: 50,
                width: 160,
                color: isDarkMode ? 'white' : 'black',
              }}
              selectedValue={status}
              onValueChange={itemValue => updateReservationStatus(itemValue)}>
              <Picker.Item label="Confirmed" value="Confirmed" />
              <Picker.Item label="Completed" value="Completed" />
              <Picker.Item label="Pending" value="Pending" />
              <Picker.Item label="Cancelled" value="Cancelled" />
            </Picker>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReservationCard;
