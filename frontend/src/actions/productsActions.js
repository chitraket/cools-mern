import axios from 'axios';
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ALL_TOP_PRODUCTS_FAIL,
    ALL_TOP_PRODUCTS_REQUEST,
    ALL_TOP_PRODUCTS_SUCCESS,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    ALL_PRODUCTS_CATEGORY_REQUEST,
    ALL_PRODUCTS_CATEGORY_SUCCESS,
    ALL_PRODUCTS_CATEGORY_FAIL,
    ALL_PRODUCTS_BRAND_REQUEST,
    ALL_PRODUCTS_BRAND_SUCCESS,
    ALL_PRODUCTS_BRAND_FAIL,
    UPDATE_PRODUCT_STATUS_REQUEST,
    UPDATE_PRODUCT_STATUS_SUCCESS,
    UPDATE_PRODUCT_STATUS_FAIL,
    ALL_BEST_PRODUCTS_REQUEST,
    ALL_BEST_PRODUCTS_FAIL,
    ALL_BEST_PRODUCTS_SUCCESS,
    NEW_COLOR_REQUEST,
    NEW_COLOR_SUCCESS,
    NEW_COLOR_FAIL,
    COLOR_DETAILS_REQUEST,
    COLOR_DETAILS_SUCCESS,
    COLOR_DETAILS_FAIL,
    DELETE_COLOR_SUCCESS,
    DELETE_COLOR_FAIL,
    DELETE_COLOR_REQUEST,
    UPDATE_COLOR_REQUEST,
    UPDATE_COLOR_SUCCESS,
    UPDATE_COLOR_FAIL,
    ALL_COLOR_REQUEST,
    ALL_COLOR_SUCCESS,
    ALL_COLOR_FAIL
} from '../constants/productConstants'

export const getProduct = (keyword = '', currentPage = 1, price, cat, brands, rating = 0) => async (dispatch) => {

    try {
        dispatch({
            type: ALL_PRODUCTS_REQUEST
        })

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&ratings[gte]=${rating}`
        if (cat) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${cat}&ratings[gte]=${rating}`
        }
        if (brands) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&brand=${brands}&ratings[gte]=${rating}`
        }
        const { data } = await axios.get(link)

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const gettopProduct = (sort, order) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_TOP_PRODUCTS_REQUEST
        })


        const { data } = await axios.get(`/api/v1/topproduct?sort=${sort}&order=${order}`)
        dispatch({
            type: ALL_TOP_PRODUCTS_SUCCESS,
            payload: data.top_product
        })
    } catch (error) {
        dispatch({
            type: ALL_TOP_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const getBestProduct = (sort, order) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_BEST_PRODUCTS_REQUEST
        })
        const { data } = await axios.get(`/api/v1/topproduct?sort=${sort}&order=${order}`);
        dispatch({
            type: ALL_BEST_PRODUCTS_SUCCESS,
            payload: data.top_product
        })
    } catch (error) {
        dispatch({
            type: ALL_BEST_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const getcategoryProducts = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCTS_CATEGORY_REQUEST
        })

        let link = `/api/v1/product/category/${id}`
        const { data } = await axios.get(link)
        dispatch({
            type: ALL_PRODUCTS_CATEGORY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getbrandProducts = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCTS_BRAND_REQUEST
        })

        let link = `/api/v1/product/brand/${id}`
        const { data } = await axios.get(link)
        dispatch({
            type: ALL_PRODUCTS_BRAND_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_BRAND_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/review`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newProduct = (productData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PRODUCT_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/product/${id}`)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminProducts = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PRODUCTS_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/products`)

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })

    } catch (error) {

        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const updateProduct = (id, productData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCT_RESET })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateProductStatus = (id, productData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCT_STATUS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/product/status/${id}`, productData, config)

        dispatch({
            type: UPDATE_PRODUCT_STATUS_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        dispatch({
            type: UPDATE_PRODUCT_STATUS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getProductReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_REVIEWS_REQUEST })

        const { data } = await axios.get(`/api/v1/reviews?id=${id}`)

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {

        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const deleteReview = (id, productId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REVIEW_REQUEST })

        const { data } = await axios.delete(`/api/v1/reviews?id=${id}&productId=${productId}`)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}
export const getColor = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_COLOR_REQUEST
        })

        const { data } = await axios.get('/api/v1/admin/color')
        dispatch({
            type: ALL_COLOR_SUCCESS,
            payload: data.color
        })
    } catch (error) {
        dispatch({
            type: ALL_COLOR_FAIL,
            payload: error.response.data.message
        })
    }
}
export const newColor = (colorData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_COLOR_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/color/new`, colorData, config)

        dispatch({
            type: NEW_COLOR_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_COLOR_FAIL,
            payload: error.response.data.message
        })
    }
}
export const getColorDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: COLOR_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/color/${id}`)

        dispatch({
            type: COLOR_DETAILS_SUCCESS,
            payload: data.color
        })

    } catch (error) {
        dispatch({
            type: COLOR_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const colorDelete = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_COLOR_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/color/${id}`)

        dispatch({
            type: DELETE_COLOR_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_COLOR_FAIL,
            payload: error.response.data.message
        })
    }
}
export const updateColor = (id, colorData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_COLOR_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/color/${id}`, colorData, config)

        dispatch({
            type: UPDATE_COLOR_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        dispatch({
            type: UPDATE_COLOR_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}