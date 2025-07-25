import { Store } from 'react-notifications-component';

const ToastHandle = (message, type) => {
    Store.addNotification({
        message: message,
        type: type, // 'success' | 'danger' | 'info' | 'default' | 'warning'
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 1000,
            onScreen: true,
        },
    });
};


export default ToastHandle;
