import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Alert, View, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import OrderDetails from './src/screens/OrderDetails';
import Scanner from './src/screens/Scanner';
import useStore from './store';
import Coupons from './src/screens/Coupons';
import Reservations from './src/screens/Reservations';
import CustomDrawerContent from './src/components/DrawerHeader';
import { DashboardIcon } from './src/assets/icons/icons';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const {setUser, orders, getCoupons, getOrders, getReservations} = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const DrawerNavigator = () => (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff', // Dark mode background color
        },
        drawerActiveTintColor: isDarkMode ? '#ffffff' : '#000000', // Active tint color
        drawerInactiveTintColor: isDarkMode ? '#b3b3b3' : '#4f4f4f', // Inactive tint color
        headerStyle: {
          backgroundColor: isDarkMode ? '#1a1a1a' : '#f0f0f0', // Header background color
        },
        headerTintColor: isDarkMode ? '#ffffff' : '#000000', // Header text color
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Drawer.Screen
        name="Home"
        // style={{backgroundColor:"red"}}
        component={Home}
        initialParams={{orders}}
        // options={{
        //   drawerIcon: ({color, size}) => (
        //     <DashboardIcon color={color} size={size} /> // Use your custom DashboardIcon here
        //   ),
        // }}
      />
      <Drawer.Screen name="Coupons" component={Coupons} />
      <Drawer.Screen name="Reservations" component={Reservations} />
    </Drawer.Navigator>
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await getOrders();
        await getCoupons();
        await getReservations();
      } catch (error) {
        console.log('Error fetching data:', error);
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
        } else {
          console.log('No user data found');
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
      <View className="flex-1 dark:bg-dark items-center justify-center">
        <ActivityIndicator
          size="large"
          color={isDarkMode ? '#ffffff' : '#0000ff'}
        />
      </View>
    );
  }

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff', // Correct conditional background color
      }}>
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
