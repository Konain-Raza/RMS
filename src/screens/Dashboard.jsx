import {View, Text, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import useStore from '../../store';

const Dashboard = () => {
  const {dashboardData, getDashboardData} = useStore();
  useEffect(async () => {
    // await getDashboardData();
  }, []);
  // console.log(dashboardData);

  return (
    <ScrollView className="flex-1 w-full px-5 mx-auto dark:bg-dark-bg">
      {/* Welcome Section */}
      <View className="my-5 p-4 rounded-lg bg-blue-500 dark:bg-blue-600">
        <Text className="text-white text-xl font-bold">
          Welcome Back, User!
        </Text>
        <Text className="text-white text-base mt-2">
          Here’s an overview of your recent activities.
        </Text>
      </View>

      {/* Statistics Cards */}
      <View className="flex-row justify-between mb-5">
        <View className="w-[48%] p-4 bg-white dark:bg-dark-card rounded-lg shadow-md">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">
            Orders
          </Text>
          <Text className="text-xl font-bold dark:text-white ">
            {orders.length}
          </Text>
        </View>
        <View className="w-[48%] p-4 bg-white dark:bg-dark-card rounded-lg shadow-md">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">
            Reservations
          </Text>
          <Text className="text-xl font-bold dark:text-white ">
            {reservations.length}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between mb-5">
        <View className="w-[48%] p-4 bg-white dark:bg-dark-card rounded-lg shadow-md">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">
            Coupons
          </Text>
          <Text className="text-xl font-bold dark:text-white ">
            {coupons.length}
          </Text>
        </View>
        <View className="w-[48%] p-4 bg-white dark:bg-dark-card rounded-lg shadow-md">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">
            Revenue
          </Text>
          <Text className="text-xl font-bold dark:text-white text-black">
            5,300
          </Text>
        </View>
      </View>

      {/* Recent Activities */}
      <View className="mb-5">
        <Text className="text-lg font-bold dark:text-white mb-3">
          Recent Activities
        </Text>
        <View className="p-4 bg-white dark:bg-dark-card rounded-lg shadow-md mb-3">
          <Text className="text-gray-700 dark:text-gray-200 text-sm">
            Order #12345 completed successfully
          </Text>
        </View>
        <View className="p-4 bg-white dark:bg-dark-card rounded-lg shadow-md mb-3">
          <Text className="text-gray-700 dark:text-gray-200 text-sm">
            Reservation #876 approved
          </Text>
        </View>
        <View className="p-4 bg-white dark:bg-dark-card rounded-lg shadow-md">
          <Text className="text-gray-700 dark:text-gray-200 text-sm">
            Coupon #457 applied to Order #67890
          </Text>
        </View>
      </View>

      {/* Performance Overview */}
      <View className="mb-10">
        <Text className="text-lg font-bold dark:text-white mb-3">
          Performance Overview
        </Text>
        <View className="p-4 bg-white dark:bg-dark-card rounded-lg shadow-md">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">
            This Month's Progress
          </Text>
          <View className="bg-gray-200 dark:bg-dark-gray rounded-full h-3 w-full mt-2">
            <View
              className="bg-green-500 h-full rounded-full"
              style={{width: '70%'}}
            />
          </View>
          <Text className="text-right text-green-500 dark:text-green-400 text-sm mt-1">
            70% Completed
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
