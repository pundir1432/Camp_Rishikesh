import { ProductActionTypes } from "./constants"

export const updateProfileAction = (data) => ({
    type: ProductActionTypes.UPDATE_PROFILE_FIRST,
    data
});

export const getUserAction = (data) => ({
    type: ProductActionTypes.GET_USER_FIRST,
    data
});
