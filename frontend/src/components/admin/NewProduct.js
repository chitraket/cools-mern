import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getBrand } from '../../actions/brandActions'
import { getCategory } from '../../actions/categoryActions'
import { clearErrors, newProduct } from '../../actions/productsActions'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import Sidebar from './Sidebar'

const NewProduct = ({ history }) => {
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [description,setDescription]=useState('')
    const [categoryId, setCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');
    const [stock,setStock]=useState('')
    const [seller,setSeller]=useState('')
    const [size,setSize]=useState('')
    const [material,setMaterial]=useState('')
    const [images,setImages]=useState([])
    const [imagesPreview,setImagesPreview]=useState([])
    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading , error , success } = useSelector(state => state.newProduct);
    const {  error:categoryError, category } = useSelector(state => state.category);
    const { error:brandError, brand} = useSelector(state => state.brand);
    useEffect(()=> { 
        if(error){
            alert.error(error) 
            dispatch(clearErrors())
        }
        if(success){
            history.push('/admin/products')
            alert.success('Product created successfully')
            dispatch({ type: NEW_PRODUCT_RESET })
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
    },[dispatch,alert,error,success,history,categoryError,brandError])

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
        formData.set('size',size);
        formData.set('material',material)
        images.forEach(image =>{
            formData.append('images',image)
        })
        dispatch(newProduct(formData))
    }
    const onChanges = e => {
      const files = Array.from(e.target.files)
      setImagesPreview([]);
      setImages([])
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
              <h1>New Product</h1>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li className="active">New Product</li>
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
                                            <option key={cate._id} value={cate._id} >{cate.name}</option>
                                        ))}

                                    </select>
                    </div>
                    <div className="form-group"> 
                    <select className="form-control" id="category_field" value={brandId}  onChange={(e) => setBrandId(e.target.value)}>
                                        <option value="" disabled> Select Brand</option>
                                        {brand.map(br => (
                                            <option key={br._id} value={br._id} >{br.name}</option>
                                        ))}
                                    </select>
                    </div>
                    <div className="form-group"> 
                                                    <select className="form-control" id="category_field" value={size}  onChange={(e) => setSize(e.target.value)}>
                                                                        <option value="" disabled> Select Size</option>
                                                                        <option value="5XS">5XS</option>
                                                                        <option value="4XS">4XS</option>
                                                                        <option value="3XS">3XS</option>
                                                                        <option value="2XS">2XS</option>
                                                                        <option value="XS">XS</option>
                                                                        <option value="S">S</option>
                                                                        <option value="M">M</option>
                                                                        <option value="L">L</option>
                                                                        <option value="XL">XL</option>
                                                                        <option value="2XL">2XL</option>
                                                                        <option value="3XL">3XL</option>
                                                                        <option value="4XL">4XL</option>
                                                                        <option value="5XL">5XL</option>
                                                                        <option value="6XL">6XL</option>
                                                                        <option value="7XL">7XL</option>
                                                                        <option value="8XL">8XL</option>
                                                                    </select>
                                                    </div>
                                                    <div className="form-group"> 
                                                    <select className="form-control" id="category_field" value={material}  onChange={(e) => setMaterial(e.target.value)}>
                                                                        <option value="" disabled> Select Material</option>
                                                                        <option value="Cotton">Cotton</option>
                                                                        <option value="Down">Down</option>
                                                                        <option value="Leather">Leather</option>
                                                                        <option value="Net">Net</option>
                                                                        <option value="Rubber">Rubber</option>
                                                                        <option value="Satin">Satin</option>
                                                                        <option value="Synthetic">Synthetic</option>
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
                                {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}
                            </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                          <input type="submit" name="register-submit"  value="Add Product" id="register-submit" tabIndex={4} className="form-control btn btn-register"  disabled={loading ? true:false} />
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

export default NewProduct


