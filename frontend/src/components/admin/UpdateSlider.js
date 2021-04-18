import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearErrors, getSliderDetails, updateslider } from '../../actions/sliderActions'
import { UPDATE_SLIDER_RESET } from '../../constants/sliderConstants'

import Sidebar from './Sidebar' 

const UpdateSlider = ({ match,history}) => {
    const [name,setName]=useState('')
    const [url,setUrl]=useState('')
    const [oldImages,setOldImages]=useState([])
    const [images,setImages]=useState([])
    const [imagesPreview,setImagesPreview]=useState([])
    const alert = useAlert()
    const dispatch = useDispatch()
    const { error, slider} = useSelector(state => state.sliderDetails);
    const { loading , error:updateError , isUpdated } = useSelector(state => state.sliders);
    const sliderId = match.params.id;
    useEffect(()=> { 
        if(slider && slider._id !== sliderId){
            dispatch(getSliderDetails(sliderId))
        }else{
           setName(slider.name);
           setUrl(slider.url);
           setOldImages(slider.images.url);
        }
        if(error){
            alert.error(error) 
            dispatch(clearErrors())
        }
        if(updateError){
            alert.error(updateError) 
            dispatch(clearErrors())
        }
        if(isUpdated){
            history.push('/admin/sliders')
            alert.success('Slider Updated successfully')
            dispatch({ type: UPDATE_SLIDER_RESET })
        }
    },[dispatch,alert,error,isUpdated,history,updateError,sliderId,slider])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData =  new FormData();
         formData.set('name',name);
         formData.set('url',url)
         formData.set('images',images)
        dispatch(updateslider(slider._id,formData))
    }
    const onChanges = e => {
        const reader = new FileReader();
        reader.onload= () => {
            if(reader.readyState === 2){
                setImagesPreview(reader.result)
                setImages(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])  
    } 

    return (
<React.Fragment>
                         <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
        {/* =====  BANNER STRAT  ===== */}
        <div className="breadcrumb ptb_20">
              <h1>Update Slider</h1>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li className="active">Update Slider</li>
              </ul>
            </div>
      {/* contact  */}
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel-login">
            <div className="panel-body">
              <div className="row">
                <div className="col-lg-12">
                  <form  onSubmit={submitHandler} encType='multipart/form-data'>
                    <div className="form-group">
                    <input type="text" id="name_field" className="form-control"  placeholder="Name"  value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                    <input type="text" id="name_field" className="form-control"  placeholder="Url"  value={url} onChange={(e) => setUrl(e.target.value)}/>
                    </div>
                    <div className='form-group'>
                            <div className='d-flex align-items-center'>
                            <input
                                            type='file'
                                            name='product_images'
                                            className='form-control'
                                            id='customFile'
                                            onChange={onChanges}
                                        />
                                </div> 
                                    {
                                        imagesPreview.length ? <img src={imagesPreview} key={imagesPreview} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" /> : <img src={oldImages} key={oldImages} alt={oldImages} className="mt-3 mr-2" width="55" height="52" />
                                    }
                            </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                          <input type="submit" name="register-submit"  value="Update Category" id="register-submit" tabIndex={4} className="form-control btn btn-register"  disabled={loading ? true:false} />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>    
        </div>
        </React.Fragment>
    )
}

export default UpdateSlider
