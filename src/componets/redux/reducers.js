import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import { cancelBookingReducer, createBookingReducer, getBookingReducer, updateBookingReducer } from './booking/reducers';

const rootReducer = combineReducers({
    Auth,
   createBookingReducer,
   getBookingReducer,
   updateBookingReducer,
   cancelBookingReducer

});

export default rootReducer;
