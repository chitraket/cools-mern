import { MDBDataTable } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { allDateOrders } from '../../actions/orderAction'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

function DateOrder() {
    const [startdate, setStartdate] = useState('');
    const [enddate, setEnddate] = useState('');
    const alert = useAlert();
    const dispatch = useDispatch();
    const { orders, totalAmount, loading } = useSelector(state => state.dateorder)
    const { user } = useSelector(state => state.auth)
    useEffect(() => {
        if (startdate !== '' && enddate !== '') {
            dispatch(allDateOrders(startdate, enddate))
        }
    }, [dispatch, alert, startdate, enddate])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(allDateOrders(startdate, enddate))
    }
    const per = [];
    user && user.permission && user.permission.map((p, i) => {
        return per.push(p);
    })
    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Total Price',
                    field: 'totalPrice',
                    sort: 'asc'
                },
                {
                    label: 'Order Status',
                    field: 'orderStatus',
                    sort: 'asc'
                },
                {
                    label: 'Payment',
                    field: 'payment',
                    sort: 'asc'
                },
            ],
            rows: []
        }
        orders && orders.forEach(order => {
            data.rows.push({
                id: order._id,
                totalPrice: order.totalPrice,
                orderStatus: order.orderStatus,
                payment: order.paymentInfo && order.paymentInfo.mode,
            })
        })
        return data
    }
    return (
        <React.Fragment>
            {
                per.includes("17") ?
                    <React.Fragment>
                        <div className="row">
                            <div className="col-12 col-md-2">
                                <Sidebar />
                            </div>

                            <div className="col-12 col-sm-9 col-md-9 col-lg-9 mt_30">
                                {/* =====  BANNER STRAT  ===== */}
                                <div className="breadcrumb ptb_20">
                                    <h1>Payment</h1>
                                    <ul>
                                        <li><Link to={"/"}>Home</Link></li>
                                        <li className="active">Payment</li>
                                    </ul>
                                </div>
                                <div className="row justify-content-center mt-5">
                                    <div className="col-5">
                                        <form onSubmit={submitHandler}>
                                            <div className="form-group">
                                                <label htmlFor="productId_field">Enter start date</label>
                                                <input
                                                    type="date"
                                                    id="productId_field"
                                                    className="form-control"
                                                    value={startdate}
                                                    onChange={(e) => setStartdate(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="productId_field">Enter end date</label>
                                                <input
                                                    type="date"
                                                    id="productId_field"
                                                    className="form-control"
                                                    value={enddate}
                                                    onChange={(e) => setEnddate(e.target.value)}
                                                />
                                            </div>
                                            <button
                                                id="search_button"
                                                type="submit"
                                                className="btn btn-primary btn-block py-2"
                                            >
                                                SEARCH
                                            </button>
                                        </ form>
                                    </div>
                                </div>
                                {
                                    totalAmount ? <p>Total Amount : {totalAmount}</p> : ''
                                }
                                {orders && orders.length > 0 ? (

                                    loading ? <Loader /> : (

                                        <MDBDataTable
                                            data={setReviews()}
                                            className="px-3"
                                            bordered
                                            striped
                                            hover
                                        />
                                    )
                                ) : (
                                    <p className="mt-5 text-center">No order.</p>
                                )}

                            </div>
                        </div>
                    </React.Fragment>
                    : <Redirect to="/admin/error" />}
        </React.Fragment>
    )
}
export default DateOrder
