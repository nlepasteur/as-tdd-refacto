// libs
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// reducers
import isLogged from './reducers/isLogged';
import explore from './reducers/explore';
import dimension from './reducers/dimension';
import grid from './reducers/grid';

const rootReducer = combineReducers({
  isLogged,
  explore,
  dimension,
  grid,
});

const persistedState = loadState(['explore', 'dimension', 'grid']);

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(logger, thunk)
);

function loadState(keys: string[]) {
  return keys
    .map((key) => {
      try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
          return undefined;
        }
        return { [key]: JSON.parse(serializedState) };
      } catch (error) {
        return undefined;
      }
    })
    .reduce((acc, cur) => ({ ...acc, ...cur }));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
