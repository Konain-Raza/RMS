import { View, FlatList, Text, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import useStore from '../../store';
import ReservationCard from '../components/ReservationCard';

const Reservations = () => {
  const { reservations, getReservations } = useStore();
  const [isLoading, setIsLoading] = useState(false);



  if (isLoading) {
    return (
      <View className="flex-1 dark:bg-dark-bg items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      className="dark:bg-[#1a1a1a]"
      data={reservations}
      renderItem={({ item }) => <ReservationCard reservation={item}  key={item.ID}/>}
      ListEmptyComponent={<Text className="text-center text-gray-600">No reservations available</Text>}
    />
  );
};

export default Reservations;
