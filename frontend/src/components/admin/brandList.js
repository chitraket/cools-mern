import { MDBDataTable } from 'mdbreact'
import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { brandDelete, clearErrors, getAdminBrand, updateBrandStatus } from '../../actions/brandActions'
import { DELETE_BRAND_RESET, UPDATE_BRAND_STATUS_RESET } from '../../constants/brandConstants'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

const BrandList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, brand } = useSelector(state => state.brand);
    const { error: deleteError, isDeleted ,isUpdatedStatus} = useSelector(state => state.brands)
    useEffect(() => {
        dispatch(getAdminBrand())
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success('Brand deleted successfully');
            history.push('/admin/brands');
            dispatch({ type: DELETE_BRAND_RESET })
        }
        if(isUpdatedStatus){
            alert.success('Brand status change');
            history.push('/admin/brands');
            dispatch({type: UPDATE_BRAND_STATUS_RESET})
        }
    },[dispatch, alert, error, history,deleteError,isDeleted,isUpdatedStatus])

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
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
      brand && brand.forEach(brands => {
            data.rows.push({
                id: brands._id,
                name: brands.name,
                actions: <React.Fragment>
                     {
                            brands.status === "true" ? <button className="btn" onClick={(e)=>onChecked(brands._id,true)} style={{marginLeft:'4px',borderRadius: '50px',  backgroundColor: '#28a745', borderColor: '#28a745'}}>ON</button> : <button className="btn" onClick={(e)=>onChecked(brands._id,false)} style={{marginLeft:'4px',background:"red",borderRadius: '50px',backgroundColor: '#c82333',borderColor: '#bd2130'}}>OFF</button>
                     }
                    <Link to={`/admin/brand/${brands._id}`} className="btn  py-1 px-2" style={{marginLeft:'4px'}}>
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteBrandHandler(brands._id)} style={{marginLeft:'4px'}}>
                        <i className="fa fa-trash"></i>
                    </button>
                </React.Fragment>
            })
        })

        return data
    }
    const deleteBrandHandler = (id) => {
        dispatch(brandDelete(id))
    }
    const onChecked = (id,value) => {
        const formData =  new FormData();
         formData.set('status',!value);
        dispatch(updateBrandStatus(id,formData))
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
                            <h1>All Brand</h1>
                            <ul>
                                <li><Link  to={"/"}>Home</Link></li>
                                <li className="active">All Brand</li>
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
        </React.Fragment>
    )
}

export default BrandList
