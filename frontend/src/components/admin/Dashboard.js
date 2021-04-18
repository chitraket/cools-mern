import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { allOrders, allTotalOrders, allUserOrders } from '../../actions/orderAction';
import { getAdminProducts } from '../../actions/productsActions';
import { allUsers } from '../../actions/userActions';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar'

function Dashboard() {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders , totalAmount,loading } = useSelector(state => state.totalOrder)
    let outOfStock = 0;
    products && products.forEach(product => {
        if(product.stock === 0){
            outOfStock += 1;
        }
    });
    useEffect(()=> {
        dispatch(getAdminProducts())
        dispatch(allTotalOrders())
        dispatch(allUsers())
    },[dispatch])
    
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar/>
                </div>
                <div className="col-12 col-sm-9 col-md-9 col-lg-9 mt_30">
                        {/* =====  BANNER STRAT  ===== */}
                        <div className="breadcrumb ptb_20">
                            <h1>Dashboard</h1>
                            <ul>
                                <li><Link  to={"/"}>Dashboard</Link></li>
                                <li className="active">All Orders</li>
                            </ul>
                        </div>
                    
                    {loading ? <Loader /> : (
                        <React.Fragment>
                        <div className="row pr-4">
                            <div className="col-xl-12 col-sm-12 mb-3 pb_20">
                                <div className="card text-white bg-primary o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row pr-4">
                            <div className="col-xl-3 col-sm-6 mb-3 ">
                                <div className="card text-white bg-success o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size">Products<br /> <b>{products && products.length}</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                        <span className="float-left">View Details</span>
                                        <span className="float-right">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white bg-danger o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size">Orders<br /> <b>{orders && orders.length}</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                        <span className="float-left">View Details</span>
                                        <span className="float-right">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white bg-info o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                        <span className="float-left">View Details</span>
                                        <span className="float-right">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white bg-warning o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dashboard
