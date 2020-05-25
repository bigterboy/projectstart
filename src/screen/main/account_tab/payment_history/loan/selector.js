import { createSelector } from "reselect";
import { Map } from "reducer";
const getLanguage = state => state[Map.LANGUAGE];
const getUser = state => state[Map.USER];

export default createSelector(
  [getLanguage, getUser],
  (language, user) => ({ ...language, ...user })
);
