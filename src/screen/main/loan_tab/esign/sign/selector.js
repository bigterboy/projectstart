import { createSelector } from "reselect";
import { Map } from "reducer";
const getLanguage = state => state[Map.LANGUAGE];
const getSplash = state => state[Map.SPLASH];
const getEsignObj = state => state[Map.ESIGN]

export default createSelector(
  [getLanguage, getSplash,getEsignObj],
  (language, splash, esignObj) => ({
    ...language,
    ...splash,
    "objEsign": {...esignObj} 
  })
);
