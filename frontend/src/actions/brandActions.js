import axios from "axios"
import { ADMIN_BRAND_FAIL, ADMIN_BRAND_REQUEST, ADMIN_BRAND_SUCCESS, ALL_BRAND_FAIL, ALL_BRAND_REQUEST, ALL_BRAND_SUCCESS, BRAND_DETAILS_FAIL, BRAND_DETAILS_REQUEST, BRAND_DETAILS_SUCCESS, CLEAR_ERRORS, DELETE_BRAND_FAIL, DELETE_BRAND_REQUEST, DELETE_BRAND_SUCCESS, NEW_BRAND_FAIL, NEW_BRAND_REQUEST, NEW_BRAND_SUCCESS, UPDATE_BRAND_FAIL, UPDATE_BRAND_REQUEST, UPDATE_BRAND_STATUS_FAIL, UPDATE_BRAND_STATUS_REQUEST, UPDATE_BRAND_STATUS_SUCCESS, UPDATE_BRAND_SUCCESS } from "../constants/brandConstants"


export const getBrand = () => async(dispatch) =>{
    try{
        dispatch({
            type:ALL_BRAND_REQUEST
        })

        const { data } = await axios.get('/api/v1/brands')
        dispatch({
            type:ALL_BRAND_SUCCESS,
            payload:data.brand
        })
    }catch(error){
        dispatch({
            type:ALL_BRAND_FAIL,
            payload:error.response.data.message
        })
    }
}
export const newBrand = (brandData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_BRAND_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/brand/new`, brandData, config)

        dispatch({
            type: NEW_BRAND_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_BRAND_FAIL,
            payload: error.response.data.message
        })
    }
}
export const getBrandDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: BRAND_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/brand/${id}`)

        dispatch({
            type: BRAND_DETAILS_SUCCESS,
            payload: data.brand
        })

    } catch (error) {
        dispatch({
            type: BRAND_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const brandDelete = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_BRAND_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/brand/${id}`)

        dispatch({
            type: DELETE_BRAND_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_BRAND_FAIL,
            payload: error.response.data.message
        })
    }
}
export const updateBrand = (id,brandData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_BRAND_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/brand/${id}`, brandData, config)

        dispatch({
            type: UPDATE_BRAND_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        dispatch({
            type: UPDATE_BRAND_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateBrandStatus = (id,brandData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_BRAND_STATUS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/brand/status/${id}`, brandData, config)

        dispatch({
            type: UPDATE_BRAND_STATUS_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        dispatch({
            type: UPDATE_BRAND_STATUS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminBrand = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_BRAND_REQUEST })

        const { data } = await axios.get('/api/v1/admin/brand')

        dispatch({
            type: ADMIN_BRAND_SUCCESS,
            payload: data.brand
        })

    } catch (error) {

        dispatch({
            type: ADMIN_BRAND_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type:CLEAR_ERRORS
    })
}
