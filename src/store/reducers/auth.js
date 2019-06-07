import {
  SIGNIN_USER_SUCCESS, SIGNOUT_USER_SUCCESS, ON_SHOW_LOADER, ON_HIDE_LOADER,
} from '../constants/auth';

export const initialState = {
  showLoginLoader: false,
  authUser: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ON_SHOW_LOADER: {
      return {
        ...state,
        ...{ showLoginLoader: true },
      };
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        ...{ showLoginLoader: false },
      };
    }
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        ...{ showLoginLoader: false, authUser: action.payload },
      };
    }
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        ...{ showLoginLoader: false, authUser: null },
      };
    }
    default:
      return state;
  }
}

export default reducer;
