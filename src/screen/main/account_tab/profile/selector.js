import { createSelector } from "reselect";
import { Map } from "reducer";
const getLanguage = state => state[Map.LANGUAGE];
const getUpdate = state => state[Map.UPDATE];
const getApp = state => state[Map.APP];
const getUser = state => state[Map.USER];

export default createSelector(
  [getLanguage, getUpdate, getApp, getUser],
  (language, update, app, user) => ({ ...language, ...update, ...app, ...user })
);
