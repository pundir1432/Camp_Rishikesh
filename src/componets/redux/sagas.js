import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import BookingSaga from './booking/saga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        BookingSaga()
    ]);
}
