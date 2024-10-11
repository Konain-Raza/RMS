/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';

// Request permission for notifications
const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

// Main component to handle notifications
const Main = () => {
  useEffect(() => {
    requestUserPermission();

    // Handle background messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        console.log('Device FCM Token:', token);
      });

    // Listen for foreground messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
    });

    return unsubscribe; // Cleanup listener on unmount
  }, []);

  return <App />;
};

AppRegistry.registerComponent(appName, () => Main);
