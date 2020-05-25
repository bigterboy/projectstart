import { createSelector } from "reselect";
import { Map } from "reducer";
const getSplash = state => state[Map.SPLASH]
const getApp = state => state[Map.APP];
const getUser = state => state[Map.USER]
const getLoginPhone = state => state[Map.LOGIN_BY_PHONE] 
const getPopularErrors = state => state[Map.POPULAR_ERRORS]

export default createSelector(
  [getSplash, getApp, getUser, getLoginPhone, getPopularErrors],
  (splash, app, user, loginPhone, popularErrors) => ({
    "isWarnedPassword": splash.isWarnedPassword,
    ...loginPhone,
    ...app,
    ...user,
    "popularErrors":{
      ...popularErrors
    }
  })
);
