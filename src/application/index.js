import { connect } from "react-redux";
import * as Actions from "./action";
import Application from "./Application";
import getAppState from "./selector";
const mapStateToProps = state => getAppState(state);
export default connect(
  mapStateToProps,
  Actions
)(Application);
