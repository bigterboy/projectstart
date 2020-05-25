import { createSelector } from "reselect";
import { Map } from "reducer";
const getApp = state => state[Map.APP];
const getLanguage = state => state[Map.LANGUAGE];

export default createSelector(
  [getApp, getLanguage],
  (app, language) => ({ ...app, ...language })
);
