import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearErrors, newBrand } from '../../actions/brandActions'
import { NEW_BRAND_RESET } from '../../constants/brandConstants'
import Sidebar from './Sidebar'
const NewBrand = ({ history }) => {
    const [name, setName] = useState('')
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const [description,setDescription] = useState('')
    const [sliderimages, setSliderImages] = useState([])
    const [sliderimagesPreview, setSliderImagesPreview] = useState([])
    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, error, success } = useSelector(state => state.newBrand);
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (success) {
            history.push('/admin/brands')
            alert.success('Brand created successfully')
            dispatch({ type: NEW_BRAND_RESET })
        }
    }, [dispatch, alert, error, success, history])
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('description',description)
        formData.append('images', images)
        sliderimages.forEach(slider =>{
            formData.append('sliders',slider)
        })
        dispatch(newBrand(formData))
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
    const onChange = e => {
        const files = Array.from(e.target.files)
        setSliderImagesPreview([]);
        setSliderImages([])
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setSliderImagesPreview(oldArray => [...oldArray, reader.result])
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
                        <h1>New Brand</h1>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li className="active">New Brand</li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <div className="panel-login">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <form onSubmit={submitHandler} encType='multipart/form-data'>
                                                <div className="form-group">
                                                    <input type="text" id="name_field" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
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
                                                            ccept="iamges/*"
                                                            onChange={onChanges}
                                                        />
                                                    </div>
                                                    <img src={imagesPreview} key={imagesPreview} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
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
                                                {sliderimagesPreview.map(img => (
                                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                                    ))}
                                            </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-sm-6 col-sm-offset-3">
                                                            <input type="submit" name="register-submit" value="Add Brand" id="register-submit" tabIndex={4} className="form-control btn btn-register" disabled={loading ? true : false} />
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

export default NewBrand
