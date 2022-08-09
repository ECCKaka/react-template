import { createStore, applyMiddleware } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

import combinedReducer from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
const storageConfig = {
    key: 'root', 
    storage: storageSession, 
    blacklist: [],
};
const myPersistReducer = persistReducer(storageConfig, combinedReducer);
let store = applyMiddleware(thunk, promise, logger)(createStore)(myPersistReducer);

console.log('hello');
export const persistor = persistStore(store)
// persistor.purge();
export default store;