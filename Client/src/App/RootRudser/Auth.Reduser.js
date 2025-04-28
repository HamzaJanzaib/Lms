import { combineReducers } from 'redux';
import authReducer from '../../Features/Auth/AuthSlice';
import { authApi } from '../../Features/Api/Auth.Api';

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
});

export default rootReducer;
