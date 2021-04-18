import React, { useEffect } from 'react'
import {useStripe,useElements,CardNumberElement,CardExpiryElement,CardCvcElement } from '@stripe/react-stripe-js'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { clearErrors, createOrder } from '../../actions/orderAction'
import { removeItemFromCart } from '../../actions/cartActions'
import { useTranslation } from "react-i18next";
import MetaData from '../layout/MetaData';
const options ={
    style:{
        base:{
            fontSize: '16px'
        },
        invalid:{
            color:'#9e2146'
        }
    }
}
const Payment = ({ history }) => {
  const [t, i18n] = useTranslation('common');
  const rt1 = ( i18n.language === 'pk' ? 'text-right' : '' )
    const alert = useAlert()
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { cartItems , shippingInfo } = useSelector(state => state.cart)
    const { error } = useSelector(state => state.newOrder)
    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch,alert,error])
    const order = {
        orderItems: cartItems,
        shippingInfo
    }
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    if(orderInfo){
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }
    const paymentDate = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }
    const submitHandler = async (e) => {
            e.preventDefault();
            document.querySelector("#pay_btn").disabled = true;
            let res;
            try{
                const config = {
                    headers: {
                        'Content-Type':'application/json'
                    }
                }
                res = await axios.post('/api/v1/payment/process', paymentDate, config )
                const clientSecret = res.data.client_secret;
                if(!stripe || !elements){
                    return;
                }
                const result = await stripe.confirmCardPayment(clientSecret,{
                    payment_method: {
                        card:elements.getElement(CardNumberElement),
                        billing_details:{
                            name:user.name,
                            email:user.email
                        }
                    }
                })
                if(result.error){
                    alert.error(result.error.message)
                    document.querySelector("#pay_btn").disabled = false;
                }else{
                    if(result.paymentIntent.status === 'succeeded'){
                        order.paymentInfo = {
                            id: result.paymentIntent.id,
                            status: result.paymentIntent.status
                        }
                        dispatch(createOrder(order))
                        {cartItems.map(item => (
                          dispatch(removeItemFromCart(item.product))
                        ))}
                        history.push('/success')
                    }else{
                        alert.error('There is some issus while payment processing')
                    }
                }
            }catch(error){
                document.querySelector("#pay_btn").disabled = false;
                alert.error(error.response.data.message)
            }
    }
    return (
        <React.Fragment>
          <MetaData title="Payment" />
      <div className="container">
        <div className="row ">
          <div id="column-left" className="col-sm-4 col-md-4 col-lg-3 hidden-xs">
            <div className="left_banner left-sidebar-widget mb_50 mt_30"> <a href="!#"><img src="images/left1.jpg" alt="Left Banner" className="img-responsive" /></a> </div>
          </div>
          <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
            {/* =====  BANNER STRAT  ===== */}
            <div className="breadcrumb ptb_20">
              <h1 style={{float:( i18n.language  === 'pk' ? 'right' : '')}}>{t('card_info.card_info')}</h1>
              <ul style={{float:( i18n.language  === 'pk' ? 'left' : '')}}>
                <li><Link to={'/'}>{t('card_info.home')}</Link></li>
                <li className="active">{t('card_info.card_info')}</li>
              </ul>
            </div>
            {/* =====  BREADCRUMB END===== */}
            <div className="panel-group">
              <div className="panel">
                <div className="panel-body">
                  <form className="form-horizontal" onSubmit={submitHandler}>
                    <div className="form-group required">
                      <label htmlFor="input-payment-address-1" className="col-sm-2 control-label">{t('card_info.card')}</label>
                      <div className="col-sm-10">
                        <CardNumberElement type="text" className={`form-control ${rt1}`} id="input-payment-address-1"  options={options}   />
                      </div>
                    </div>
                    <div className="form-group required">
                      <label htmlFor="input-payment-city" className="col-sm-2 control-label">{t('card_info.card_expiry')}</label>
                      <div className="col-sm-10">
                        <CardExpiryElement type="text" className={`form-control ${rt1}`} id="input-payment-city"  options={options} />
                      </div>
                    </div>
                    <div className="form-group required">
                      <label htmlFor="input-payment-city" className="col-sm-2 control-label">{t('card_info.card_cvc')}</label>
                      <div className="col-sm-10">
                        <CardCvcElement type="text" className={`form-control ${rt1}`} id="input-payment-city" options={options} />
                      </div>
                    </div>
                    <div className="buttons clearfix">
                      <div className="pull-right">
                        <button type="submit" className="btn"  id="pay_btn" > Pay {`- ${orderInfo && orderInfo.totalPrice}`} </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </React.Fragment>
    )
}

export default Payment
