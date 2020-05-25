import { createSelector } from "reselect";
import { Map } from "reducer";
const getApp = state => state[Map.APP];
const getLanguage = state => state[Map.LANGUAGE];
const getUser = state => state[Map.USER];
export default createSelector(
  [getApp, getLanguage, getUser],
  (app, language, user) => ({ ...app, ...language, ...user })
);
