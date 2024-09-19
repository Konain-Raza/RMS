import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Alert, View, useColorScheme} from 'react-native';
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
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="dashboard-line" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={Orders}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="restaurant-line" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Coupons"
        component={Coupons}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="coupon-line" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Reservations"
        component={Reservations}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="table-line" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log('fetchOrders');

        await getOrders();
        console.log('fetchCoupons');

        await getCoupons();
        console.log('fetchDashboard');

        await getDashboardData();
    console.log('reserva');

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
          await fetchOrders();
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error during user check:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator
          size="large"
          color={isDarkMode ? '#ffffff' : '#0000ff'}
        />
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
