import axios from 'axios';
import qs from 'qs';
import {
  uuid
} from '../utils';
import oauthSignature from 'oauth-signature';

import {
  AUTH_ACCESS_TOKEN_FAILURE,
  AUTH_ACCESS_TOKEN_REQUEST,
  AUTH_ACCESS_TOKEN_SUCCESS,
  AUTH_AUTHORIZE_TOKEN_FAILURE,
  AUTH_AUTHORIZE_TOKEN_REQUEST,
  AUTH_AUTHORIZE_TOKEN_SUCCESS,
  AUTH_CLIENT_REGISTRATION_FAILURE,
  AUTH_CLIENT_REGISTRATION_REQUEST,
  AUTH_CLIENT_REGISTRATION_SUCCESS,
  AUTH_REQUEST_TOKEN_FAILURE,
  AUTH_REQUEST_TOKEN_REQUEST,
  AUTH_REQUEST_TOKEN_SUCCESS,
  USERNAME,
  PASSWORD,
  BASE_URL,
} from '../constants';

const client = 'MyClient';

const config = {
  headers: {
    'Accept': 'text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2',
  }
};

const clientRegistrationSuccess = (data) => {
  return {
    type: AUTH_CLIENT_REGISTRATION_SUCCESS,
    payload: {
      data
    }
  };
};
const clientRegistrationFailure = (error) => {
  return {
    type: AUTH_CLIENT_REGISTRATION_FAILURE,
    payload: error
  };
};
export const clientRegistration = () => {
  return dispatch => {
    const url = `${BASE_URL}/oauth1/consumer_token`;
    const configClientRegistration = {
      ...config,
      headers: {
        ...config.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Headers': '*'
      }
    };
    const data = qs.stringify({
      client
    });
    dispatch({
      type: AUTH_CLIENT_REGISTRATION_REQUEST
    });
    return axios.post(url, data, configClientRegistration)
      .then(
        response => dispatch(clientRegistrationSuccess(response.data)),
        error => dispatch(clientRegistrationFailure(error))
      )
      .catch(
        error => clientRegistrationFailure(error)
      );
  }
}

const requestTokenSuccess = (data) => {
  return {
    type: AUTH_REQUEST_TOKEN_SUCCESS,
    payload: {
      data
    }
  };
};

const requestTokenFailure = (error) => {
  return {
    type: AUTH_REQUEST_TOKEN_FAILURE,
    payload: {
      error
    }
  };
};

export const requestToken = (oauthHeaders, consumerSecret) => {
  return dispatch => {
    dispatch({
      type: AUTH_REQUEST_TOKEN_REQUEST
    });


    const url = `${BASE_URL}/oauth1/request_token`;
    const timestamp = Math.round((new Date()).getTime() / 1000).toString();
    let parameters = {
      ...oauthHeaders,
      oauth_nonce: uuid(),
      oauth_timestamp: timestamp,
    };
    delete parameters.oauth_verifier;
    delete parameters.oauth_token;
    delete parameters.oauth_signature;
    const sig = oauthSignature.generate('POST', url, parameters, consumerSecret);
    parameters.oauth_signature = sig;
    let oAuth = [];
    Object.keys(parameters).forEach(key => {
      oAuth.push(`${key}="${parameters[key]}"`)
    });
    const authorizationHeaders = `OAuth ${oAuth.join(',')}`;
    const configRequestHeaders = {
      ...config,
      headers: {
        ...config.headers,
        'Authorization': authorizationHeaders,
        'Access-Control-Allow-Origin':'*'
      }
    };

    const options = {
      method: 'POST',
      headers: configRequestHeaders.headers,
      data: qs.stringify({}),
      url
    };

    return axios(options)
      .then(
        response => dispatch(requestTokenSuccess(response.data)),
        error => dispatch(requestTokenFailure(error))
      )
      .catch(
        error => dispatch(requestTokenFailure(error))
      );
  }
}

const authorizeTokenSuccess = (data) => {
  return {
    type: AUTH_AUTHORIZE_TOKEN_SUCCESS,
    payload: {data}
  }
}
const authorizeTokenFailure = (error) => {
  return {
    type: AUTH_AUTHORIZE_TOKEN_FAILURE,
    payload: {error}
  }
}

export const authorizeToken = (oauth_token) => {
  return dispatch => {
    dispatch({type: AUTH_AUTHORIZE_TOKEN_REQUEST});
    const url = encodeURI(`${BASE_URL}/oauth1/authorize?oauth_token=${oauth_token}&email=${USERNAME}&password=${PASSWORD}`);
    const options = {
      method: 'GET',
      headers: config.headers,
      url
    };
    return axios(options)
      .then(
        response => dispatch(authorizeTokenSuccess(response.data)),
        error => dispatch(authorizeTokenFailure(error))
      );
  }
}

const accessTokenSuccess = (data) => {
  return {
    type: AUTH_ACCESS_TOKEN_SUCCESS,
    payload: {data}
  }
}
const accessTokenFailure = (error) => {
  return {
    type: AUTH_ACCESS_TOKEN_FAILURE,
    payload: {error}
  }
}

export const accessToken = (oauthHeaders, consumerSecret, tokenSecret) => {
  return dispatch => {
    dispatch({
      type: AUTH_ACCESS_TOKEN_REQUEST
    });

    const url = `${BASE_URL}/oauth1/access_token`;
    const timestamp = Math.round((new Date()).getTime() / 1000).toString();
    let parameters = {
      ...oauthHeaders,
      oauth_nonce: uuid(),
      oauth_timestamp: timestamp,
    };
    delete parameters.oauth_signature;
    const sig = oauthSignature.generate('POST', url, parameters, consumerSecret, tokenSecret);
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
      method: 'POST',
      headers: configRequestHeaders.headers,
      data: qs.stringify({}),
      url
    };

    return axios(options)
      .then(
        response => dispatch(accessTokenSuccess(response.data)),
        error => dispatch(accessTokenFailure(error))
      )
      .catch(
        error => dispatch(accessTokenFailure(error))
      );
  }
}