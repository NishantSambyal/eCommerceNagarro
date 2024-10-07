import { combineReducers } from '@reduxjs/toolkit';

import UserReducer from './slices/userSlice';

const rootReducer = combineReducers({
  UserReducer,
});

export default rootReducer;
