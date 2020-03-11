import action from 'action';

const Increase = dispatch => {
  dispatch(action.count.counterIncrease());
  //console.log('GIA TRI CUA COUNT LA: ', action);
};

function mapDispatchToProps(dispatch) {
  return {
    handleIncrease: () => Increase(dispatch),
    //handleDecrease: () => dispatch(count.counterDecrease()),
  };
  //return null; // if don't have any action
}

export default mapDispatchToProps;

// export default createSelector(
//   [mapDispatchToProps],
//   actions => ({...actions}),
// );
