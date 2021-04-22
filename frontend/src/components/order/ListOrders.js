import React, { useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import { myOrders, clearErrors } from '../../actions/orderAction'
import Loader from '../layout/Loader';
import { Link } from 'react-router-dom';
import { PDFDownloadLink} from '@react-pdf/renderer';
import Invoice from '../admin/Invoice';

const ListOrders = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, error, orders } = useSelector(state => state.myOrders)
    useEffect(() => {
        dispatch(myOrders())
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])
    const showDownloadLink = (order) => (
        <PDFDownloadLink document={
            <Invoice order={order} />
        }
        fileName="invoice.pdf"
        className="btn" 
        style={{marginLeft:'4px'}}
        >
           <i className="fa fa-file-pdf-o"></i>
        </PDFDownloadLink>
    )
    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order Id',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Num of Items',
                    field: 'numofItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }
        orders && orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions: <React.Fragment>
                <Link to={`/order/${order._id}`}  className="btn"><i className="fa fa-eye"></i></Link>
                {order.orderStatus && String(order.orderStatus).includes('Delivered') ? showDownloadLink(order) : ''}
                </React.Fragment>
            })
        })
        return data
    }
    return ( 
        <React.Fragment>
            <div className="container">
                <div className="row ">
                    <div id="column-left" className="col-sm-4 col-md-4 col-lg-3 hidden-xs">
                        <div className="left_banner left-sidebar-widget mb_50 mt_30"> <Link to={'!#'}><img src="../images/left1.jpg" alt="Left Banner" className="img-responsive" /></Link> </div>
                    </div>
                    <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
                        {/* =====  BANNER STRAT  ===== */}
                        <div className="breadcrumb ptb_20">
                            <h1>My Orders</h1>
                            <ul>
                                <li><Link  to={"/"}>Home</Link></li>
                                <li><Link  to={"/me"}>Profile</Link></li>
                                <li className="active">My Orders</li>
                            </ul>
                        </div>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setOrders()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ListOrders
