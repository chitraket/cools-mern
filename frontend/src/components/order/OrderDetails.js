import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearErrors, getOrderDetails, updateUserOrder } from '../../actions/orderAction'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'
import Loader from '../layout/Loader'

function OrderDetails({ match }) {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, order = {} } = useSelector(state => state.orderDetails)
  const { error: orderupdate, isUpdated } = useSelector(state => state.order)
  const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
    if (orderupdate) {
      alert.error(orderupdate);
      dispatch(clearErrors())
    }
    if (isUpdated) {
      alert.success('Order Updated successfully')
      dispatch({ type: UPDATE_ORDER_RESET })
    }
  }, [dispatch, alert, error, isUpdated, orderupdate, match.params.id])
  const updateOrderHandler = (id) => {
    const formData = new FormData();
    formData.set('status', 'Cancel');
    dispatch(updateUserOrder(id, formData))
  }
  const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
  const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

  return (
    <React.Fragment>
      {loading ? <Loader /> : (
        <React.Fragment>
          <div className="container">
            <div className="row ">
              <div id="column-left" className="col-sm-4 col-md-4 col-lg-3 hidden-xs">
                <div className="left_banner left-sidebar-widget mb_50 mt_30"> <a href="!#"><img src="../images/left1.jpg" alt="Left Banner" className="img-responsive" /></a> </div>

              </div>
              <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
                {/* =====  BANNER STRAT  ===== */}
                <div className="breadcrumb ptb_20">
                  <h1>Shopping Info</h1>
                  <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li className="active">Shopping Info</li>
                  </ul>
                </div>
                {/* =====  BREADCRUMB END===== */}
                <p><b>Order # </b>{order._id} </p>
                <p><b>Name:</b>{user && user.name} </p>
                <p><b>Phone:</b>{shippingInfo && shippingInfo.phoneNo}</p>
                <p><b>Adress:</b>{shippingDetails}</p>
                <p><b>Amount:</b>{totalPrice}</p>
                <p><b>Payment:</b><p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p> </p>
                <p><b>Order Status:</b><p className={order.orderStatus && String(order.orderStatus).includes("Delivered") ? "greenColor" : "redColor"}><b>{orderStatus}</b></p> </p>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <td className="text-center">Image</td>
                        <td className="text-left">Product Name</td>
                        <td className="text-left">Category</td>
                        <td className="text-left">Quantity</td>
                        <td className="text-right">Unit Price</td>
                        <td className="text-right">Total</td>
                      </tr>
                    </thead>
                    <tbody>

                      {orderItems && orderItems.map(item => (
                        <React.Fragment>
                          <tr key={item.product}>
                            <td className="text-center"><Link to={`/product/${item.product}`}><img height={'70px'} width={'70px'} src={item.image} alt={item.name} title={item.name} /></Link></td>
                            <td className="text-left"><Link to={`/products/${item.product}`}>{item.name}</Link></td>
                            <td className="text-left">{item.category}</td>
                            <td className="text-left">{item.quantity}</td>
                            <td className="text-right">${item.price}</td>
                            <td className="text-right">${(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
                {order.orderStatus === "Cancel" || order.orderStatus === "Delivered" ? '' :
                  <div className="col-12 col-lg-4">
                    <button className="btn  btn-block" onClick={() => updateOrderHandler(order._id)}>
                      Cancel Order
                                    </button>
                  </div>}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default OrderDetails
