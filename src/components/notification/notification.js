import { notification } from 'antd'

const openNotificationSuccess = message => {
    notification.success({
        message: message,
    });
};

const openNotificationFaliure = message => {
    notification.error({
        message: message,
    });
};

const Notification = {
	openNotificationSuccess,
    openNotificationFaliure
};

export default Notification;