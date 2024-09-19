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

  useEffect(() => {
    handleGetOrders(); 
  }, []);

  const handleLoadMore = () => {
    if (!loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      handleGetOrders(nextPage, 10, true); 
    }
  };

  const handleRefresh = async () => {
    setPage(1); 
    setRefreshing(true);
    await handleGetOrders(1, 10); 
    setRefreshing(false);
  };

  return (
    <View className='flex-1 w-full px-5 pt-5 mx-auto dark:dark:bg-dark-bg'>

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
