import { MDBDataTable } from 'mdbreact'
import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { categoryDelete, clearErrors, getAdminCategory, updateCategoryStatus } from '../../actions/categoryActions'
import { DELETE_CATEGORY_RESET, UPDATE_CATEGORY_STATUS_RESET } from '../../constants/categoryConstants'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

const CategoryList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, category } = useSelector(state => state.category);
    const { error: deleteError, isDeleted , isUpdatedStatus} = useSelector(state => state.categorys)
    useEffect(() => {
        dispatch(getAdminCategory())
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success('Category deleted successfully');
            history.push('/admin/categorys');
            dispatch({ type: DELETE_CATEGORY_RESET })
        }
        if(isUpdatedStatus){
            alert.success('Category status change');
            history.push('/admin/categorys');
            dispatch({type: UPDATE_CATEGORY_STATUS_RESET})
        }
    },[dispatch, alert, error, history,deleteError,isDeleted,isUpdatedStatus])

    const setCategorys = () => {
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
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
      category && category.forEach(categorys => {
            data.rows.push({
                id: categorys._id,
                name: categorys.name,
                actions: <React.Fragment>
                    {
                            categorys.status === "true" ? <button className="btn" onClick={(e)=>onChecked(categorys._id,true)} style={{marginLeft:'4px',borderRadius: '50px',  backgroundColor: '#28a745', borderColor: '#28a745'}}>ON</button> : <button className="btn" onClick={(e)=>onChecked(categorys._id,false)} style={{marginLeft:'4px',background:"red",borderRadius: '50px',backgroundColor: '#c82333',borderColor: '#bd2130'}}>OFF</button>
                     }
                    <Link to={`/admin/category/${categorys._id}`} className="btn  py-1 px-2" style={{marginLeft:'4px'}}>
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteCategoryHandler(categorys._id)} style={{marginLeft:'4px'}}>
                        <i className="fa fa-trash"></i>
                    </button>
                </React.Fragment>
            })
        })

        return data
    }
    const deleteCategoryHandler = (id) => {
        dispatch(categoryDelete(id))
    }
    const onChecked = (id,value) => {
        const formData =  new FormData();
         formData.set('status',!value);
        dispatch(updateCategoryStatus(id,formData))
     }
    return (
        <React.Fragment>
             <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-sm-9 col-md-9 col-lg-9 mt_30">
                    <React.Fragment>
                    <div className="breadcrumb ptb_20">
                            <h1>All Shape</h1>
                            <ul>
                                <li><Link  to={"/"}>Home</Link></li>
                                <li className="active">All Shape</li>
                            </ul>
                        </div>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setCategorys()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </React.Fragment>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CategoryList
