import axios from 'axios'
import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from '../constants/cartConstants'

export const addItemToCart = (id, quantity, color) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`)
    const productprice = data.product.attribute && data.product.attribute
        .filter((p) => color && p.color && p.color.name === color).map((item) => item.price)
    const productimage = data.product.attribute && data.product.attribute
        .filter((p) => color && p.color && p.color.name === color).map((item) => item.images[0].url)
    const productqty = data.product.attribute && data.product.attribute
        .filter((p) => color && p.color && p.color.name === color).map((item) => item.qty)
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            color: color,
            price: productprice[0],
            category: data.product.category && data.product.category.name,
            image: productimage[0],
            stock: productqty[0],
            quantity
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const removeItemFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })
    localStorage.setItem('shippingInfo', JSON.stringify(data))
}