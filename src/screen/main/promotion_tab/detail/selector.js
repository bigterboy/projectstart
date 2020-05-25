import { createSelector } from "reselect";
import { Map } from "reducer";
const getLanguage = state => state[Map.LANGUAGE];
const getApp = state => state[Map.APP];

export default createSelector(
  [getLanguage,getApp],
  (language,app) => ({ ...language,...app })
);


