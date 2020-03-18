import action from 'action';
import Network from 'network';

const getAPI = () => {
  return Network.NEWS_HOME().then(response => {
    return response;
  });
};

const Increase = dispatch => {
  dispatch(action.count.counterIncrease());
};

function mapDispatchToProps(dispatch) {
  return {
    handleIncrease: () => Increase(dispatch),
    getAPI: () => getAPI(),
    //handleDecrease: () => dispatch(count.counterDecrease()),
  };
  //return null; // if don't have any action
}

export default mapDispatchToProps;
