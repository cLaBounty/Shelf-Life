import PushNotification from "react-native-push-notification";

const showNotification = (title, message) => {
    PushNotification.localNotification({
        channelId: 'Shelf-Life-id',
        title: title,
        message: message
    });
}

const scheduleNotification = (title, message, date) => {
    PushNotification.localNotificationSchedule({
        channelId: 'Shelf-Life-id',
        title: title,
        message: message,
        date: date
    });
}

export { showNotification, scheduleNotification }; 