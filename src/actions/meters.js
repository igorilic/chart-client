import axios from 'axios';
import {
  uuid
} from '../utils';
import oauthSignature from 'oauth-signature';

import { 
  METERS_FETCH_REQUEST,
  METERS_FETCH_SUCCESS,
  METERS_FETCH_FAILURE,
  BASE_URL
} from '../constants';
const config = {
  headers: {
    'Accept': 'text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2',
  }
};
const metersFetchSuccess = (data) => {
  return {
    type: METERS_FETCH_SUCCESS,
    payload: { data }
  }
}
const metersFetchFailure = (error) => {
  return {
    type: METERS_FETCH_FAILURE,
    payload: { error }
  }
}
export const metersFetch = (oauthHeaders, consumerSecret, tokenSecret) => {
  return dispatch => {
    dispatch({type: METERS_FETCH_REQUEST});
    const url = `${BASE_URL}/meters`;
    const timestamp = Math.round((new Date()).getTime() / 1000).toString();
    let parameters = {
      ...oauthHeaders,
      oauth_nonce: uuid(),
      oauth_timestamp: timestamp,
    };
    delete parameters.oauth_signature;
    delete parameters.oauth_verifier;
    debugger;
    const sig = oauthSignature.generate('GET', url, parameters, consumerSecret, tokenSecret);
    parameters.oauth_signature = sig;
    let oAuth = [];
    Object.keys(parameters).forEach(key => {
      oAuth.push(`${key}="${parameters[key]}"`)
    });
    const authorizationHeaders = `OAuth ${oAuth.join(', ')}`;
    const configRequestHeaders = {
      ...config,
      headers: {
        ...config.headers,
        'Authorization': authorizationHeaders
      }
    };
    const options = {
      method: 'GET',
      headers: configRequestHeaders.headers,
      url
    };
    return axios(options)
      .then(
        response => dispatch(metersFetchSuccess(response.data)),
        error => dispatch(metersFetchFailure(error))
      )
      .catch(
        error => dispatch(metersFetchFailure(error))
      );
  }
}
