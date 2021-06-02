import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import MetaData from '../layout/MetaData';
import { createOrder } from '../../actions/orderAction';
import { removeItemFromCart } from '../../actions/cartActions';

function ConfirmOrder({ history }) {
  const { cartItems, shippingInfo } = useSelector(state => state.cart)
  const [radio, setRadio] = useState("cashondelivery");
  const [t, i18n] = useTranslation('common');
  const rt1 = (i18n.language === 'pk' ? 'text-right' : 'text-left')
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shippingPrice = itemsPrice > 200 ? 0 : 25
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)
  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice
    }
    sessionStorage.setItem('orderInfo', JSON.stringify(data))
    if (radio === "cashondelivery") {
      const order = {
        orderItems: cartItems,
        shippingInfo
      }
      order.itemsPrice = itemsPrice
      order.shippingPrice = shippingPrice
      order.taxPrice = taxPrice
      order.totalPrice = totalPrice
      order.paymentInfo = {
        status: "padding",
        mode: "cash"
      }
      dispatch(createOrder(order))
      cartItems.map(item => (
        dispatch(removeItemFromCart(item.product))
      ))
      history.push('/success')
    }
    else {
      history.push('/payment')
    }
  }
  return (
    <React.Fragment>
      <MetaData title="Confirm Order" />
      <div className="container">
        <div className="row ">
          <div id="column-left" className="col-sm-4 col-md-4 col-lg-3 hidden-xs">
            <div className="left_banner left-sidebar-widget mb_50 mt_30"> <a href="!#"><img src="images/left1.jpg" alt="Left Banner" className="img-responsive" /></a> </div>

          </div>
          <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
            {/* =====  BANNER STRAT  ===== */}
            <div className="breadcrumb ptb_20">
              <h1 style={{ float: (i18n.language === 'pk' ? 'right' : '') }}>{t('confirm_order.confirm_order')}</h1>
              <ul style={{ float: (i18n.language === 'pk' ? 'left' : '') }}>
                <li><Link to={'/'}>{t('confirm_order.home')}</Link></li>
                <li className="active">{t('confirm_order.confirm_order')}</li>
              </ul>
            </div>
            {/* =====  BREADCRUMB END===== */}
            <p className={`${rt1}`}><b>{t('confirm_order.name')} : </b>{user && user.name} </p>
            <p className={`${rt1}`}><b>{t('confirm_order.phone')} : </b>{shippingInfo.phoneNo}</p>
            <p className={`mb_20 ${rt1}`}><b>{t('confirm_order.address')} : </b> {`${shippingInfo.address},${shippingInfo.city},${shippingInfo.postalCode}, ${shippingInfo.country}`} </p>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <td className={`${rt1}`}>{t('confirm_order.image')}</td>
                    <td className={`${rt1}`}>{t('confirm_order.name')}</td>
                    <td className={`${rt1}`}>{t('confirm_order.category')}</td>
                    <td className={`${rt1}`}>{t('confirm_order.category')}</td>
                    <td className={`${rt1}`}>{t('confirm_order.quantity')}</td>
                    <td className={`${rt1}`}>{t('confirm_order.unit_price')}</td>
                    <td className={`${rt1}`}>{t('confirm_order.total')}</td>
                  </tr>
                </thead>
                <tbody>

                  {cartItems.map(item => (
                    <React.Fragment>
                      <tr key={item.product}>
                        <td className={`${rt1}`}><Link to={`/product/${item.product}`}><img height={'70px'} width={'70px'} src={item.image} alt={item.name} title={item.name} /></Link></td>
                        <td className={`${rt1}`}><Link to={`/product/${item.product}`}>{item.name}</Link></td>
                        <td className={`${rt1}`}>{item.category}</td>
                        <td className={`${rt1}`}>{item.color}</td>
                        <td className={`${rt1}`}>{item.quantity}</td>
                        <td className={`${rt1}`}>${item.price}</td>
                        <td className={`${rt1}`}>${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-sm-6 col-sm-offset-6">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td className={`${rt1}`}><strong>{t('confirm_order.sub_total')}</strong></td>
                      <td className={`${rt1}`}>${itemsPrice}</td>
                    </tr>
                    <tr>
                      <td className={`${rt1}`}><strong>{t('confirm_order.shopping')}</strong></td>
                      <td className={`${rt1}`}>${shippingPrice}</td>
                    </tr>
                    <tr>
                      <td className={`${rt1}`}><strong>{t('confirm_order.tax')}</strong></td>
                      <td className={`${rt1}`}>${taxPrice}</td>
                    </tr>
                    <tr>
                      <td className={`${rt1}`}><strong>{t('confirm_order.total')}</strong></td>
                      <td className={`${rt1}`}>${totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="pull-right mt_20 ">
                <label >
                  <input type="radio" value="cashondelivery" name="redio1" checked={radio === "cashondelivery"} onChange={(e) => setRadio(e.target.value)} />
                  Cash On Delivery
                </label>
                <label >
                  <input type="radio" value="onlinepayment" name="redio1" checked={radio === "onlinepayment"} onChange={(e) => setRadio(e.target.value)} />
                  Online Payment
                </label>
              </div>
            </div>

            <button className={`btn pull-right mt_30 ${rt1}`} style={{ textAlign: (i18n.language === 'pk' ? 'right' : '') }} type="submit" onClick={processToPayment} >{t('confirm_order.order_success')}</button>
          </div>
        </div>
      </div>


    </React.Fragment>
  )

}

export default ConfirmOrder
