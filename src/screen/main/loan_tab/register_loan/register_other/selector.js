import { createSelector } from "reselect";
import { Map } from "reducer";
const getLanguage = state => state[Map.LANGUAGE];

export default createSelector(
  [getLanguage],
  language => ({ ...language })
);
