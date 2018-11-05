import {
  READINGS_FETCH_SUCCESS,
} from '../constants';
import moment from 'moment';

import { meters, mapToCharts, initialState } from './meters.reducer'

describe('mapper', () => {
  test('should return echarts mapped values', () => {
    const values = [
      {
        "time": 1541372509367,
        "value": 378831,
        "reading": 0,
        "reactiveReading": 0,
        "cost": 0.0,
        "selfConsumptionReward": 0.0
      },
      {
        "time": 109367,
        "value": -25777,
        "reading": 0,
        "reactiveReading": 0,
        "cost": 0.0,
        "selfConsumptionReward": 0.0
      },
      {
        "time": 109367,
        "value": -21946,
        "reading": 0,
        "reactiveReading": 0,
        "cost": 0.0,
        "selfConsumptionReward": 0.0
      },
    ];
    const expected = [
      [moment(1541372509367), 378831],
      [moment(1541372509367 + 109367), -25777],
      [moment(1541372509367 + 2 * 109367), -21946]
    ];
    const expectedState = {
      ...initialState,
      isClicked: true,
      readings: expected
    };
    const result = meters(initialState, {type: READINGS_FETCH_SUCCESS, payload: {data: values}});
    expect(result).toEqual(expectedState);
  });
});

