import { createSelector } from "reselect";
import { Map } from "reducer";
const getLanguage = state => state[Map.LANGUAGE];
const getApp = state => state[Map.APP];
const getLoginPhone = state => state[Map.LOGIN_BY_PHONE]
const getUser = state => state[Map.USER]

export default createSelector(
  [getLanguage, getApp, getLoginPhone, getUser],
  (language, app, loginPhone, user) => ({
    ...language,
    ...app,
    ...loginPhone,
    ...user
  })
);
