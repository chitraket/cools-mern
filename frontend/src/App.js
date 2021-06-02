import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import React, { useEffect, useState } from 'react'
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import UpdateProfile from './components/user/UpdateProfile';
import ProductDetails from './components/product/ProductDetails';
import ProductFilter from './components/product/ProductFilter';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';

import ProtectedRoute from './components/route/ProtectedRoute'
import { loadUser } from './actions/userActions'
import store from './store'
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import axios from 'axios';
import Payment from './components/cart/Payment';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';
import Deshboard from './components/admin/Dashboard'
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';
import NewCategory from './components/admin/NewCategory';
import CategoryList from './components/admin/CategoryList';
import UpdateCategory from './components/admin/UpdateCategory';
import NewBrand from './components/admin/NewBrand';
import BrandList from './components/admin/brandList';
import UpdateBrand from './components/admin/UpdateBrand';
import CategoryProduct from './components/category/CategoryProduct';
import BrandProduct from './components/brand/BrandProduct';
import Favorite from './components/user/Favorite';
import NewSlider from './components/admin/NewSlider';
import SliderList from './components/admin/SliderList';
import UpdateSlider from './components/admin/UpdateSlider';
import setAuthToken from './utils/setAuthToken';
import NotFound from './components/NotFound';
import DateOrder from './components/admin/DateOrder';
import AdminsList from './components/admin/AdminsList';
import UpdateAdmin from './components/admin/UpdateAdmin';
import NewAdmin from './components/admin/NewAdmin';
import AdminError from './components/admin/AdminError';
import NewColor from './components/admin/NewColor';
import ColorList from './components/admin/ColorList';
import UpdateColor from './components/admin/UpdateColor';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');
  useEffect(() => {
    if (localStorage.token && localStorage.user) {
      setAuthToken(localStorage.token)
      store.dispatch(loadUser())
    }
    if (localStorage.token) {
      async function getStripApiKey() {
        const { data } = await axios.get('/api/v1/stripeapi');
        setStripeApiKey(data.stripeApiKey)
      }
      getStripApiKey();
    }
  }, [])
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/product/:id" component={ProductDetails} exact />
        <Route path="/category/:id" component={CategoryProduct} exact />
        <Route path="/brand/:id" component={BrandProduct} exact />
        <Route path="/search/:keyword" component={ProductFilter} exact />
        <Route path="/search/category/:cat" component={ProductFilter} exact />
        <Route path="/search/brand/:brands" component={ProductFilter} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/404" component={NotFound} />
        <Route path="/admin/error" component={AdminError} />
        <ProtectedRoute path="/shipping" isUser={true} component={Shipping} exact />
        <ProtectedRoute path="/confirm" isUser={true} component={ConfirmOrder} exact />
        <ProtectedRoute path="/success" isUser={true} component={OrderSuccess} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/password/forgot" component={ForgotPassword} />
        <Route path="/password/reset/:token" component={NewPassword} />
        <ProtectedRoute path="/me" component={Profile} exact />
        <ProtectedRoute path="/me/favorite" isUser={true} component={Favorite} exact />
        <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
        <ProtectedRoute path="/password/update" component={UpdatePassword} exact />
        <ProtectedRoute path="/orders/me" isUser={true} component={ListOrders} exact />
        <ProtectedRoute path="/order/:id" isUser={true} component={OrderDetails} exact />
        <ProtectedRoute path="/dashboard" isAdmin={true} component={Deshboard} exact />
        <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact />
        <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact />
        <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />
        <ProtectedRoute path="/admin/category" isAdmin={true} component={NewCategory} exact />
        <ProtectedRoute path="/admin/category/:id" isAdmin={true} component={UpdateCategory} exact />
        <ProtectedRoute path="/admin/categorys" isAdmin={true} component={CategoryList} exact />
        <ProtectedRoute path="/admin/brand" isAdmin={true} component={NewBrand} exact />
        <ProtectedRoute path="/admin/brand/:id" isAdmin={true} component={UpdateBrand} exact />
        <ProtectedRoute path="/admin/brands" isAdmin={true} component={BrandList} exact />
        <ProtectedRoute path="/admin/color" isAdmin={true} component={NewColor} exact />
        <ProtectedRoute path="/admin/color/:id" isAdmin={true} component={UpdateColor} exact />
        <ProtectedRoute path="/admin/colors" isAdmin={true} component={ColorList} exact />
        <ProtectedRoute path="/admin/slider" isAdmin={true} component={NewSlider} exact />
        <ProtectedRoute path="/admin/slider/:id" isAdmin={true} component={UpdateSlider} exact />
        <ProtectedRoute path="/admin/sliders" isAdmin={true} component={SliderList} exact />
        <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact />
        <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact />
        <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact />
        <ProtectedRoute path="/admin/admins" isAdmin={true} component={AdminsList} exact />
        <ProtectedRoute path="/admin/admins/add" isAdmin={true} component={NewAdmin} exact />
        <ProtectedRoute path="/admin/admins/:id" isAdmin={true} component={UpdateAdmin} exact />
        <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />
        <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact />
        <ProtectedRoute path="/admin/orders/date" isAdmin={true} component={DateOrder} exact />
        {stripeApiKey &&
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path="/payment" isUser={true} component={Payment} />
          </Elements>
        }
        <Redirect to="/404" />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
