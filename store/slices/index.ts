import { combineReducers } from 'redux';
import user from './user-slice';
import module from './module-slice';

export default combineReducers({
  user,
  module,
});
