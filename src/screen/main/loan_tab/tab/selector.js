import { createSelector } from "reselect";
import { Map } from "reducer";
const getLanguage = state => state[Map.LANGUAGE];
const getApp = state => state[Map.APP];
const getUser = state => state[Map.USER];
const getLoginPhone = state => state[Map.LOGIN_BY_PHONE]
export default createSelector(
  [getLanguage, getApp, getUser, getLoginPhone],
  (language, app, user, loginPhone) => ({
    ...language,
    ...app,
    ...user,
    ...loginPhone
  })
);
