import { createSelector } from "reselect";
import { Map } from "reducer";
const getLanguage = state => state[Map.LANGUAGE];
const getEsignObj = state => state[Map.ESIGN]

export default createSelector(
  [getLanguage, getEsignObj],
  (language, esignObj) => ({ 
    ...language,
    "objEsign": {...esignObj} })
);
