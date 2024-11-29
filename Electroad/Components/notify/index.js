import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform, Alert } from 'react-native';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export const schedulePushNotification = async (title, body) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: { seconds: 5 },
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
    Alert.alert('Error', 'Failed to schedule the notification.');
  }
};


export const registerForPushNotificationsAsync = async () => {
  let token;
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Permission Denied', 'Failed to get push token for notifications.');
        return null;
      }

      if (Constants.easConfig?.projectId) {
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId: Constants.easConfig.projectId,
          })
        ).data;
      } else {
        token = (await Notifications.getExpoPushTokenAsync()).data;
      }
      console.log('Push token:', token);
    } else {
      Alert.alert('Device Required', 'Push notifications require a physical device.');
    }
  } catch (error) {
    console.error('Error during push token registration:', error);
    Alert.alert('Error', 'Something went wrong during token registration.');
  }
  return token;
};
