import { BookingUser } from "./constants"

const CREATE_BOOKING = {
    data: [],
    loading: false,
}

const GET_BOOKING = {
    data: [],
    loading: false,
}

const UPDATE_BOOKING = {
    data: [],
    loading: false,
}

const CANCEL_BOOKING = {
    data: [],
    loading: false,
}

export const createBookingReducer = (state = CREATE_BOOKING, action) => {
    console.log(CREATE_BOOKING,'CREATE_BOOKING');
    switch (action.type) {
        case BookingUser.CREATE_BOOKING_LOADING:
            return {
                data: state?.data,
                loading: true
            }
        case BookingUser.CREATE_BOOKING_SUCCESS:

            return {
                data: action?.payload,
                loading: false
            }
        case BookingUser.CREATE_BOOKING_RESET:
            return {
                data: [],
                loading: false
            }
        case BookingUser.CREATE_BOOKING_ERROR:
            return {
                data: action?.payload,
                loading: false
            }
        default: return state
    }
}

export const getBookingReducer = (state = GET_BOOKING, action) => {
    switch (action.type) {
        case BookingUser.GET_BOOKING_LOADING:
            return {
                ...state,
                data: [],
                loading: true
            }
        case BookingUser.GET_BOOKING_SUCCESS:
            return {
                ...state,
                data: action?.payload,
                loading: false
            }
        case BookingUser.GET_BOOKING_ERROR:
            return {
                ...state,
                data: action?.payload,
                loading: false
            }
        case BookingUser.GET_BOOKING_RESET:
            return {
                data: [],
                loading: false
            }
        default:
            return state;
    }
}
export const updateBookingReducer = (state = UPDATE_BOOKING, action) => {
    switch (action.type) {
        case BookingUser.UPDATE_BOOKING_LOADING:
            return {
                ...state,
                data: [],
                loading: true
            }
        case BookingUser.UPDATE_BOOKING_SUCCESS:
            return {
                ...state,
                data: action?.payload,
                loading: false
            }
        case BookingUser.UPDATE_BOOKING_ERROR:
            return {
                ...state,
                data: action?.payload,
                loading: false
            }
        case BookingUser.UPDATE_BOOKING_RESET:
            return {
                data: [],
                loading: false
            }
        default:
            return state;
    }
}

export const cancelBookingReducer = (state = CANCEL_BOOKING, action) => {
    switch (action.type) {
        case BookingUser.CANCEL_BOOKING_LOADING:
            return {
                ...state,
                data: [],
                loading: true
            }
        case BookingUser.CANCEL_BOOKING_SUCCESS:
            return {
                ...state,
                data: action?.payload,
                loading: false
            }
        case BookingUser.CANCEL_BOOKING_ERROR:
            return {
                ...state,
                data: action?.payload,
                loading: false
            }
        case BookingUser.CANCEL_BOOKING_RESET:
            return {
                data: [],
                loading: false
            }
        default:
            return state;
    }
}
