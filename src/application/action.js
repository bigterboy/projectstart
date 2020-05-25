import Action from "action";

export const restart = () => ({ type: Action.RESTART });
export const changeLanguage = langCode => ({
  type: Action.CHANGE_LANGUAGE,
  payload: langCode
});

export const logout = () => ({ type: Action.LOGOUT });

/**Refresh param expiredToken */
export const refreshExpiredToken = () => ({
  type: Action.ERROR_TOKEN_EXPIRED,
  payload: false
})

/**
 * Đã show cảnh báo sắp hết hạn password 
 * Disable không show nữa cho tới khi load lại app từ splash screen
 */
export const warnedExpiredPassword = (value) => ({
  type: Action.WARNED_WILL_EXPIRED_PASSWORD,
  payload: value
});

/**
 * Show or Hide modal Register Option
 * @param value: show or hide
 */
export const showModalRegOption = (value) => ({
  type: Action.REGISTER_BY_PHONE_SHOW_REGISTER_OPTION,
  payload: value
});

//Clean all data redux user 
export const cleanDataUserRedux = () => (
  { type: Action.CLEAN_DATA_ALL_USER_REDUX },
  {
    type: Action.UPDATE_READ_ALL_NOTIFICATION,
    payload: false
  },
  {
    type: Action.CLEAR_DATA_USER,
  }
);

/**
 * <Function: dispatch action logout when login with phone>
 * If singing with phone -> logout before login with contract
 */
export const logoutWithPhone = () => ({
  type: Action.REGISTER_BY_PHONE_LOGOUT
});

/**
 *
 */
export const updateNotificationIcon = (value) => ({
  type: Action.UPDATE_READ_ALL_NOTIFICATION,
  payload: value
});

/**
 * Save device biometric type
 * @param {*} type 
 */
export const biometricType = (type) => ({
  type: Action.BIOMETRIC_TYPE,
  payload: type
})

/**
 * Save base64 Policy Esign document
 * @param {*} strBase64 
 */
export const saveBase64PolicyEsign = strBase64 => ({
  type: Action.SPLASH_SAVE_BASE64_POLICY_ESIGN,
  payload: strBase64
});

/**
 * Save base64 Policy Document
 * @param {*} strBase64 
 */
export const saveBase64Policy = strBase64 => ({
  type: Action.SPLASH_SAVE_BASE64_POLICY,
  payload: strBase64
});

/**Refresh param expiredPassword 
 * Dùng để refresh lại state expired password
*/
// export const refreshExpiredPass = () => ({
//   type: Action.ERROR_PASSWORD_EXPIRED,
//   payload: false
// })

export const showExpiredPass = (expiredType) => ({
  type: Action.ERROR_PASSWORD_EXPIRED,
  payload: {
    expiredPassword: true,
    expiredPasswordType: expiredType,
  }
})

export const refreshExpiredPass = () => ({
  type: Action.REFRESH_ERROR_PASSWORD_EXPIRED
})
