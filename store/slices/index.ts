import { combineReducers } from 'redux';
import user from './user-slice';
import module from './module-slice';
import creative from './creative-slice';

export default combineReducers({
  user,
  module,
  creative,
});
