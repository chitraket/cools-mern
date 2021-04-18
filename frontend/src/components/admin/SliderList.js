import { MDBDataTable } from 'mdbreact'
import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearErrors, getAdminSlider, sliderDelete, updateSliderStatus } from '../../actions/sliderActions'
import { DELETE_SLIDER_RESET, UPDATE_SLIDER_STATUS_RESET } from '../../constants/sliderConstants'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

const SliderList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, slider } = useSelector(state => state.slider);
    const { error: deleteError, isDeleted ,isUpdatedStatus } = useSelector(state => state.sliders);
    console.log(slider)
    useEffect(() => {
        dispatch(getAdminSlider())
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success('Slider deleted successfully');
            history.push('/admin/sliders');
            dispatch({ type: DELETE_SLIDER_RESET })
        }
        if(isUpdatedStatus){
            alert.success('Slider status change');
            history.push('/admin/sliders');
            dispatch({type: UPDATE_SLIDER_STATUS_RESET})
        }
    },[dispatch, alert, error, history,deleteError,isDeleted,isUpdatedStatus])

    const setSlider = () => {
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
      slider && slider.forEach(sliders => {
            data.rows.push({
                id: sliders._id,
                name: sliders.name,
                actions: <React.Fragment>
                    {
                            sliders.status === "true" ? <button className="btn" onClick={(e)=>onChecked(sliders._id,true)} style={{marginLeft:'4px',borderRadius: '50px',  backgroundColor: '#28a745', borderColor: '#28a745'}}>ON</button> : <button className="btn" onClick={(e)=>onChecked(sliders._id,false)} style={{marginLeft:'4px',background:"red",borderRadius: '50px',backgroundColor: '#c82333',borderColor: '#bd2130'}}>OFF</button>
                     }
                    <Link to={`/admin/slider/${sliders._id}`} className="btn  py-1 px-2" style={{marginLeft:'4px'}}>
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteSliderHandler(sliders._id)} style={{marginLeft:'4px'}}>
                        <i className="fa fa-trash"></i>
                    </button>
                </React.Fragment>
            })
        })

        return data
    }
    const deleteSliderHandler = (id) => {
        dispatch(sliderDelete(id))
    }
    const onChecked = (id,value) => {
        const formData =  new FormData();
         formData.set('status',!value);
        dispatch(updateSliderStatus(id,formData))
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
                            <h1>All Slider</h1>
                            <ul>
                                <li><Link  to={"/"}>Home</Link></li>
                                <li className="active">All Slider</li>
                            </ul>
                        </div>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setSlider()}
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

export default SliderList
