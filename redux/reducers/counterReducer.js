const INIT_STATE = {
  counter: 0,
  counterTemper: 0,
  counter2: {test1: 0, test2: 2},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'INCREASE':
      return {
        ...state,
        counter: state.counter + action.payload,
        counter2: {test1: state.counter2.test1 + 1, test2: 4},
      };

    case 'DECREASE':
      return {...state, counter: state.counter - 1};
    default:
      return state;
  }
};
