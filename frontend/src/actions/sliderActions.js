import axios from "axios"
import { ADMIN_SLIDER_FAIL, ADMIN_SLIDER_REQUEST, ADMIN_SLIDER_SUCCESS, ALL_SLIDER_FAIL, ALL_SLIDER_REQUEST, ALL_SLIDER_SUCCESS, CLEAR_ERRORS, DELETE_SLIDER_FAIL, DELETE_SLIDER_REQUEST, DELETE_SLIDER_SUCCESS, NEW_SLIDER_FAIL, NEW_SLIDER_REQUEST, NEW_SLIDER_SUCCESS, SLIDER_DETAILS_FAIL, SLIDER_DETAILS_REQUEST, SLIDER_DETAILS_SUCCESS, UPDATE_SLIDER_FAIL, UPDATE_SLIDER_REQUEST, UPDATE_SLIDER_STATUS_FAIL, UPDATE_SLIDER_STATUS_REQUEST, UPDATE_SLIDER_STATUS_SUCCESS, UPDATE_SLIDER_SUCCESS } from "../constants/sliderConstants"

  
export const getSlider = () => async(dispatch) =>{
    try{
        dispatch({
            type:ALL_SLIDER_REQUEST
        })

        const { data } = await axios.get('/api/v1/sliders')
        dispatch({
            type:ALL_SLIDER_SUCCESS,
            payload:data.slider
        })
    }catch(error){
        dispatch({
            type:ALL_SLIDER_FAIL,
            payload:error.response.data.message
        })
    }
}
export const newSlider = (SliderData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_SLIDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/slider/new`, SliderData, config)

        dispatch({
            type: NEW_SLIDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_SLIDER_FAIL,
            payload: error.response.data.message
        })
    }
}
export const getSliderDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: SLIDER_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/slider/${id}`)

        dispatch({
            type: SLIDER_DETAILS_SUCCESS,
            payload: data.slider
        })

    } catch (error) {
        dispatch({
            type: SLIDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const sliderDelete = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_SLIDER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/slider/${id}`)

        dispatch({
            type: DELETE_SLIDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_SLIDER_FAIL,
            payload: error.response.data.message
        })
    }
}
export const updateslider = (id,sliderData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_SLIDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/slider/${id}`, sliderData, config)

        dispatch({
            type: UPDATE_SLIDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        dispatch({
            type: UPDATE_SLIDER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateSliderStatus = (id,sliderData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SLIDER_STATUS_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/slider/status/${id}`, sliderData, config)
        dispatch({
            type: UPDATE_SLIDER_STATUS_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_SLIDER_STATUS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminSlider = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_SLIDER_REQUEST })

        const { data } = await axios.get('/api/v1/admin/slider')

        dispatch({
            type: ADMIN_SLIDER_SUCCESS,
            payload: data.slider
        })

    } catch (error) {

        dispatch({
            type: ADMIN_SLIDER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type:CLEAR_ERRORS
    })
}
