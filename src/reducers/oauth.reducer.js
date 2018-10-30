import {
  // AUTH_ACCESS_TOKEN_FAILURE,
  AUTH_ACCESS_TOKEN_REQUEST,
  AUTH_ACCESS_TOKEN_SUCCESS,
  // AUTH_AUTHORIZE_TOKEN_FAILURE,
  AUTH_AUTHORIZE_TOKEN_REQUEST,
  AUTH_AUTHORIZE_TOKEN_SUCCESS,
  // AUTH_CLIENT_REGISTRATION_FAILURE,
  AUTH_CLIENT_REGISTRATION_REQUEST,
  AUTH_CLIENT_REGISTRATION_SUCCESS,
  // AUTH_REQUEST_TOKEN_FAILURE,
  AUTH_REQUEST_TOKEN_REQUEST,
  AUTH_REQUEST_TOKEN_SUCCESS,
} from '../constants';

export const initialState = {
  isFetching: false,
  oauthHeaders: {
    oauth_verifier: '',
    oauth_nonce: '',
    oauth_signature: '',
    oauth_token: '',
    oauth_consumer_key: '',
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: '1.0',
    oauth_timestamp: ''
  },
  responseRegistration: {
    key: '',
    secret: '',
    owner: '',
    attributes: {},
    principal: null
  },
  responseRequestToken: {
    oauth_token: '',
    oauth_token_secret: '',
    oauth_callback_confirmed: false
  },
  responseAuthorize: {
    oauth_verifier: ''
  },
  responseAccessToken: {
    oauth_token: '',
    oauth_token_secret: ''
  },
};

export const oauth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CLIENT_REGISTRATION_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case AUTH_CLIENT_REGISTRATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        responseRegistration: {
          ...state.responseRegistration,
          key: action.payload.data.key,
          secret: action.payload.data.secret,
          owner: action.payload.data.owner,
          attributes: action.payload.data.attributes,
          principal: action.payload.data.principal,
        },
        oauthHeaders: {
          ...state.oauthHeaders,
          oauth_consumer_key: action.payload.data.key
        }
      };
    case AUTH_REQUEST_TOKEN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case AUTH_REQUEST_TOKEN_SUCCESS:
      {
        const dataArr = action.payload.data.split('&');
        const oauth_token_arr = dataArr[0].split('=');
        const oauth_token_secret_arr = dataArr[1].split('=');
        const oauth_callback_confirmed_arr = dataArr[2].split('=');
        return {
          ...state,
          responseRequestToken: {
            ...state.responseRequestToken,
            oauth_token: oauth_token_arr[1],
            oauth_token_secret: oauth_token_secret_arr[1],
            oauth_callback_confirmed: oauth_callback_confirmed_arr[1] === 'true'
          },
          oauthHeaders: {
            ...state.oauthHeaders,
            oauth_token: oauth_token_arr[1]
          },
          isFetching: false
        };
      }
    case AUTH_AUTHORIZE_TOKEN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case AUTH_AUTHORIZE_TOKEN_SUCCESS:
      {
        const oauth_verifier = action.payload.data.split('=')[1];
        return {
          ...state,
          responseAuthorize: {
            ...state.responseAuthorize,
            oauth_verifier
          },
          oauthHeaders: {
            ...state.oauthHeaders,
            oauth_verifier
          },
          isFetching: false,
        };
      }
    case AUTH_ACCESS_TOKEN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case AUTH_ACCESS_TOKEN_SUCCESS:
      {
        const dataArr = action.payload.data.split('&');
        const tokenArr = dataArr[0].split('=');
        const secretArr = dataArr[1].split('=');
        return {
          ...state,
          responseAccessToken: {
            ...state.responseAccessToken,
            oauth_token: tokenArr[1],
            oauth_token_secret: secretArr[1]
          },
          oauthHeaders: {
            ...state.oauthHeaders,
            oauth_token: tokenArr[1]
          }
        }
      }
    default:
      return state;
  }
}