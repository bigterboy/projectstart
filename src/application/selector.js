import { createSelector } from "reselect";
import { Map } from "reducer";
const getApp = state => state[Map.APP];
const getLanguage = state => state[Map.LANGUAGE];
const getPopularErrors = state => state[Map.POPULAR_ERRORS]
const getRegisterOption = state => state[Map.REGISTER_OPTION]
const getLoginPhone = state => state[Map.LOGIN_BY_PHONE]
const getUser = state => state[Map.USER]


export default createSelector(
  [getApp, getLanguage, getPopularErrors, getRegisterOption, getLoginPhone, getUser],
  (app, language, popularErrors, registerOption, loginPhone, user) => ({ 
    ...app, 
    ...language,
    "popularErrors":{
      ...popularErrors
    },
    ...registerOption,
    ...loginPhone,
    ...user
  })
);
