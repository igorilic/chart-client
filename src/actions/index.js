import {
  DUMMY_ACTION
} from '../constants';

export const dummyAction = () => {
  return {
    type: DUMMY_ACTION
  };
};

export {
  clientRegistration,
  requestToken,
  authorizeToken,
  accessToken,
  changeFieldValue,
  setoauthState,
  authLogout,
} from './oauth.actions';

export {
  metersFetch,
  fieldsFetch,
  // readingFetch,
} from './meters';

export {
  readingFetch
} from './fake';