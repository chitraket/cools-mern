import { createStore,combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productsReducer,productDetailsReducer, topProductReducer, newReviewReducer, newProductReducer,productReducer, productReviewReducer, reviewReducer, categoryProductReducer, brandProductReducer, bestProductReducer } from './reducers/productReducers'
import { authReducer, userReducer,forgotPasswordReducer, allUsersReducer, userDetailsReducer, favoriteReducer, favoriteDetailsReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers';
import { allOrdersReducer, allTotalOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducers';
import { categoryDetailsReducer, categoryReducer, getCategoryReducer, newCategoryReducer } from './reducers/categoryReducers';
import { brandDetailsReducer, brandReducer, getBrandReducer, newBrandReducer } from './reducers/brandReducers';
import { getSliderReducer, newSliderReducer, sliderDetailsReducer, sliderReducer } from './reducers/sliderReducers';

const reducer = combineReducers({
    products: productsReducer,
    productDetails:productDetailsReducer,
    topproduct:topProductReducer,
    bestproduct:bestProductReducer,
    newProduct:newProductReducer,
    product: productReducer,
    productReviews: productReviewReducer,
    review:reviewReducer,
    favorite:favoriteReducer,
    list:favoriteDetailsReducer,
    newSlider:newSliderReducer,
    slider:getSliderReducer,
    sliders:sliderReducer,
    sliderDetails:sliderDetailsReducer,
    newCategory:newCategoryReducer,
    category:getCategoryReducer,
    categorys:categoryReducer,
    categoryDetails:categoryDetailsReducer,
    categoryProducts:categoryProductReducer,
    newBrand:newBrandReducer,
    brand:getBrandReducer,
    brands:brandReducer,
    brandDetails:brandDetailsReducer,
    brandProducts:brandProductReducer,
    auth:authReducer,
    user:userReducer,
    userDetails:userDetailsReducer,
    allUsers:allUsersReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    totalOrder:allTotalOrdersReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    allOrders:allOrdersReducer,
    orderDetails:orderDetailsReducer,
    order:orderReducer,
    newReview:newReviewReducer
})


let initialState = {
    cart: {
        cartItems:localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}

const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;