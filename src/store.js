import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

function configureStoreDev(initialState) {
  const middlewares = [thunk];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  return store;
}

const configureStore = configureStoreDev;

export default configureStore;
