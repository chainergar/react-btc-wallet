import { SET_AUTH, SET_EMAIL } from '../actions/auth';

const initialState = {
  auth: false,
  email: null,
};

const authReducer = (previousState = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...previousState,
        auth: action.payload,
      };
    case SET_EMAIL:
      return {
        ...previousState,
        email: action.payload,
      };
    default:
      return previousState;
  }
};

export { authReducer };
