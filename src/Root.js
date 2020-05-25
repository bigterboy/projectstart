import React, { Component } from "react";
import { Provider } from "react-redux";
import Application from "./application";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "store";
import { LoadingApp } from "component";

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<LoadingApp />} persistor={persistor}>
          <Application />
        </PersistGate>
      </Provider>
    );
  }
}
