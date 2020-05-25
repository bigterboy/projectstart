//Sử dụng để handle một số errors đặc trưng của app(401, 423)
// ERROR_TIME_OUT:"ERROR_TIME_OUT",
//   ERROR_PASSWORD_EXPIRED:"ERROR_PASSWORD_EXPIRED",
//   ERROR_TOKEN_EXPIRED:"ERROR_TOKEN_EXPIRED"
import Action from "action";

export default function (
    state = {
        expiredToken: false,
        expiredPassword: false,
        expiredPasswordType: null,
        requestTimeout: false
    },
    action
) {
    switch (action.type) {
        case Action.ERROR_TOKEN_EXPIRED:
            return { expiredToken: action.payload };
        case Action.ERROR_PASSWORD_EXPIRED:
            return {
                expiredPassword: action.payload.expiredPassword,
                expiredPasswordType: action.payload.expiredPasswordType,
            };
        case Action.ERROR_TIME_OUT:
            return { requestTimeout: true }

        case Action.REFRESH_ERROR_PASSWORD_EXPIRED:
            return{
                expiredPassword: false,
                expiredPasswordType: null
            }
        default:
            return state;
    }
}
