import { createSelector } from "reselect";
import { Map } from "reducer";
const getLanguage = state => state[Map.LANGUAGE];
const getApp = state => state[Map.APP];
const getUser = state => state[Map.USER];

export default createSelector(
  [getLanguage, getApp, getUser],
  (language, app, user) => ({ ...language, ...app, ...user })
);
