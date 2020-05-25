/**
 * Use for Android when modal not fullscreen
 */

import React, { Component } from "react";
import { StyleSheet, StatusBar, Platform } from "react-native";

export default class StatusBarCustom extends Component {
  render() {
    return Platform.OS === "ios" ? null : (
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
    );
  }
}

const styles = StyleSheet.create({});
