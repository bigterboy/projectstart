import { createSelector } from "reselect";
import { Map } from "reducer";
const getLanguage = state => state[Map.LANGUAGE];
const getUser = state => state[Map.USER];
const getApp = state => state[Map.APP];
const getPopularErrors = state => state[Map.POPULAR_ERRORS]

export default createSelector(
  [getLanguage, getUser, getApp, getPopularErrors],
  (language, user, app, popularErrors) => ({
    ...language,
    ...user,
    ...app,
    "popularErrors": {
      ...popularErrors
    },
  })
);
