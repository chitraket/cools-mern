import { MDBDataTable } from 'mdbreact'
import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { clearErrors, deleteProduct, getAdminProducts, updateProductStatus } from '../../actions/productsActions'
import { DELETE_PRODUCT_RESET, UPDATE_PRODUCT_STATUS_RESET } from '../../constants/productConstants'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

const ProductsList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted, isUpdatedStatus } = useSelector(state => state.product)
    const { user } = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(getAdminProducts())
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Product deleted successfully');
            history.push('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
        if (isUpdatedStatus) {
            alert.success('Product status change');
            history.push('/admin/products');
            dispatch({ type: UPDATE_PRODUCT_STATUS_RESET })
        }
    }, [dispatch, alert, error, deleteError, isDeleted, isUpdatedStatus, history])
    const per = [];
    user && user.permission && user.permission.map((p, i) => {
        return per.push(p);
    })
    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        products && products.forEach((product, index) => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.attribute[0] && product.attribute[0].price}`,
                stock: product.attribute[0] && product.attribute[0].qty,
                actions:
                    <React.Fragment>
                        {
                            per.includes("2") ?
                                <React.Fragment>
                                    {
                                        product.status === "true" ? <button className="btn" onClick={(e) => onChecked(e, product._id, true)} style={{ marginLeft: '4px', borderRadius: '50px', backgroundColor: '#28a745', borderColor: '#28a745' }}>ON</button> : <button className="btn" onClick={(e) => onChecked(e, product._id, false)} style={{ marginLeft: '4px', background: "red", borderRadius: '50px', backgroundColor: '#c82333', borderColor: '#bd2130' }}>OFF</button>
                                    }
                                    {
                                        product.status === "true" ?
                                            <Link to={`/admin/product/${product._id}`} className="btn  py-1 px-2" style={{ marginLeft: '4px' }}>
                                                <i className="fa fa-pencil"></i>
                                            </Link> : ''

                                    }
                                </React.Fragment>
                                : ''

                        }
                        {
                            per.includes("3") ?
                                <React.Fragment>
                                    <button className="btn py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)} style={{ marginLeft: '4px' }}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </React.Fragment>
                                : ''}
                    </React.Fragment>
            })
        })

        return data
    }
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }
    const onChecked = (e, id, value) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('status', !value);
        dispatch(updateProductStatus(id, formData))
    }


    return (
        <React.Fragment>
            {
                per.includes("2") || per.includes("3") ?
                    <div className="row">
                        <div className="col-12 col-md-2">
                            <Sidebar />
                        </div>

                        <div className="col-12 col-sm-9 col-md-9 col-lg-9 mt_30">
                            <React.Fragment>
                                <div className="breadcrumb ptb_20">
                                    <h1>All Products</h1>
                                    <ul>
                                        <li><Link to={"/"}>Home</Link></li>
                                        <li className="active">All Products</li>
                                    </ul>
                                </div>
                                {loading ? <Loader /> : (
                                    <MDBDataTable
                                        data={setProducts()}
                                        className="px-3"
                                        bordered
                                        striped
                                        hover
                                    />
                                )}

                            </React.Fragment>
                        </div>
                    </div>
                    : <Redirect to="/admin/error" />}
        </React.Fragment>
    )
}

export default ProductsList
