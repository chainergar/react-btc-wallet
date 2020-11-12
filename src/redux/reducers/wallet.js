import { SET_WALLET_KEYS, SET_BTC_BALANCE } from '../actions/wallet';

const initialState = {
  keys: {},
  balance: {
    balance: 0
  }
};

const walletReducer = (previousState = initialState, action) => {
  switch (action.type) {
    case SET_WALLET_KEYS:
      return {
        ...previousState,
        keys: action.payload,
      };
    case SET_BTC_BALANCE:
      return {
        ...previousState,
        balance: action.payload,
      };
    default:
      return previousState;
  }
};

export { walletReducer };
