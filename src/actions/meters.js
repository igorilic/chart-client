import axios from 'axios';
import {
  uuid
} from '../utils';
import oauthSignature from 'oauth-signature';

import {
  METERS_FETCH_REQUEST,
  METERS_FETCH_SUCCESS,
  METERS_FETCH_FAILURE,
  READINGS_FETCH_FAILURE,
  READINGS_FETCH_REQUEST,
  READINGS_FETCH_SUCCESS,
  FIELDS_FETCH_FAILURE,
  FIELDS_FETCH_REQUEST,
  FIELDS_FETCH_SUCCESS,
  BASE_URL,
  USERNAME,
  PASSWORD
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

const fieldsFetchSuccess = (data) => {
  return {
    type: FIELDS_FETCH_SUCCESS,
    payload: { data }
  }
}
const fieldsFetchFailure = (error) => {
  return {
    type: FIELDS_FETCH_FAILURE,
    payload: { error }
  }
}
export const fieldsFetch = (oauthHeaders, consumerSecret, tokenSecret, meterId) => {
  return dispatch => {
    dispatch({type: FIELDS_FETCH_REQUEST});
    const url = `${BASE_URL}/field_names`;
    const timestamp = Math.round((new Date()).getTime() / 1000).toString();
    let parameters = {
      ...oauthHeaders,
      oauth_nonce: uuid(),
      oauth_timestamp: timestamp,
    };
    delete parameters.oauth_signature;
    delete parameters.oauth_verifier;
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
      url: `${url}?meterId=${meterId}`
    };
    return axios(options)
      .then(
        response => dispatch(fieldsFetchSuccess(response.data)),
        error => dispatch(fieldsFetchFailure(error))
      )
      .catch(
        error => dispatch(fieldsFetchFailure(error))
      );
  }
}

const readingsFetchSuccess = (data) => {
  return {
    type: READINGS_FETCH_SUCCESS,
    payload: { data }
  }
}
const readingsFetchFailure = (error) => {
  return {
    type: READINGS_FETCH_FAILURE,
    payload: { error }
  }
}

// export const readingFetch = (oauthHeaders, consumerSecret, tokenSecret, meterId) => {
//   return dispatch => {
//     dispatch({type: READINGS_FETCH_REQUEST});
//     const timestamp = Math.round((new Date()).getTime() / 1000).toString();
//     const from = timestamp - 86400;
//     const urlForSig =`${BASE_URL}/readings`;
//     const url = encodeURI(`${BASE_URL}/readings?email=${USERNAME}&password=${PASSWORD}&meterId=${meterId}&from=${from}`);
//     let parameters = {
//       ...oauthHeaders,
//       oauth_nonce: uuid(),
//       oauth_timestamp: timestamp,
//     };
//     delete parameters.oauth_signature;
//     delete parameters.oauth_verifier;
//     const sig = oauthSignature.generate('GET', urlForSig, parameters, consumerSecret, tokenSecret);
//     parameters.oauth_signature = sig;
//     let oAuth = [];
//     Object.keys(parameters).forEach(key => {
//       oAuth.push(`${key}="${parameters[key]}"`)
//     });
//     const authorizationHeaders = `OAuth ${oAuth.join(', ')}`;
//     const configRequestHeaders = {
//       ...config,
//       headers: {
//         ...config.headers,
//         'Authorization': authorizationHeaders
//       }
//     };
//     const options = {
//       method: 'GET',
//       headers: configRequestHeaders.headers,
//       url
//     };
//     return axios(options)
//       .then(
//         response => dispatch(readingsFetchSuccess(response.data)),
//         error => dispatch(readingsFetchFailure(error))
//       )
//       .catch(
//         error => dispatch(readingsFetchFailure(error))
//       );
//   }
// }

export const readingFetch = () => {
  return dispatch => {
    dispatch({type: READINGS_FETCH_REQUEST});
    const url = 'api/power.json';
    return axios.get(url)
      .then(
        response => dispatch(readingsFetchSuccess(response.data.result[0].values)),
        error => dispatch(readingsFetchFailure(error))
      )
      .catch(
        error => dispatch(readingsFetchFailure(error))
      );
  }
}