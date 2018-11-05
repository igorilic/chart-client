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

function mapToChart(arr, color) {
  const metadata = arr[0];
  const { id, type, values } = metadata;
  let startDate = 0;
  let data = [];
  values.map((value, index) => {
    if (index === 0) {
      startDate = value.time;
    }
    const tmpValue = {
      color,
      x: index === 0 ? moment(startDate).format('DD-MM-YYYY, h:mm:ss A') : moment(startDate + index*value.time).format('DD-MM-YYYY, h:mm:ss A'),
      // x: index === 0 ? startDate : startDate + index*value.time,
      y: value.value
    };
    data = [ ...data, tmpValue];
    return value;
  })
  return [{ id, type, color, data }];
} 

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
<<<<<<< HEAD
        isClicked: true,
        readings: mapToCharts(action.payload.data),
=======
        readings: mapToChart(action.payload.data, action.payload.color),
>>>>>>> master
        isFetching: false
      }
    default:
      return state;
  }
};