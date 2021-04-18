import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearErrors, getBrandDetails, updateBrand } from '../../actions/brandActions'
import { UPDATE_BRAND_RESET } from '../../constants/brandConstants'

import Sidebar from './Sidebar' 

const UpdateBrand = ({ history , match}) => {
    const [name,setName]=useState('')
    const [oldImages,setOldImages]=useState([])
    const [images,setImages]=useState([])
    const [imagesPreview,setImagesPreview]=useState([])
    const [oldSliderImages,setOldSliderImages]=useState([])
    const [sliderImages,setSliderImages]=useState([])
    const [imagesSliderPreview,setImagesSliderPreview]=useState([])
    const [description,setDescription] = useState('')
    const alert = useAlert()
    const dispatch = useDispatch()
    const { error, brand} = useSelector(state => state.brandDetails);
    const { loading , error:updateError , isUpdated } = useSelector(state => state.brands);
    const brandId = match.params.id;
    useEffect(()=> { 
        if(brand && brand._id !== brandId){
            dispatch(getBrandDetails(brandId))
        }else{
          setName(brand.name);
           setOldImages(brand.images.url);
           setOldSliderImages(brand.sliders);
           setDescription(brand.description);
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
            history.push('/admin/brands')
            alert.success('Brand Updated successfully')
            dispatch({ type: UPDATE_BRAND_RESET })
        }
    },[dispatch,alert,error,isUpdated,history,updateError,brandId,brand])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData =  new FormData();
         formData.set('name',name);
         formData.set('images',images)
         formData.set('description',description)
         sliderImages.forEach(image =>{
          formData.append('sliders',image)
        })
        dispatch(updateBrand(brand._id,formData))
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
const onChange = e => {

  const files = Array.from(e.target.files)

  setImagesSliderPreview([]);
  setSliderImages([])
  setOldSliderImages([])

  files.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
          if (reader.readyState === 2) {
              setImagesSliderPreview(oldArray => [...oldArray, reader.result])
              setSliderImages(oldArray => [...oldArray, reader.result])
          }
      }

      reader.readAsDataURL(file)
  })
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
              <h1>Update Brand</h1>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li className="active">Update Brand</li>
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
                        <textarea className="form-control" id="description_field" rows={8} placeholder="Description" value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
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
                            <div className='form-group'>
                            <div className='d-flex align-items-center'>
                            <input
                                            type='file'
                                            name='product_images'
                                            className='form-control'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                </div>
                                {oldSliderImages && oldSliderImages.map(imags => (
                                    <img src={imags.url} key={imags.url} alt={imags.url} className="mt-3 mr-2" width="55" height="52" />
                                ))}
                                {imagesSliderPreview.map(img => (
                                        <img src={img} key={img} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                    ))}
                            </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                          <input type="submit" name="register-submit"  value="Update Brand" id="register-submit" tabIndex={4} className="form-control btn btn-register"  disabled={loading ? true:false} />
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

export default UpdateBrand
