import { MDBDataTable } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { clearErrors, deleteReview, getProductReviews } from '../../actions/productsActions'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

const ProductReviews = () => {
    const [productId, setProductId] = useState('');
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, reviews } = useSelector(state => state.productReviews);
    const { isDeleted } = useSelector(state => state.review);
    const { user } = useSelector(state => state.auth)
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (productId !== '') {
            dispatch(getProductReviews(productId))
        }
        if (isDeleted) {
            alert.success('Review deleted successfully');
            dispatch({ type: DELETE_REVIEW_RESET })
        }

    }, [dispatch, alert, error, productId, isDeleted])
    const per = [];
    user && user.permission && user.permission.map((p, i) => {
        return per.push(p);
    })
    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId))
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId))
    }
    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        reviews && reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,
                actions: <React.Fragment>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteReviewHandler(review._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </React.Fragment>
            })
        })

        return data
    }
    return (
        <React.Fragment>
            {
                per.includes("20") ?
                    <React.Fragment>
                        <div className="row">
                            <div className="col-12 col-md-2">
                                <Sidebar />
                            </div>

                            <div className="col-12 col-sm-9 col-md-9 col-lg-9 mt_30">
                                {/* =====  BANNER STRAT  ===== */}
                                <div className="breadcrumb ptb_20">
                                    <h1>Product Review</h1>
                                    <ul>
                                        <li><Link to={"/"}>Home</Link></li>
                                        <li className="active">Product Review</li>
                                    </ul>
                                </div>
                                <div className="row justify-content-center mt-5">
                                    <div className="col-5">
                                        <form onSubmit={submitHandler}>
                                            <div className="form-group">
                                                <label htmlFor="productId_field">Enter Product ID</label>
                                                <input
                                                    type="text"
                                                    id="productId_field"
                                                    className="form-control"
                                                    value={productId}
                                                    onChange={(e) => setProductId(e.target.value)}
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
                                {reviews && reviews.length > 0 ? (
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
                                    <p className="mt-5 text-center">No Reviews.</p>
                                )}

                            </div>
                        </div>
                    </React.Fragment>
                    : <Redirect to="/admin/error" />}
        </React.Fragment>
    )
}

export default ProductReviews
