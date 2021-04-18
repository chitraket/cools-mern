import { MDBDataTable } from 'mdbreact'
import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { allOrders, clearErrors, deleteOrder, updateOrder } from '../../actions/orderAction'
import { DELETE_ORDER_RESET, UPDATE_ORDER_RESET } from '../../constants/orderConstants'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import { PDFDownloadLink} from '@react-pdf/renderer';
import Invoice from './Invoice'


const OrdersList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted ,isUpdated} = useSelector(state => state.order);
    useEffect(() => {
        dispatch(allOrders())
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success('Order deleted successfully');
            history.push('/admin/orders');
            dispatch({ type: DELETE_ORDER_RESET })
        }
        if (isUpdated) {
            alert.success('Order Updated successfully')
            history.push('/admin/orders');
            dispatch({ type: UPDATE_ORDER_RESET })
        }
    },[dispatch, alert, error,isDeleted,history,isUpdated])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }
    const updateOrderHandler = (id,status) => {
        const formData = new FormData();
        formData.set('status', status);
        dispatch(updateOrder(id, formData))
    }
    const showDownloadLink = (order) => (
        <PDFDownloadLink document={
            <Invoice order={order} />
            // <Document>
            //     <Page size="A4">
            //         <View>
            //             <Text>Section #1</Text>
            //             <Text>Section #2</Text>
            //         </View>
            //     </Page>
            // </Document>
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
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No of Items',
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
                },
            ],
            rows: []
        }
      orders && orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: <React.Fragment>
                     { order.orderStatus && String(order.orderStatus).includes('Delivered') 
                   ? <p style={{ color: 'green' }}>{order.orderStatus}</p> 
                   : order.orderStatus && String(order.orderStatus).includes('Cancel')
                   ? <p style={{color:'red'}}>{order.orderStatus}</p>
                   :
                                  <div className="form-group" key={order._id}>
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={order.orderStatus}
                                            onChange={(e) => updateOrderHandler(order._id,e.target.value)} >
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>
                    }
                </React.Fragment>,
                actions: <React.Fragment>
                  
                    <Link to={`/admin/order/${order._id}`} className="btn  py-1 px-2" style={{marginLeft:'4px'}}>
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button className="btn" onClick={() => deleteOrderHandler(order._id)} style={{marginLeft:'4px'}}>
                        <i className="fa fa-trash"></i>
                    </button>
                      {showDownloadLink(order)}
                </React.Fragment>
            })
        })

        return data
    }
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-sm-9 col-md-9 col-lg-9 mt_30">
                        {/* =====  BANNER STRAT  ===== */}
                        <div className="breadcrumb ptb_20">
                            <h1>All Orders</h1>
                            <ul>
                                <li><Link  to={"/"}>Home</Link></li>
                                <li className="active">All Orders</li>
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
        </React.Fragment>
    )
}

export default OrdersList
