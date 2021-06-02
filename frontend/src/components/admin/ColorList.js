import { MDBDataTable } from 'mdbreact'
import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { clearErrors, colorDelete, getColor } from '../../actions/productsActions'
import { DELETE_COLOR_RESET } from '../../constants/productConstants'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

const ColorList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, color } = useSelector(state => state.color);
    const { error: deleteError, isDeleted } = useSelector(state => state.colors)
    const { user } = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(getColor())
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success('Color deleted successfully');
            history.push('/admin/colors');
            dispatch({ type: DELETE_COLOR_RESET })
        }
    }, [dispatch, alert, error, history, deleteError, isDeleted])
    const per = [];
    user && user.permission && user.permission.map((p, i) => {
        return per.push(p);
    })
    const setBrand = () => {
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
                    label: 'Code',
                    field: 'code',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        color && color.forEach(colors => {
            data.rows.push({
                id: colors._id,
                name: colors.name,
                code: colors.code,
                actions: <React.Fragment>
                    {per.includes("22") ?
                        <React.Fragment>
                            <Link to={`/admin/color/${colors._id}`} className="btn  py-1 px-2" style={{ marginLeft: '4px' }}>
                                <i className="fa fa-pencil"></i>
                            </Link>
                        </React.Fragment>
                        : ''
                    }
                    {
                        per.includes("23") ?
                            <React.Fragment>
                                <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteColorHandler(colors._id)} style={{ marginLeft: '4px' }}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </React.Fragment>
                            : ''}
                </React.Fragment>
            })
        })
        return data
    }
    const deleteColorHandler = (id) => {
        dispatch(colorDelete(id))
    }
    return (
        <React.Fragment>
            {
                per.includes("22") || per.includes("23") ?
                    <div className="row">
                        <div className="col-12 col-md-2">
                            <Sidebar />
                        </div>

                        <div className="col-12 col-sm-9 col-md-9 col-lg-9 mt_30">
                            <React.Fragment>
                                <div className="breadcrumb ptb_20">
                                    <h1>All Color</h1>
                                    <ul>
                                        <li><Link to={"/"}>Home</Link></li>
                                        <li className="active">All Color</li>
                                    </ul>
                                </div>

                                {loading ? <Loader /> : (
                                    <MDBDataTable
                                        data={setBrand()}
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

export default ColorList
