import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    NEW_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
    ADD_FAVORITE_REQUEST,
    ADD_FAVORITE_SUCCESS,
    ADD_FAVORITE_FAIL,
    ADD_FAVORITE_RESET,
    DELETE_FAVORITE_REQUEST,
    DELETE_FAVORITE_SUCCESS,
    DELETE_FAVORITE_FAIL,
    DELETE_FAVORITE_RESET,
    GET_FAVORITE_REQUEST,
    GET_FAVORITE_SUCCESS,
    GET_FAVORITE_FAIL,
    ALL_ADMINS_REQUEST,
    ALL_ADMINS_SUCCESS,
    ALL_ADMINS_FAIL,
    ADD_ADMINS_REQUEST,
    ADD_ADMINS_SUCCESS,
    ADD_ADMINS_FAIL,
    ADD_ADMINS_RESET,
} from '../constants/userConstants'

export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }

        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
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

export const userReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {

        case FORGOT_PASSWORD_REQUEST:
        case NEW_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                success: action.payload
            }

        case FORGOT_PASSWORD_FAIL:
        case NEW_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                message: null
            }

        default:
            return state;
    }
}

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {

        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }

        case ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}
export const allAdminReducer = (state = { admins: [] }, action) => {
    switch (action.type) {

        case ALL_ADMINS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_ADMINS_SUCCESS:
            return {
                ...state,
                loading: false,
                admins: action.payload
            }

        case ALL_ADMINS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }

        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}
export const AddAdminReducer = (state = { users: {} }, action) => {
    switch (action.type) {

        case ADD_ADMINS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ADD_ADMINS_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                users: action.payload.user
            }
        case ADD_ADMINS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case ADD_ADMINS_RESET:
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
export const favoriteReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_FAVORITE_REQUEST:
        case DELETE_FAVORITE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ADD_FAVORITE_SUCCESS:
            return {
                ...state,
                loading: false,
                is_favorite: action.payload
            }
        case DELETE_FAVORITE_SUCCESS:
            return {
                ...state,
                loading: false,
                is_Delete: action.payload
            }
        case ADD_FAVORITE_FAIL:
        case DELETE_FAVORITE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case ADD_FAVORITE_RESET:
            return {
                ...state,
                is_favorite: false
            }
        case DELETE_FAVORITE_RESET:
            return {
                ...state,
                is_Delete: false
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
export const favoriteDetailsReducer = (state = { list: {} }, action) => {
    switch (action.type) {

        case GET_FAVORITE_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_FAVORITE_SUCCESS:
            return {
                ...state,
                loading: false,
                list: action.payload
            }

        case GET_FAVORITE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}