import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearErrors, newSlider } from '../../actions/sliderActions'
import { NEW_SLIDER_RESET } from '../../constants/sliderConstants'
import Sidebar from './Sidebar'

const NewSlider = ({ history }) => {
    const [name,setName]=useState('')
    const [url,setUrl]=useState('')
    const [images,setImages]=useState([])
    const [imagesPreview,setImagesPreview]=useState([])
    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading , error , success } = useSelector(state => state.newSlider);
    useEffect(()=> { 
        if(error){
            alert.error(error) 
            dispatch(clearErrors())
        }
        if(success){
            history.push('/admin/sliders')
            alert.success('Slider created successfully')
            dispatch({ type: NEW_SLIDER_RESET })
        }
    },[dispatch,alert,error,success,history])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData =  new FormData();
         formData.set('name',name);
        formData.set('url',url);
        formData.append('images', images)
        dispatch(newSlider(formData))
    }
    const onChanges = e => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
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
              <h1>New Slider</h1>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li className="active">New Slider</li>
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
                    <input type="text" id="price_field" className="form-control"  placeholder="Url" value={url} onChange={(e) => setUrl(e.target.value)} />
                    </div>
                    <div className='form-group'>
                    <div className='d-flex align-items-center'>
                                                        <input
                                                            type='file'
                                                            name='product_images'
                                                            className='form-control'
                                                            id='customFile'
                                                            ccept="iamges/*"
                                                            onChange={onChanges}
                                                        />
                                                    </div>
                                    <img src={imagesPreview} key={imagesPreview} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                            </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                          <input type="submit" name="register-submit"  value="Add Slider" id="register-submit" tabIndex={4} className="form-control btn btn-register"  disabled={loading ? true:false} />
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

export default NewSlider


