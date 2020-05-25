
import Form from './Form'
import { connect } from "react-redux";
import * as Actions from "../../tab/action";
import getState from "../selector";
const mapStateToProps = state => getState(state);

const FormComplete = connect(
    mapStateToProps,
    Actions
)(Form);

export {
    FormComplete
}