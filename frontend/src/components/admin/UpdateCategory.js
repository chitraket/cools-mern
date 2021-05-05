import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearErrors, getCategoryDetails, updateCategory } from '../../actions/categoryActions'
import { UPDATE_CATEGORY_RESET } from '../../constants/categoryConstants'

import Sidebar from './Sidebar' 

const UpdateCategory = ({ history , match}) => {
    const [name,setName]=useState('')
    const [type,settype]=useState('')
    const [oldImages,setOldImages]=useState([])
    const [images,setImages]=useState([])
    const [imagesPreview,setImagesPreview]=useState([])
    const [oldSliderImages,setOldSliderImages]=useState([])
    const [sliderImages,setSliderImages]=useState([])
    const [imagesSliderPreview,setImagesSliderPreview]=useState([])
    const alert = useAlert()
    const dispatch = useDispatch()
    const { error, category} = useSelector(state => state.categoryDetails);
    const { loading , error:updateError , isUpdated } = useSelector(state => state.categorys);
    const categoryId = match.params.id;
    useEffect(()=> { 
        if(category && category._id !== categoryId){
            dispatch(getCategoryDetails(categoryId))
        }else{
           setName(category.name);
           setOldImages(category.images.url);
           setOldSliderImages(category.sliders);
           settype(category.type);
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
            history.push('/admin/categorys')
            alert.success('Category Updated successfully')
            dispatch({ type: UPDATE_CATEGORY_RESET })
        }
    },[dispatch,alert,error,isUpdated,history,updateError,categoryId,category])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData =  new FormData();
         formData.set('name',name);
         formData.set('images',images)
         formData.set('type',type)
         sliderImages.forEach(image =>{
          formData.append('sliders',image)
        })
        dispatch(updateCategory(category._id,formData))
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
              <h1>Update Shape</h1>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li className="active">Update Shape</li>
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
                    <select
                                            className="form-control"
                                            name='type'
                                            value={type}
                                            onChange={(e) => settype(e.target.value)} >
                                               <option value="" disabled> Select Page Type</option>
                                                <option value="store">Store</option>
                                                <option value="product">Product</option>
                                        </select>
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

export default UpdateCategory
