const INIT_STATE = {
  isLogin: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {...state, isLogin: true};

    case 'LOG_OUT':
      return {...state, isLogin: false};
    default:
      return state;
  }
};
