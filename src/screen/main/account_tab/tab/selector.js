import { createSelector } from "reselect";
import { Map } from "reducer";
const getLanguage = state => state[Map.LANGUAGE];
const getSplash = state => state[Map.SPLASH];
const getUser = state => state[Map.USER];
const getApp = state => state[Map.APP];
const getLoginPhone = state => state[Map.LOGIN_BY_PHONE]


export default createSelector(
  [getLanguage, getSplash, getUser, getApp, getLoginPhone],
  (language, splash, user, app, loginPhone) => ({ 
    ...language, 
    ...splash, 
    ...user, 
    ...app,
    ...loginPhone
  })
);
