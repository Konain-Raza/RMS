import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
};

export const getFcmToken = async () => {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token; 
};

export const handleBackgroundMessage = async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
};

export const setupForegroundMessageHandler = () => {
    messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', remoteMessage);
        Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
    });
};

export const setupBackgroundMessageHandler = () => {
    messaging().setBackgroundMessageHandler(handleBackgroundMessage);
};

export const initializeNotifications = async () => {
    await requestUserPermission();
    const token = await getFcmToken();
    setupForegroundMessageHandler();
    setupBackgroundMessageHandler();
};

