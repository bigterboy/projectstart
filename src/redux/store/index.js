import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2,
};

import {createStore,applyMiddleware} from 'redux';
import reducers from 'reducer';
import logger from 'redux-logger'
import thunk from "redux-thunk";
const middlewares = [
  thunk,
  logger,
];

// const pReducer = persistReducer(persistConfig, reducers);
export const store=createStore(
  reducers,
  applyMiddleware(...middlewares)
);

export const persistor = persistStore(store);
