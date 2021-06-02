import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { getBrand } from '../../actions/brandActions'
import { getCategory } from '../../actions/categoryActions'
import { clearErrors, getColor, getProductDetails, updateProduct } from '../../actions/productsActions'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

const UpdateProduct = ({ match, history }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [seller, setSeller] = useState('')
  const [material, setMaterial] = useState('')
  const [size, setSize] = useState('')

  const alert = useAlert()
  const dispatch = useDispatch()
  const { error, product } = useSelector(state => state.productDetails)
  const { loading, error: updateError, isUpdated } = useSelector(state => state.product);
  const { error: categoryError, category } = useSelector(state => state.category);
  const { error: brandError, brand } = useSelector(state => state.brand);
  const { error: colorError, color } = useSelector(state => state.color);
  const [inputList, setInputList] = useState([{ sku: "", price: "", qty: "", color: "", images: [] }]);
  const { user } = useSelector(state => state.auth)
  const productId = match.params.id;
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  const handleImageChange = (e, index) => {
    const { name } = e.target;
    const list = [...inputList];
    const file_array = [];
    const files = Array.from(e.target.files)
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          file_array.push(reader.result);
          list[index][name] = file_array;
          setInputList(list);
        }
      }
      reader.readAsDataURL(file)
    })
  };

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  const handleAddClick = () => {
    setInputList([...inputList, { sku: "", price: "", qty: "", color: "", images: [] }]);
  };

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId))
    } else {
      setName(product.name);
      setDescription(product.description);
      setCategoryId(product.category._id);
      setBrandId(product.brand._id)
      setSeller(product.seller);
      setMaterial(product.material);
      setSize(product.size);
      setInputList(product.attribute);
    }
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (updateError) {
      alert.error(updateError)
      dispatch(clearErrors())
    }
    if (colorError) {
      alert.error(colorError)
      dispatch(clearErrors())
    }
    if (isUpdated) {
      dispatch(getProductDetails(productId))
      history.push('/admin/products')
      alert.success('Product Updated successfully')
      dispatch({ type: UPDATE_PRODUCT_RESET })
    }
    if (categoryError) {
      alert.error(categoryError)
      dispatch(clearErrors())
    }
    if (brandError) {
      alert.error(brandError)
      dispatch(clearErrors())
    }
    dispatch(getCategory())
    dispatch(getBrand())
    dispatch(getColor())
  }, [dispatch, alert, error, isUpdated, history, updateError, product, productId, categoryError, brandError, colorError])

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('name', name);
    formData.set('description', description);
    formData.set('category', categoryId);
    formData.set('brand', brandId);
    formData.set('seller', seller);
    formData.set('size', size);
    formData.set('material', material);
    formData.set('attribute', JSON.stringify(inputList));
    dispatch(updateProduct(product._id, formData))
  }
  const per = [];
  user && user.permission && user.permission.map((p, i) => {
    return per.push(p);
  })
  return (
    <React.Fragment>
      {loading ? <Loader /> : (
        per.includes("2") ?
          <React.Fragment>
            <div className="row">
              <div className="col-md-2">
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
                  <div className="col-md-12">
                    <div className="panel-login">
                      <div className="panel-body">
                        <div className="row">
                          <div className="col-lg-12">
                            <form onSubmit={submitHandler} encType='multipart/form-data'>
                              <div className="form-group">
                                <input type="text" id="name_field" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                              </div>
                              {/* <div className="form-group">
                    <input type="number" id="price_field" className="form-control"  placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div> */}
                              <div className="form-group">
                                <textarea className="form-control" id="description_field" rows={8} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                              </div>
                              <div className="form-group">
                                <select className="form-control" id="category_field" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                  <option value="" disabled> Select Shape</option>
                                  {category.map(cate => (
                                    <option key={cate.name} value={cate._id} >{cate.name}</option>
                                  ))}

                                </select>
                              </div>
                              <div className="form-group">
                                <select className="form-control" id="category_field" value={brandId} onChange={(e) => setBrandId(e.target.value)}>
                                  <option value="" disabled> Select Brand</option>
                                  {brand.map(br => (
                                    <option key={br.name} value={br._id} >{br.name}</option>
                                  ))}

                                </select>
                              </div>
                              <div className="form-group">
                                <select className="form-control" id="category_field" value={size} onChange={(e) => setSize(e.target.value)}>
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
                                <select className="form-control" id="category_field" value={material} onChange={(e) => setMaterial(e.target.value)}>
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
                                <input type="text" id="seller_field" className="form-control" placeholder="Seller Name" value={seller} onChange={(e) => setSeller(e.target.value)} />
                              </div>
                              {inputList.map((x, i) => {

                                return (
                                  <div className="box">
                                    <table>
                                      <tr>
                                        <td>
                                          <div className="form-group">
                                            <input
                                              name="sku"
                                              placeholder="sku"
                                              value={x.sku}
                                              className="form-control"
                                              onChange={e => handleInputChange(e, i)}
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <div className="form-group">
                                            <input
                                              name="price"
                                              className="form-control"
                                              type="number"
                                              placeholder="Price"
                                              value={x.price}
                                              onChange={e => handleInputChange(e, i)}
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <div className="form-group">
                                            <input
                                              name="qty"
                                              className="form-control"
                                              type="number"
                                              placeholder="qty"
                                              value={x.qty}
                                              onChange={e => handleInputChange(e, i)}
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <div className="form-group">
                                            <select className="form-control" name="color" id="category_field" value={x.color} onChange={e => handleInputChange(e, i)}>
                                              <option value="" disabled> Select Color</option>
                                              {color.map(colors => (
                                                <option key={colors._id} value={colors._id}>{colors.name}</option>
                                              ))}
                                            </select>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="form-group">
                                            <input
                                              type='file'
                                              name='images'
                                              className="form-control"
                                              id='customFile'
                                              onChange={e => handleImageChange(e, i)}
                                              multiple
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          {inputList.length !== 1 && <button
                                            className="btn"
                                            onClick={() => handleRemoveClick(i)}>-</button>}
                                          {inputList.length - 1 === i && <button className="btn" onClick={handleAddClick}>+</button>}
                                        </td>
                                      </tr>
                                    </table>

                                  </div>
                                );
                              })}
                              <div className="form-group">
                                <div className="row">
                                  <div className="col-sm-6 col-sm-offset-3">
                                    <input type="submit" name="register-submit" value="Update Product" id="register-submit" tabIndex={4} className="form-control btn btn-register" disabled={loading ? true : false} />
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
          :
          <Redirect to="/admin/error" />
      )}
    </React.Fragment>
  )
}

export default UpdateProduct
