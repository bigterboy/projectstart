import Action from "action";
export default function (
    state = {
        isLoginPhone: false,
        regPhoneNumber: ""  //Phone Number using for login by Phone
    },
    action
) {
    switch (action.type) {
        case Action.REGISTER_BY_PHONE_LOGIN_SUCCESS:
            return {
                ...state,
                isLoginPhone: true,
                regPhoneNumber: action.payload
            };
        case Action.REGISTER_BY_PHONE_LOGOUT:
            return {
                ...state,
                isLoginPhone: false,
                regPhoneNumber: ""
            };
        default:
            return state;
    }
}
