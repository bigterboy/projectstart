import { connect } from "react-redux";
import * as Actions from "../tab/action";
import Screen from "./screen";
import getState from "./selector";
const mapStateToProps = state => getState(state);
export default connect(
  mapStateToProps,
  Actions
)(Screen);
