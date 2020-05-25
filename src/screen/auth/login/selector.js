import { createSelector } from "reselect";
import { Map } from "reducer";
const getAuth = state => state[Map.LOGIN];
const getApp = state => state[Map.APP];
const getLanguage = state => state[Map.LANGUAGE];
const getSplash = state => state[Map.SPLASH];
const getUser = state => state[Map.USER];

export default createSelector(
  [getAuth, getApp, getLanguage, getSplash, getUser],
  (auth, app, language, splash, user) => ({
    ...auth,
    ...app,
    ...language,
    ...splash,
    ...user
  })
);
