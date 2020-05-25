
import Form from './Form'
import FormBank from './FormBank'

import { connect } from "react-redux";
import * as Actions from "../../tab/action";
import getState from "../selector";
const mapStateToProps = state => getState(state);
const OverviewForm = connect(
  mapStateToProps,
  Actions
)(Form);

const OverviewFormBank = connect(
    mapStateToProps,
    Actions
)(FormBank);

export {
    OverviewForm,
    OverviewFormBank
}