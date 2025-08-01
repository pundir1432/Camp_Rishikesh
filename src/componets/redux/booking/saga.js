import ToastHandle from "../../helper/ToastMessage";
import { cancelBookingApi, createBookingApi, getBookingApi, updateBookingApi } from "./api";
import { BookingUser } from "./constants"
import { all, fork, put, takeEvery, call, delay } from 'redux-saga/effects';
/**
 * Login the user
 * @param {*} payload - username and password
 */
function* createBookingSaga(data) {
    try {
        yield put({
            type: BookingUser.CREATE_BOOKING_LOADING,
            payload: {},
        });
        const response = yield call(createBookingApi, data);
        console.log(response?.data?.message, 'responseresponse');
        if (response.status === 200) {
            ToastHandle(response?.data?.message, 'success');
            yield put({
                type: BookingUser.CREATE_BOOKING_SUCCESS,
                payload: response?.data,
            });
        }
        else {
            ToastHandle(response?.data?.message, 'danger');
            yield put({
                type: BookingUser.CREATE_BOOKING_ERROR,
                payload: { ...response },
            });
        }
    } catch (error) {
        ToastHandle(error, 'danger')
        yield put({
            type: BookingUser.CREATE_BOOKING_ERROR,
            payload: error,
        });
    }
}

function* getBookingSaga(data) {
    try {
        yield put({
            type: BookingUser.GET_BOOKING_LOADING,
            payload: {},
        });

        const response = yield call(getBookingApi, data);
        if (response.status === 200) {
            yield put({
                type: BookingUser.GET_BOOKING_SUCCESS,
                payload: response.data.user, // ✅ only send data
            });
        } else {
            yield put({
                type: BookingUser.GET_BOOKING_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: BookingUser.GET_BOOKING_ERROR,
            payload: error,
        });
    }
}
function* updateBookingSaga(data) {
    try {
        yield put({
            type: BookingUser.UPDATE_BOOKING_LOADING,
            payload: {},
        });

        const response = yield call(updateBookingApi, data);
        if (response.status === 200) {
            yield put({
                type: BookingUser.UPDATE_BOOKING_SUCCESS,
                payload: response.data.user, // ✅ only send data
            });
        } else {
            yield put({
                type: BookingUser.UPDATE_BOOKING_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: BookingUser.UPDATE_BOOKING_ERROR,
            payload: error,
        });
    }
}

function* cancelBookingSaga(data) {
    try {
        yield put({
            type: BookingUser.CANCEL_BOOKING_LOADING,
            payload: {},
        });

        const response = yield call(cancelBookingApi, data);
        if (response.status === 200) {
            yield put({
                type: BookingUser.CANCEL_BOOKING_SUCCESS,
                payload: response.data.user, // ✅ only send data
            });
        } else {
            yield put({
                type: BookingUser.CANCEL_BOOKING_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: BookingUser.CANCEL_BOOKING_ERROR,
            payload: error,
        });
    }
}

export function* watchBooking() {
    yield takeEvery(BookingUser.CREATE_BOOKING_FIRST, createBookingSaga)
    yield takeEvery(BookingUser.GET_BOOKING_FIRST, getBookingSaga)
    yield takeEvery(BookingUser.UPDATE_BOOKING_FIRST, updateBookingSaga)
    yield takeEvery(BookingUser.CANCEL_BOOKING_FIRST, cancelBookingSaga)
};

function* BookingSaga() {
    yield all([
        fork(watchBooking),
    ]);
}
export default BookingSaga;
