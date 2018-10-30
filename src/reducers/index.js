import { combineReducers } from 'redux';
import dummy from './dummy.reducer';
import {oauth} from './oauth.reducer';

export default combineReducers({
  dummy,
  oauth,
});
