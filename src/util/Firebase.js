import firebase from 'react-native-firebase';
import LocalStorage from "middleware/helper/LocalStorage";

export default class Firebase {
    /**
     * Check Permission
     */
    static async checkPermission(fnCallback) {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            Firebase.getToken(fnCallback);
        } else {
            // user doesn't have permission
            Firebase.requestPermission(fnCallback);
        }
    }

    /**
     * Get Firebase Token
     * @param {*} fnCallback 
     */
    static async getToken(fnCallback) {
        let fcmToken = await LocalStorage.getFcmToken();
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                await LocalStorage.saveFcmToken(fcmToken)
                if (fnCallback) fnCallback()
            }
        }else{
            if (fnCallback) fnCallback()
        }
    }

    /**
     * Request Permission
     */
    static async requestPermission(fnCallback) {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            Firebase.getToken(fnCallback);
        } catch (error) {
            // User has rejected permissions
            console.log('USER REJECT PERMISSIONS NOTIFICATION');
        }
    }
}