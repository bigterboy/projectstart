import { createSelector } from "reselect";
import { Map } from "reducer";
const getLanguage = state => state[Map.LANGUAGE];
const getApp = state => state[Map.APP];
const getLoginPhone = state => state[Map.LOGIN_BY_PHONE]

export default createSelector(
  [getLanguage, getApp, getLoginPhone],
  (language, app, loginPhone) => ({ ...language, ...app, ...loginPhone })
);
