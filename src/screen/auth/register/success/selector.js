import { createSelector } from "reselect";
import { Map } from "reducer";
const getLanguage = state => state[Map.LANGUAGE];
const getSplash = state => state[Map.SPLASH];
const getUser = state => state[Map.USER];
const getApp = state => state[Map.APP];

export default createSelector(
  [getLanguage, getSplash, getUser, getApp],
  (language, splash, user, app) => ({
    ...language,
    ...splash,
    ...user,
    ...app
  })
);
