//This reducer only user for show Modal Register Option when user no login

import Action from "action";
export default function (
    state = {
        isShowRegOption: false,
    },
    action
) {
    switch (action.type) {
        case Action.REGISTER_BY_PHONE_SHOW_REGISTER_OPTION:
            return {
                ...state,
                isShowRegOption: action.payload
            };
        default:
            return state;
    }
}
