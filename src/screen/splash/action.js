import Action from "action";

export const biometricType = (type) => ({
  type: Action.BIOMETRIC_TYPE,
  payload:type
})

export const createEsignObj = data => ({
  type: Action.UPDATE_ESIGN_OBJECT,
  payload: data
});

export const saveBase64PolicyEsign = strBase64 => ({
  type: Action.SPLASH_SAVE_BASE64_POLICY_ESIGN,
  payload: strBase64
});

export const saveBase64Policy = strBase64 => ({
  type: Action.SPLASH_SAVE_BASE64_POLICY,
  payload: strBase64
});


