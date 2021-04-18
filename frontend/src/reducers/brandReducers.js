import { ADMIN_BRAND_FAIL, ADMIN_BRAND_REQUEST, ADMIN_BRAND_SUCCESS, ALL_BRAND_FAIL, ALL_BRAND_REQUEST, ALL_BRAND_SUCCESS, BRAND_DETAILS_FAIL, BRAND_DETAILS_REQUEST, BRAND_DETAILS_SUCCESS, CLEAR_ERRORS, DELETE_BRAND_FAIL, DELETE_BRAND_REQUEST, DELETE_BRAND_RESET, DELETE_BRAND_SUCCESS, NEW_BRAND_FAIL, NEW_BRAND_REQUEST, NEW_BRAND_RESET, NEW_BRAND_SUCCESS, UPDATE_BRAND_FAIL, UPDATE_BRAND_REQUEST, UPDATE_BRAND_RESET, UPDATE_BRAND_STATUS_FAIL, UPDATE_BRAND_STATUS_REQUEST, UPDATE_BRAND_STATUS_RESET, UPDATE_BRAND_STATUS_SUCCESS, UPDATE_BRAND_SUCCESS } from "../constants/brandConstants"


export const getBrandReducer = (state = {brand: []},action ) => {
    switch(action.type){
        case ALL_BRAND_REQUEST:
        case ADMIN_BRAND_REQUEST:
            return {
                ...state,
                loading:true
            }
        case ALL_BRAND_SUCCESS:
            return {
                loading:false,
                brand:action.payload
            }
        case ADMIN_BRAND_SUCCESS:
            return {
                loading:false,
                brand:action.payload
            }
        case ALL_BRAND_FAIL:
        case ADMIN_BRAND_FAIL:
            return {
                ...state,
                error:action.payload
            }
        case CLEAR_ERRORS:
                return {
                    ...state,
                    error:null
            }
        default:
            return state;
    }
}
export const newBrandReducer = (state = {brand: {}}, action) => {
    switch (action.type) {

        case NEW_BRAND_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_BRAND_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                brand: action.payload.brand
            }

        case NEW_BRAND_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_BRAND_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
export const brandReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_BRAND_REQUEST:
        case UPDATE_BRAND_REQUEST:
        case UPDATE_BRAND_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_BRAND_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_BRAND_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    isUpdated: action.payload
                }
        case UPDATE_BRAND_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdatedStatus: action.payload
            }
        case DELETE_BRAND_FAIL:
        case UPDATE_BRAND_FAIL:
        case UPDATE_BRAND_STATUS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case UPDATE_BRAND_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case UPDATE_BRAND_STATUS_RESET:
                return {
                    ...state,
                    isUpdatedStatus: false
                }
        case DELETE_BRAND_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
export const brandDetailsReducer = (state = { brand: {} }, action) => {
    switch (action.type) {

        case BRAND_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case BRAND_DETAILS_SUCCESS:
            return {
                loading: false,
                brand: action.payload
            }

        case BRAND_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}