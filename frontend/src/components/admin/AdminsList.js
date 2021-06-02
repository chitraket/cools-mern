import { MDBDataTable } from 'mdbreact'
import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { allAdmins, clearErrors, deleteUser } from '../../actions/userActions'
import { DELETE_USER_RESET } from '../../constants/userConstants'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

const AdminsList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, admins } = useSelector(state => state.allAdmins);
    const { isDeleted } = useSelector(state => state.user);
    const { user } = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(allAdmins())
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success('User deleted successfully');
            history.push('/admin/users')
            dispatch({ type: DELETE_USER_RESET })
        }
    }, [dispatch, alert, error, isDeleted, history])
    const per = [];
    user && user.permission && user.permission.map((p, i) => {
        return per.push(p);
    })
    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }
    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        admins && admins.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions: <React.Fragment>
                    {per.includes("51") ?
                        <React.Fragment>
                            <Link to={`/admin/admins/${user._id}`} className="btn  py-1 px-2" style={{ marginLeft: '4px' }}>
                                <i className="fa fa-pencil"></i>
                            </Link>
                        </React.Fragment>
                        : ''
                    }
                    {
                        per.includes("52") ?
                            <React.Fragment>
                                <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(user._id)} style={{ marginLeft: '4px' }}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </React.Fragment>
                            : ''}
                </React.Fragment>
            })
        })

        return data
    }
    return (
        <React.Fragment>
            {
                per.includes("51") || per.includes("52") ?
                    <React.Fragment>
                        <div className="row">
                            <div className="col-12 col-md-2">
                                <Sidebar />
                            </div>

                            <div className="col-12 col-sm-9 col-md-9 col-lg-9 mt_30">
                                {/* =====  BANNER STRAT  ===== */}
                                <div className="breadcrumb ptb_20">
                                    <h1>All Admin</h1>
                                    <ul>
                                        <li><Link to={"/"}>Home</Link></li>
                                        <li className="active">All Admin</li>
                                    </ul>
                                </div>
                                {loading ? <Loader /> : (
                                    <MDBDataTable
                                        data={setUsers()}
                                        className="px-3"
                                        bordered
                                        striped
                                        hover
                                    />
                                )}
                            </div>
                        </div>
                    </React.Fragment>
                    : <Redirect to="/admin/error" />}
        </React.Fragment>
    )
}

export default AdminsList
