import { connect } from "react-redux";
import * as Actions from "./action";
import SplashScreen from "./screen";
import getSplashState from "./selector";
const mapStateToProps = state => getSplashState(state);
export default connect(
  mapStateToProps,
  Actions
)(SplashScreen);
