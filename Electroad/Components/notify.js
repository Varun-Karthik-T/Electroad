import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Failed to get push token for push notification!");
    return;
  }

  return finalStatus === "granted";
}

export async function schedulePushNotification(title, body) {
  try {
    // Request permissions first
    const hasPermission = await registerForPushNotificationsAsync();

    if (!hasPermission) {
      console.log("Notification permission not granted");
      return;
    }

    // Schedule notification
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: { data: "booking confirmation" },
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: { seconds: 1 }, // Show immediately after 1 second
    });

    console.log("Notification scheduled with ID:", id);
    return id;
  } catch (error) {
    console.error("Error scheduling notification:", error);
    throw error;
  }
}

export async function cancelAllScheduledNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
