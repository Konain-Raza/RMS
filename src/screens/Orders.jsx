import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, useColorScheme } from 'react-native';
import OrderCard from '../components/OrderCard';
import useStore from '../../store';

const Orders = ({ route }) => {
  const { getOrders, orders } = useStore();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Fetch orders when the page changes
  // useEffect(() => {
  //   handleGetOrders(page); // Fetch orders whenever `page` changes
  // }, [page]);

  const handleGetOrders = async (page = 1, perPage = 10, isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      await getOrders(page, perPage); 
    } catch (error) {
      console.error(
        'Error fetching orders',
        error.response ? error.response.data : error.message,
      );
    } finally {
      if (isLoadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore) {
      setPage(prevPage => prevPage + 1); // Increment the page number to load more
    }
  };

  const handleRefresh = async () => {
    setPage(1); // Reset the page to 1 on refresh
    setRefreshing(true);
    await handleGetOrders(1, 10); // Fetch the first page on refresh
    setRefreshing(false);
  };

  return (
    <View className={`flex-1 w-full px-5 mx-auto ${isDarkMode ? 'dark:bg-dark-bg' : 'bg-white'}`}>
      <Text className={`text-2xl font-bold ${isDarkMode ? 'text-dark-text' : 'text-black'} p-3`}>
        Orders:
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={orders}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        renderItem={({ item, index }) => <OrderCard order={item} index={index} />}
        keyExtractor={item => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator color={isDarkMode ? '#ffffff' : '#0000ff'} /> : null}
      />
    </View>
  );
};

export default Orders;
