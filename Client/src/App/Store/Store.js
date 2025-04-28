import { configureStore } from '@reduxjs/toolkit';
import RootReducer from '../RootRudser/Auth.Reduser';
import { authApi } from '../../Features/Api/Auth.Api';

const AppStore = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export default AppStore;