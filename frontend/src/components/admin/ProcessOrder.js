import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearErrors, getOrderDetails, updateOrder } from '../../actions/orderAction'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

function ProcessOrder({ match }) {
    const [status, setStatus] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    const { error, isUpdated } = useSelector(state => state.order)

    const orderId = match.params.id;
    useEffect(() => {
        dispatch(getOrderDetails(orderId))
      //  setStatus(order.orderStatus)
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success('Order Updated successfully')
            dispatch({ type: UPDATE_ORDER_RESET })
        }

    }, [dispatch, alert, error, isUpdated, orderId])
    console.log(status)
    const updateOrderHandler = (id) => {
        const formData = new FormData();
        formData.set('status', status);
        dispatch(updateOrder(id, formData))
    }
    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode},${shippingInfo.country}`
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false
    const isMode = paymentInfo && paymentInfo.mode === 'cash' ? true : false
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className=" col-12  col-md-9 mt_30">
                    <React.Fragment>
                        {loading ? <Loader /> : (
                            <React.Fragment>
                                <div className="breadcrumb ptb_20">
                                    <h1>Shopping Info</h1>
                                    <ul>
                                        <li><Link to={"/"}>Home</Link></li>
                                        <li><Link to={"/admin/orders"}>Orders</Link></li>
                                        <li className="active">Shopping Info</li>
                                    </ul>
                                </div>
                                <p><b>Order # </b>{order._id} </p>
                                <p><b>Name:</b>{user && user.name} </p>
                                <p><b>Phone:</b>{shippingInfo && shippingInfo.phoneNo}</p>
                                <p><b>Adress:</b>{shippingDetails}</p>
                                <p><b>Amount:</b>{totalPrice}</p>
                                <p><b>Payment: </b> <label className={isPaid ? "greenColor" : "redColor"}>{isPaid ? "Paid" : "Not Paid"}</label> </p>
                                <p><b>Mode:</b><label className="greenColor"> {isMode ? "Cash On Delivery" : "Online Payment"}</label></p> 
                                <p><b>Order Status:</b><label className={order.orderStatus && String(order.orderStatus).includes("Delivered") ? "greenColor" : "redColor"}> {orderStatus}</label> </p>
                                {paymentInfo && paymentInfo.id ? <p><b>Online ID:</b>{ paymentInfo && paymentInfo.id}</p> : ''}
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
                                                        <td className="text-center"><Link to={`/products/${item.product}`}><img height={'70px'} width={'70px'} src={item.image} alt={item.name} title={item.name} /></Link></td>
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
                                <div className="col-12 col-lg-3">
                                    <h4 className="my-4">Status</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancel">Cancel</option>
                                        </select>
                                    </div>

                                    <button className="btn  btn-block" onClick={() => updateOrderHandler(order._id)}>
                                        Update Status
                                    </button>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProcessOrder
