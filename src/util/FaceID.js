//This class using for touch ID and FaceID
import TouchID from 'react-native-touch-id';



const config = {
    // title: 'Authentication Required', // Android
    // imageColor: '#e00606', // Android
    // imageErrorColor: '#ff0000', // Android
    // sensorDescription: 'Touch sensor', // Android
    // sensorErrorDescription: 'Failed', // Android
    // cancelText: 'Sử dụng mật khẩu', // Android
    // fallbackLabel: 'Dùng mã pin', // iOS (if empty, then label is hidden)
    fallbackLabel: "",
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};


export default class FaceID {

    static getErrorBy(errorName) {
        switch (errorName) {
            case "LAErrorAuthenticationFailed":
                return {
                    isError: true,
                    message: "Authentication was not successful because the user failed to provide valid credentials."
                }
            case "LAErrorUserCancel":
                return {
                    isError: true,
                    message: ""//"Authentication was canceled by the user—for example, the user tapped Cancel in the dialog."
                }
            case "LAErrorUserFallback":
                return {
                    isError: false,
                    message: "Authentication was canceled because the user tapped the fallback button (Enter Password)."
                }
            case "LAErrorSystemCancel":
                return {
                    isError: true,
                    message: "Authentication was canceled by system—for example, if another application came to foreground while the authentication dialog was up."
                }
            case "LAErrorPasscodeNotSet":
                return {
                    isError: true,
                    message: "Authentication could not start because the passcode is not set on the device."
                }
            case "LAErrorTouchIDNotAvailable":
                return {
                    isError: true,
                    message: "Authentication could not start because Touch ID is not available on the device"
                }
            case "LAErrorTouchIDNotEnrolled":
                return {
                    isError: true,
                    message: "Authentication could not start because Touch ID has no enrolled fingers."
                }
            case "LAErrorTouchIDLockout":
                return {
                    isError: true,
                    message: "Authentication failed because of too many failed attempts."
                }
            case "RCTTouchIDUnknownError":
                return {
                    isError: true,
                    message: "Could not authenticate for an unknown reason."
                }
            case "RCTTouchIDNotSupported":
                return {
                    isError: true,
                    message: "Device does not support Touch ID."
                }
            default:
                return {
                    isError: true,
                    message: "Lỗi không xác định. Vui lòng thử lại."
                }
        }
    }

    static isSupported = async () => {
        return await TouchID.isSupported()
            .then(biometryType => {
                if (biometryType === 'FaceID') {
                    console.log('FaceID is supported.');
                    return 1
                } else if (biometryType === 'TouchID') {
                    console.log('TouchID is supported.');
                    return 2
                } else if (biometryType === true) {
                    // Touch ID is supported on Android
                    return 3
                } else {
                    return -1
                }
            })
            .catch(error => {
                console.log("FaceID check support error: " + error)
                return -1
            });
    }

    static auth = (callback) => {

        TouchID.isSupported()
            .then(biometryType => {
                // Success code
                if (biometryType === 'FaceID') {
                    FaceID.authenticate(callback)
                } else {
                    FaceID.authenticate(callback)
                }

                // if (biometryType === 'FaceID') {
                //     console.log('FaceID is supported.');
                // } else if (biometryType === 'TouchID') {
                //     console.log('TouchID is supported.');
                // } else if (biometryType === true) {
                //     // Touch ID is supported on Android
                // }
            })
            .catch(error => {
                console.log("FaceID check support error: " + error)
            });
    }

    static authenticate = (callback) => {
        return TouchID.authenticate("Nhận diện vân tay", config)
            .then((success) => {
                console.log("FaceID success: " + success)
                let errorMessage = ""
                if (success) {
                    if (callback) {
                        callback({ isError: false, message: errorMessage })
                    }
                } else {
                    errorMessage = "Lỗi không xác định. Vui lòng thử lại."
                    callback({ isError: true, message: errorMessage })

                }
            })
            .catch(error => {
                callback(FaceID.getErrorBy(error.name))
                console.log("FaceID authenticate error: " + error.name)
            });
    }
}