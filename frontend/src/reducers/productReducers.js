import { ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, CLEAR_ERRORS, ALL_TOP_PRODUCTS_REQUEST, ALL_TOP_PRODUCTS_SUCCESS, ALL_TOP_PRODUCTS_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_RESET, ADMIN_PRODUCTS_SUCCESS, ADMIN_PRODUCTS_REQUEST, ADMIN_PRODUCTS_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_RESET, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_RESET, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_RESET, GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS, GET_REVIEWS_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_RESET, DELETE_REVIEW_FAIL, ALL_PRODUCTS_CATEGORY_REQUEST, ALL_PRODUCTS_CATEGORY_SUCCESS, ALL_PRODUCTS_CATEGORY_FAIL, ALL_PRODUCTS_BRAND_REQUEST, ALL_PRODUCTS_BRAND_SUCCESS, ALL_PRODUCTS_BRAND_FAIL, UPDATE_PRODUCT_STATUS_REQUEST, UPDATE_PRODUCT_STATUS_SUCCESS, UPDATE_PRODUCT_STATUS_FAIL, UPDATE_PRODUCT_STATUS_RESET, ALL_BEST_PRODUCTS_REQUEST, ALL_BEST_PRODUCTS_SUCCESS, ALL_BEST_PRODUCTS_FAIL, ALL_COLOR_REQUEST, ALL_COLOR_SUCCESS, ALL_COLOR_FAIL, NEW_COLOR_REQUEST, NEW_COLOR_SUCCESS, NEW_COLOR_FAIL, NEW_COLOR_RESET, DELETE_COLOR_REQUEST, UPDATE_COLOR_REQUEST, DELETE_COLOR_SUCCESS, UPDATE_COLOR_SUCCESS, DELETE_COLOR_FAIL, UPDATE_COLOR_FAIL, UPDATE_COLOR_RESET, DELETE_COLOR_RESET, COLOR_DETAILS_REQUEST, COLOR_DETAILS_SUCCESS, COLOR_DETAILS_FAIL } from '../constants/productConstants'
export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }

        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            }
        case ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case ALL_PRODUCTS_FAIL:
        case ADMIN_PRODUCTS_FAIL:
            return {
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
export const topProductReducer = (state = { topproduct: [] }, action) => {
    switch (action.type) {
        case ALL_TOP_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ALL_TOP_PRODUCTS_SUCCESS:
            return {
                loading: false,
                topproduct: action.payload
            }
        case ALL_TOP_PRODUCTS_FAIL:
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
            return state;
    }
}
export const bestProductReducer = (state = { bestproduct: [] }, action) => {
    switch (action.type) {
        case ALL_BEST_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ALL_BEST_PRODUCTS_SUCCESS:
            return {
                loading: false,
                bestproduct: action.payload
            }
        case ALL_BEST_PRODUCTS_FAIL:
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
            return state;
    }
}
export const categoryProductReducer = (state = { productsByPrice: {}, category: {} }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ALL_PRODUCTS_CATEGORY_SUCCESS:
            return {
                loading: false,
                category: action.payload.category,
                productsByPrice: action.payload.productsByPrice
            }
        case ALL_PRODUCTS_CATEGORY_FAIL:
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
            return state;
    }
}

export const brandProductReducer = (state = { productsByPrice: {}, brand: {} }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_BRAND_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ALL_PRODUCTS_BRAND_SUCCESS:
            return {
                loading: false,
                brand: action.payload.brand,
                productsByPrice: action.payload.productsByPrice
            }
        case ALL_PRODUCTS_BRAND_FAIL:
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
            return state;
    }
}

export const productReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case UPDATE_PRODUCT_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdatedStatus: action.payload
            }
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_STATUS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case UPDATE_PRODUCT_STATUS_RESET:
            return {
                ...state,
                isUpdatedStatus: false
            }
        case DELETE_PRODUCT_RESET:
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
export const productDetailsReducer = (state = { product: {}, related_product: [] }, action) => {
    switch (action.type) {

        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload.product,
                related_product: action.payload.related_product,
            }

        case PRODUCT_DETAILS_FAIL:
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

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REVIEW_RESET:
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

export const productReviewReducer = (state = { review: [] }, action) => {
    switch (action.type) {

        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }

        case GET_REVIEWS_FAIL:
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

export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {

        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }

        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_PRODUCT_RESET:
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
export const reviewReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_REVIEW_RESET:
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
export const getColorReducer = (state = { color: [] }, action) => {
    switch (action.type) {
        case ALL_COLOR_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ALL_COLOR_SUCCESS:
            return {
                loading: false,
                color: action.payload
            }
        case ALL_COLOR_FAIL:
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
            return state;
    }
}
export const newColorReducer = (state = { color: {} }, action) => {
    switch (action.type) {

        case NEW_COLOR_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_COLOR_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                color: action.payload.color
            }

        case NEW_COLOR_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_COLOR_RESET:
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
export const colorReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_COLOR_REQUEST:
        case UPDATE_COLOR_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_COLOR_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_COLOR_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_COLOR_FAIL:
        case UPDATE_COLOR_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case UPDATE_COLOR_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case DELETE_COLOR_RESET:
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
export const colorDetailsReducer = (state = { color: {} }, action) => {
    switch (action.type) {

        case COLOR_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case COLOR_DETAILS_SUCCESS:
            return {
                loading: false,
                color: action.payload
            }

        case COLOR_DETAILS_FAIL:
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