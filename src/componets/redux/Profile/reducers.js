import { ProductActionTypes } from "./constants"

const UPDATE_PROFILE = {
    data: [],
    loading: false,
}

const GET_USER = {
    data: [],
    loading: false,
}

export const updateProfileReducer = (state = UPDATE_PROFILE, action) => {
    switch (action.type) {
        case ProductActionTypes.UPDATE_PROFILE_LOADING:
            return {
                data: state?.data,
                loading: true
            }
        case ProductActionTypes.UPDATE_PROFILE_SUCCESS:
            return {
                data: action?.payload,
                loading: false
            }
        case ProductActionTypes.RESET_PROFILE:
            return {
                data: [],
                loading: false
            }
        case ProductActionTypes.UPDATE_PROFILE_ERROR:
            return {
                data: action?.payload,
                loading: false
            }
        default: return state
    }
}

export const getUserReducer = (state = GET_USER, action) => {
    switch (action.type) {
        case ProductActionTypes.GET_USER_LOADING:
            return {
                ...state,
                data: [],
                loading: true
            }
        case ProductActionTypes.GET_USER_SUCCESS:
            return {
                ...state,
                data: action?.payload,
                loading: false
            }
        case ProductActionTypes.GET_USER_ERROR:
            return {
                ...state,
                data: action?.payload,
                loading: false
            }
        default:
            return state;
    }
}
