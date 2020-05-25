import { createSelector } from "reselect";
import { Map } from "reducer";
const getApp = state => state[Map.APP];

export default createSelector(
  [getApp],
  app => app
);
