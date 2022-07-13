import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootSaga from './rootSaga';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(sagaMiddleware)
      .concat(logger),
});

sagaMiddleware.run(rootSaga);
export default store;
export const persistor = persistStore(store);
