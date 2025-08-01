import { BookingUser } from "./constants"

type AuthAction = { type: string, payload: {} | string };

export const createBookingAction = (data): AuthAction => ({
    type: BookingUser.CREATE_BOOKING_FIRST,
    data
});

export const getBookingAction = (data): AuthAction => ({
    type: BookingUser.GET_BOOKING_FIRST,
    data
});
