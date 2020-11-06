import { combineReducers } from 'redux';
import { authReducer } from './reducers/auth';
import { walletReducer } from './reducers/wallet';

export default combineReducers({
  auth: authReducer,
  wallet: walletReducer
})