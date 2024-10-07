import AsyncStorage from '@react-native-async-storage/async-storage';
import { type Middleware, type Tuple, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, persistStore } from 'redux-persist';

import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['UserReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewaresDefault = getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    });

    const middlewareTuple = [...middlewaresDefault] as Tuple<Middleware[]>;
    return middlewareTuple;
  },
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export default persistor;

setupListeners(store.dispatch);
