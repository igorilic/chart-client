import {
  METERS_FETCH_REQUEST,
  METERS_FETCH_SUCCESS,
  FIELDS_FETCH_REQUEST,
  FIELDS_FETCH_SUCCESS,
  READINGS_FETCH_REQUEST,
  READINGS_FETCH_SUCCESS,
} from '../constants';

import moment from 'moment';
import echarts from 'echarts';

export function mapToCharts(data) {
  let returnData = [];
  const startTime = data[0].time;
  data.map((val, idx) => {
    const t = idx === 0 ? startTime : startTime + idx * val.time;
    const temp = [t, val.value];
    returnData = [
      ...returnData,
      temp
    ];
    return val;
  });
  return returnData;
}

export const initialState = {
  isFetching: false,
  meters: [],
  isClicked: false,
  readings: [],
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
        isClicked: true,
        readings: mapToCharts(action.payload.data),
        isFetching: false
      }
    default:
      return state;
  }
};