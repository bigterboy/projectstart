import React, { Component } from "react";
import {
  StyleSheet,
  Animated,
  BackHandler,
  Text,
  TouchableOpacity,
  Dimensions,
  ToastAndroid
} from "react-native";

let { width, height } = Dimensions.get("window");

const Toast = (props) => {
  if (props.visible) {
    ToastAndroid.showWithGravityAndOffset(
      props.message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    return null;
  }
  return null;
};


export default class BackHandlerExitApp extends Component {
  state = {
    backClickCount: 0
  };

  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(100);
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  };

  _spring() {
    this.setState({ backClickCount: 1 }, () => {
      Animated.sequence([
        Animated.spring(this.springValue, {
          toValue: 1,
          friction: 5,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(this.springValue, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true
        })
      ]).start(() => {
        this.setState({ backClickCount: 0 });
      });
    });
  }
  handleBackButton = () => {
    this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();

    return true;
  };


  
  render() {
    return (
      <Animated.View
        style={[
          styles.animatedView,
          { transform: [{ translateY: this.springValue }] }
        ]}
      >
        <Text style={styles.exitTitleText}>
          Chạm lần nữa để thoát app
        </Text>

        <Toast/>

        {/* <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => BackHandler.exitApp()}
        >
          <Text style={styles.exitText}>Exit</Text>
        </TouchableOpacity> */}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  animatedView: {
    width,
    backgroundColor: "black",
    elevation: 2,
    position: "absolute",
    bottom: 0,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  exitTitleText: {
    textAlign: "center",
    color: "#ffffff",
    //marginRight: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  exitText: {
    color: "#e5933a",
    paddingHorizontal: 10,
    paddingVertical: 3
  }
});

