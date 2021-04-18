import { ADMIN_SLIDER_FAIL, ADMIN_SLIDER_REQUEST, ADMIN_SLIDER_SUCCESS, ALL_SLIDER_FAIL, ALL_SLIDER_REQUEST, ALL_SLIDER_SUCCESS, CLEAR_ERRORS, DELETE_SLIDER_FAIL, DELETE_SLIDER_REQUEST, DELETE_SLIDER_RESET, DELETE_SLIDER_SUCCESS, NEW_SLIDER_FAIL, NEW_SLIDER_REQUEST, NEW_SLIDER_RESET, NEW_SLIDER_SUCCESS, SLIDER_DETAILS_FAIL, SLIDER_DETAILS_REQUEST, SLIDER_DETAILS_SUCCESS, UPDATE_SLIDER_FAIL, UPDATE_SLIDER_REQUEST, UPDATE_SLIDER_RESET, UPDATE_SLIDER_STATUS_FAIL, UPDATE_SLIDER_STATUS_REQUEST, UPDATE_SLIDER_STATUS_RESET, UPDATE_SLIDER_STATUS_SUCCESS, UPDATE_SLIDER_SUCCESS } from "../constants/sliderConstants"


export const getSliderReducer = (state = {slider: []},action ) => {
    switch(action.type){
        case ALL_SLIDER_REQUEST:
        case ADMIN_SLIDER_REQUEST:
            return {
                ...state,
                loading:true
            }
        case ALL_SLIDER_SUCCESS:
            return {
                loading:false,
                slider:action.payload
            }
            case ADMIN_SLIDER_SUCCESS:
                return {
                    loading:false,
                    slider:action.payload
                }
        case ALL_SLIDER_FAIL:
        case ADMIN_SLIDER_FAIL:
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
export const newSliderReducer = (state = {slider: {}}, action) => {
    switch (action.type) {

        case NEW_SLIDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_SLIDER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                slider: action.payload.slider
            }

        case NEW_SLIDER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_SLIDER_RESET:
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
export const sliderReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_SLIDER_REQUEST:
        case UPDATE_SLIDER_REQUEST:
        case UPDATE_SLIDER_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_SLIDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_SLIDER_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    isUpdated: action.payload
                }
        case UPDATE_SLIDER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdatedStatus: action.payload
            }

        case DELETE_SLIDER_FAIL:
        case UPDATE_SLIDER_FAIL:
        case UPDATE_SLIDER_STATUS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case UPDATE_SLIDER_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case DELETE_SLIDER_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_SLIDER_STATUS_RESET:
            return {
                ...state,
                isUpdatedStatus: false
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
export const sliderDetailsReducer = (state = { slider: {} }, action) => {
    switch (action.type) {

        case SLIDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case SLIDER_DETAILS_SUCCESS:
            return {
                loading: false,
                slider: action.payload
            }

        case SLIDER_DETAILS_FAIL:
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