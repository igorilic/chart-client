import { DUMMY_ACTION } from '../constants';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case DUMMY_ACTION:
      return { ...state, dummy: 'dummy' };
    default:
      return state;
  }
}
