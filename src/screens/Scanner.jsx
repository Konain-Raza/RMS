// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Alert,
//   TouchableOpacity,
//   Text,
//   ActivityIndicator,
// } from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import {RNCamera} from 'react-native-camera';
// import {useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import Icon from 'react-native-remix-icon';

// const Scanner = () => {
//   const navigation = useNavigation();
//   const [cameraType, setCameraType] = useState('back');
//   const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off);
//   const [scannedData, setScannedData] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (url, username, password) => {
//     setLoading(true);
//     try {
//       const baseURL = url;
//       const endpoint = `${baseURL}/wp-json/wp/v2/users/me`;
//       const response = await axios({
//         method: 'GET',
//         url: endpoint,
//         auth: {
//           username: username,
//           password: password,
//         },
//       });
//       if (response.status === 200) {
//         const user = response.data;
//         const data = {
//           image: user.avatar_urls['96'],
//           name: user?.name,
//           url: user?.url,
//         };
//         if (user?.is_super_admin) {
//           console.log('Logged in successfully', data);
//           await AsyncStorage.setItem('userData', JSON.stringify(data));
          
//           navigation.navigate('Home', data);
//         }
//       } else {
//         console.error('Failed to log in', response.status);
//       }
//     } catch (error) {
//       console.error('Error during login', error);
//     } finally {
 
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (scannedData) {
//       const [url, username, password] = scannedData.split('|');
//       console.log(url, username, password);
//       handleLogin(url, username, password);
//       setScannedData('');
//     }
//   }, [scannedData]);

//   const toggleFlash = () => {
//     setFlashMode(
//       flashMode === RNCamera.Constants.FlashMode.off
//         ? RNCamera.Constants.FlashMode.torch
//         : RNCamera.Constants.FlashMode.off,
//     );
//   };

//   const switchCamera = () => {
//     setCameraType(cameraType === 'back' ? 'front' : 'back');
//   };

//   return (
//     <View className="flex-1 items-center justify-center">
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <>
//           <QRCodeScanner
//             onRead={({data}) => {
//               if (!loading) {
//                 setScannedData(data);
//               }
//             }}
//             reactivate={!loading}
//             reactivateTimeout={2000}
//             containerStyle={{width: '100%', height: '100%'}}
//             cameraStyle={{width: '100%', height: '100%'}}
//             showMarker={true}
//             flashMode={flashMode}
//             cameraType={cameraType}
//             markerStyle={{borderColor: '#39FF14', borderWidth: 4}}
//           />

//           <View className="absolute bottom-4 left-4 right-4 flex-row justify-between items-center">
//             <TouchableOpacity
//               onPress={switchCamera}
//               className="bg-gray-700 p-4 rounded-2xl">
//               <Icon name="camera-switch-fill" size={20} color="#fff" />
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={toggleFlash}
//               className={`${
//                 flashMode === RNCamera.Constants.FlashMode.off
//                   ? 'bg-gray-700'
//                   : 'bg-yellow-300'
//               } p-4 rounded-2xl`}>
//               <Icon
//                 name={
//                   flashMode === RNCamera.Constants.FlashMode.off
//                     ? 'lightbulb-line'
//                     : 'lightbulb-fill'
//                 }
//                 size={20}
//                 color="#fff"
//               />
        
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//     </View>
//   );
// };

// export default Scanner;

import { View, Text } from 'react-native'
import React from 'react'

const Scanner = () => {
  return (
    <View style={{flex: 1}}>
      <Text>Scanner</Text>
    </View>
  )
}

export default Scanner