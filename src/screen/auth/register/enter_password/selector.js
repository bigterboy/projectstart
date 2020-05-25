import { createSelector } from "reselect";
import { Map } from "reducer";
const getLanguage = state => state[Map.LANGUAGE];
const getSplash = state => state[Map.SPLASH]

export default createSelector(
  [getLanguage,getSplash],
  (language, splash) => ({ ...language, ...splash })
);
