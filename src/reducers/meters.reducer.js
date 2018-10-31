import { 
  METERS_FETCH_REQUEST,
  METERS_FETCH_SUCCESS,
} from '../constants';

const initialState = {
  isFetching: false,
  meters: null
};

export const meters = (state = initialState, action) => {
  switch(action.type) {
    case METERS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case METERS_FETCH_SUCCESS:
      return {
        ...state,
        meters: action.payload.data,
        isFetching: false
      };
    default:
      return state;
  }
};