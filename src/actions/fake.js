import axios from 'axios';

import { 
  READINGS_FETCH_FAILURE,
  READINGS_FETCH_REQUEST,
  READINGS_FETCH_SUCCESS,
} from '../constants';

const readingsFetchSuccess = (data, color) => {
  return {
    type: READINGS_FETCH_SUCCESS,
    payload: { data, color }
  }
}
const readingsFetchFailure = (error) => {
  return {
    type: READINGS_FETCH_FAILURE,
    payload: { error }
  }
}

export const readingFetch = (color) => {
  return dispatch => {
    dispatch({type: READINGS_FETCH_REQUEST});
    axios.get('fake/power.json')
      .then(
        response => {
          dispatch(readingsFetchSuccess(response.data.result, color)); 
        },
        error => dispatch(readingsFetchFailure(error))
      );
  };
}