import axios from "axios"
import { ADMIN_CATEGORY_FAIL, ADMIN_CATEGORY_REQUEST, ADMIN_CATEGORY_SUCCESS, ALL_CATEGORY_FAIL, ALL_CATEGORY_REQUEST, ALL_CATEGORY_SUCCESS, CATEGORY_DETAILS_FAIL, CATEGORY_DETAILS_REQUEST, CATEGORY_DETAILS_SUCCESS, CLEAR_ERRORS, DELETE_CATEGORY_FAIL, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, NEW_CATEGORY_FAIL, NEW_CATEGORY_REQUEST, NEW_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAIL, UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_STATUS_FAIL, UPDATE_CATEGORY_STATUS_REQUEST, UPDATE_CATEGORY_STATUS_SUCCESS, UPDATE_CATEGORY_SUCCESS } from "../constants/categoryConstants"

  
export const getCategory = () => async(dispatch) =>{
    try{
        dispatch({
            type:ALL_CATEGORY_REQUEST
        })

        const { data } = await axios.get('/api/v1/categorys')
        dispatch({
            type:ALL_CATEGORY_SUCCESS,
            payload:data.category
        })
    }catch(error){
        dispatch({
            type:ALL_CATEGORY_FAIL,
            payload:error.response.data.message
        })
    }
}
export const newCategory = (categoryData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_CATEGORY_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/category/new`, categoryData, config)

        dispatch({
            type: NEW_CATEGORY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}
export const getCategoryDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: CATEGORY_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/category/${id}`)

        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data.category
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const categoryDelete = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_CATEGORY_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/category/${id}`)

        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}
export const updateCategory = (id,categoryData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_CATEGORY_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/category/${id}`, categoryData, config)

        dispatch({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}
export const updateCategoryStatus = (id,categoryData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_CATEGORY_STATUS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/category/status/${id}`, categoryData, config)

        dispatch({
            type: UPDATE_CATEGORY_STATUS_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        dispatch({
            type: UPDATE_CATEGORY_STATUS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const getAdminCategory = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_CATEGORY_REQUEST })

        const { data } = await axios.get('/api/v1/admin/category')

        dispatch({
            type: ADMIN_CATEGORY_SUCCESS,
            payload: data.category
        })

    } catch (error) {

        dispatch({
            type: ADMIN_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type:CLEAR_ERRORS
    })
}
