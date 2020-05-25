import { connect } from "react-redux";
import * as Actions from "./action";
import LoginScreen from "./screen";
import getLoginState from "./selector";
const mapStateToProps = state => getLoginState(state);
export default connect(
  mapStateToProps,
  Actions
)(LoginScreen);
