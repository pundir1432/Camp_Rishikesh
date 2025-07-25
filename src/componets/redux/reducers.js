import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import { getUserReducer, updateProfileReducer } from './Profile/reducers';

const rootReducer = combineReducers({
    Auth,
    updateProfileReducer,
    getUserReducer,
});

export default rootReducer;
