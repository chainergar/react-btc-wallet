const SET_AUTH = 'SET_AUTH';
const SET_EMAIL = 'SET_EMAIL';

const setAuth = (data) => {
  return {
    type: SET_AUTH,
    payload: data,
  };
};

const setEmail = (data) => {
  return {
    type: SET_EMAIL,
    payload: data,
  };
};

export {
  SET_AUTH,
  SET_EMAIL,
  setAuth,
  setEmail
};
