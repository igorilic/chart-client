import { combineReducers } from 'redux';
import dummy from './dummy.reducer';
import {oauth} from './oauth.reducer';
import {meters} from './meters.reducer';

export default combineReducers({
  dummy,
  oauth,
  meters
});
