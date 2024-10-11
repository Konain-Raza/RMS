import React, {useState, useEffect} from 'react';
import {Alert, View, Text, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/screens/Login';
import Orders from './src/screens/Orders';
import OrderDetails from './src/screens/OrderDetails';
import Scanner from './src/screens/Scanner';
import useStore from './store';
import Coupons from './src/screens/Coupons';
import Reservations from './src/screens/Reservations';
import CustomDrawerContent from './src/components/DrawerHeader';
import Icon from 'react-native-remix-icon';
import Dashboard from './src/screens/Dashboard';
import {initializeNotifications} from './src/utils/NotificationsHelper';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const {
    setUser,
    getCoupons,
    getOrders,
    getReservations,
    getDashboardData,
    user,
  } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const DrawerList = [
    {
      title: 'Orders',
      icon: 'restaurant-line',
      screen: Orders,
    },
    {
      title: 'General Settings',
      icon: 'settings-line',
      screen: Orders,
    },
    {
      title: 'Styles',
      icon: 'restaurant-line',
      screen: Orders,
    },
    {
      title: 'Labels',
      icon: 'calendar-event-line',
      screen: Reservations,
    },
    {
      title: 'Timings',
      icon: 'coupon-line',
      screen: Coupons,
    },
    {
      title: 'Shipping ',
      icon: 'restaurant-line',
      screen: Orders,
    },
  
    {
      title: 'Notification Settings',
      icon: 'calendar-event-line',
      screen: Reservations,
    },
    {
      title: 'Tipping',
      icon: 'coupon-line',
      screen: Coupons,
    },
    {
      title: 'Reservations',
      icon: 'coupon-line',
      screen: Coupons,
    },
  ];
  const DrawerNavigator = () => (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
        },
        drawerActiveTintColor: isDarkMode ? '#ffffff' : '#000000',
        drawerInactiveTintColor: isDarkMode ? '#b3b3b3' : '#4f4f4f',
        headerStyle: {
          backgroundColor: isDarkMode ? '#1a1a1a' : '#f0f0f0',
        },
        headerTintColor: isDarkMode ? '#ffffff' : '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {DrawerList.map(item => (
        <Drawer.Screen
          key={item.title}
          name={item.title}ggggggggggggg
          component={item.screen}
          options={{
            drawerIcon: ({color, size}) => (
              <Icon name={item.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Drawer.Navigator>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getOrders();
        await getCoupons();
        await getReservations();
      } catch (error) {
        Alert.alert('Failed to Load Data', error.message);
      }
    };

    const checkUser = async () => { 
      try {
        const data = await AsyncStorage.getItem('userData');
        if (data) {
          const parsedUser = JSON.parse(data);
          setUser(parsedUser);
          await fetchData();
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error during user check:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    initializeNotifications();
  }, [getCoupons, getOrders, getReservations, setUser]);

  if (isLoading) {
    return (
      <View className="flex-1 dark:bg-gray-900 items-center justify-center px-6">
        <Text className="text-4xl font-extrabold dark:text-white text-blue-600 mb-4">
          🍽️ Restaurant for WooCommerce 🍽️
        </Text>
        <Text className="text-xl dark:text-gray-300 mb-6 text-center">
          Serving you the freshest data, right from the kitchen! 🔄
        </Text>
        <Text className="text-lg dark:text-gray-200 text-center">
          Just a moment... We're prepping everything for your feast! 🍲
        </Text>
        <View className="absolute bottom-10">
          <Text className="text-sm dark:text-gray-500 text-gray-400">
            If it takes too long, grab a snack and relax! 🥨
          </Text>
        </View>
      </View>
    );
  }

  return (
    <GestureHandlerRootView
      style={{flex: 1, backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff'}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isAuthenticated ? 'Drawer' : 'Login'}
          screenOptions={{
            headerStyle: {
              backgroundColor: isDarkMode ? '#1a1a1a' : '#f0f0f0',
            },
            headerTintColor: isDarkMode ? '#ffffff' : '#000000',
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Scanner" component={Scanner} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
