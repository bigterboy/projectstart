import { createSelector } from "reselect";
import { Map } from "reducer";
const getLanguage = state => state[Map.LANGUAGE];
const getUser = state => state[Map.USER];
const getApp = state => state[Map.APP];
const getDataScreen = state => state[Map.DATASCREEN];
const getLoginPhone = state => state[Map.LOGIN_BY_PHONE]

export default createSelector(
  [getLanguage, getUser, getApp, getDataScreen,getLoginPhone],
  (language, user, app, datascreen, loginPhone) => ({
    ...language,
    ...user,
    ...app,
    ...datascreen,
    ...loginPhone
  })
);
