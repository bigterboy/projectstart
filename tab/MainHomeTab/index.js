import {connect} from 'react-redux';
import Screen from './screen';
import getState from './selector';
import getAction from './action';

const mapStateToProps = state => getState(state);
const mapDispatchToProps = dispatch => getAction(dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen);
