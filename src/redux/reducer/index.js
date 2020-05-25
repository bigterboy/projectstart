import { combineReducers } from "redux";
import Map from "./Map";
import App from "./App";
import Language from "./Language";
import Splash from "./Splash";
import Login from "./Login";
import Update from "./Update";
import User from "./User";
import Esign from "./Esign"
import DataScreen from "./DataScreen";
import PopularErrors from "./PopularErrors"
import LoginPhone from "./LoginPhone"
import RegisterOption from "./RegisterOption"

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
const persistConfigApp = {
  key: "app",
  storage: storage,
  stateReconciler: autoMergeLevel2
};
const persistConfigLanguage = {
  key: "language",
  storage: storage,
  stateReconciler: autoMergeLevel2
};
const persistLoginByPhone = {
  key: "loginByPhone",
  storage: storage,
  stateReconciler: autoMergeLevel2
}

const persistUser = {
  key: "user",
  storage: storage,
  stateReconciler: autoMergeLevel2
}

const reducers = {
  [Map.APP]: persistReducer(persistConfigApp, App),
  [Map.LANGUAGE]: persistReducer(persistConfigLanguage, Language),
  [Map.LOGIN_BY_PHONE]: persistReducer(persistLoginByPhone, LoginPhone),

  [Map.SPLASH]: Splash,
  [Map.LOGIN]: Login,
  [Map.UPDATE]: Update,
  [Map.USER]: persistReducer(persistUser, User),
  [Map.ESIGN] : Esign,
  [Map.DATASCREEN]: DataScreen,
  [Map.POPULAR_ERRORS]: PopularErrors,
  [Map.REGISTER_OPTION]: RegisterOption
};

export default combineReducers(reducers);
export { Map };
