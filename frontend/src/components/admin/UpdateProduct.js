import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getBrand } from '../../actions/brandActions'
import { getCategory } from '../../actions/categoryActions'
import { clearErrors, getProductDetails, updateProduct } from '../../actions/productsActions'
import {  UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import Sidebar from './Sidebar'

const UpdateProduct = ({ match,history }) => {
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [description,setDescription]=useState('')
    const [categoryId, setCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [stock,setStock]=useState('')
    const [seller,setSeller]=useState('')
    const [oldImages,setOldImages]=useState([])
    const [images,setImages]=useState([])
    const [imagesPreview,setImagesPreview]=useState([])
    const alert = useAlert()
    const dispatch = useDispatch()
    const { error, product } = useSelector(state => state.productDetails)
    const { loading , error:updateError , isUpdated } = useSelector(state => state.product);
    const {  error:categoryError, category } = useSelector(state => state.category);
    const { error:brandError, brand} = useSelector(state => state.brand);

    const productId = match.params.id;
    useEffect(()=> { 
        if(product && product._id !== productId){
            dispatch(getProductDetails(productId))
        }else{
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategoryId(product.category._id);
            setBrandId(product.brand._id)
            setSeller(product.seller);
            setStock(product.stock);
            setOldImages(product.images);
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
            history.push('/admin/products')
            alert.success('Product Updated successfully')
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }
        if(categoryError){
          alert.error(categoryError)
          dispatch(clearErrors())
        }
        if(brandError){
          alert.error(brandError)
          dispatch(clearErrors())
        }
        dispatch(getCategory())
        dispatch(getBrand())
    },[dispatch,alert,error,isUpdated,history,updateError,product,productId,categoryError,brandError])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData =  new FormData();
         formData.set('name',name);
        formData.set('price',price);
        formData.set('description',description);
        formData.set('category',categoryId);
        formData.set('brand',brandId);
        formData.set('stock',stock);
        formData.set('seller',seller);
        images.forEach(image =>{
            formData.append('images',image)
        })
        dispatch(updateProduct(product._id,formData))
    }
    const onChanges = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])
        setOldImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
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
              <h1>Update Product</h1>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li className="active">Update Product</li>
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
                    <input type="number" id="price_field" className="form-control"  placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="form-group">
                    <textarea className="form-control" id="description_field" rows={8} placeholder="Description" value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="form-group"> 
                    <select className="form-control" id="category_field" value={categoryId}  onChange={(e) => setCategoryId(e.target.value)}>
                                        <option value="" disabled> Select Category</option>
                                        {category.map(cate => (
                                            <option key={cate.name}  value={cate._id} >{cate.name}</option>
                                        ))}

                                    </select>
                    </div>
                    <div className="form-group"> 
                    <select className="form-control" id="category_field" value={brandId}  onChange={(e) => setBrandId(e.target.value)}>
                                        <option value="" disabled> Select Brand</option>
                                        {brand.map(br => (
                                            <option key={br.name}  value={br._id} >{br.name}</option>
                                        ))}

                                    </select>
                    </div>
                    <div className="form-group">
                    <input type="number" id="stock_field" className="form-control"  placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                    </div>
                    <div className="form-group">
                    <input type="text" id="seller_field" className="form-control"  placeholder="Seller Name" value={seller} onChange={(e) => setSeller(e.target.value)} />
                    </div>
                    <div className='form-group'>
                            <div className='d-flex align-items-center'>
                            <input
                                            type='file'
                                            name='product_images'
                                            className='form-control'
                                            id='customFile'
                                            onChange={onChanges}
                                            multiple
                                        />
                                </div>
                                {oldImages && oldImages.map(imags => (
                                    <img src={imags.url} key={imags.url} alt={imags.url} className="mt-3 mr-2" width="55" height="52" />
                                ))}
                                {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}
                            </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                          <input type="submit" name="register-submit"  value="Update Product" id="register-submit" tabIndex={4} className="form-control btn btn-register"  disabled={loading ? true:false} />
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

export default UpdateProduct
