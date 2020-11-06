const SET_WALLET_KEYS = 'SET_WALLET_KEYS';
const SET_BTC_BALANCE = 'SET_BTC_BALANCE';

const setWalletKeys = (data) => {
  return {
    type: SET_WALLET_KEYS,
    payload: data,
  };
};

const setBtcBalance = (data) => {
  return {
    type: SET_BTC_BALANCE,
    payload: data,
  };
};

export {
  SET_WALLET_KEYS,
  SET_BTC_BALANCE,
  setWalletKeys,
  setBtcBalance,
};
