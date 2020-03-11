import {createSelector} from 'reselect';

// Có 2 cách viết state.counterReducer = state["counterReducer"]
const getApp = state => state.counterReducer;

export default createSelector(
  [getApp],
  app => ({...app}),
);
