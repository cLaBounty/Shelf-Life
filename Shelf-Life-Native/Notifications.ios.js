import PushNotificationIOS from '@react-native-community/push-notification-ios';

const showNotification = (title, message) => {
    PushNotificationIOS.presentLocalNotification({
        id: new Date().toISOString(),
        alertTitle: title,
        alertBody: message
    });
}

const scheduleNotification = (title, message, date) => {
    PushNotificationIOS.scheduleLocalNotification({
        id: date.toISOString(),
        alertTitle: title,
        alertBody: message,
        fireDate: date.toISOString()
    });
}

export { showNotification, scheduleNotification };