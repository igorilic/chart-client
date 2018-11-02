import { 
  METERS_FETCH_REQUEST,
  METERS_FETCH_SUCCESS,
  FIELDS_FETCH_REQUEST,
  FIELDS_FETCH_SUCCESS,
  READINGS_FETCH_REQUEST,
  READINGS_FETCH_SUCCESS,
} from '../constants';

const initialState = {
  isFetching: false,
  meters: [],
  fields: null 
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
    case FIELDS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FIELDS_FETCH_SUCCESS:
      return {
        ...state,
        fields: action.payload.data,
        isFetching: false
      };
    case READINGS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case READINGS_FETCH_SUCCESS:
      return {
        ...state,
        readings: action.payload.data,
        isFetching: false
      }
    default:
      return state;
  }
};