import React, { useEffect, useRef, useState } from 'react'
import Loader from '../layout/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getProductDetails, clearErrors, newReview } from '../../actions/productsActions'
import { addItemToCart } from '../../actions/cartActions'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './product.css'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'
import ListReviews from '../review/ListReviews';
import Product from './Products';
import { ADD_FAVORITE_RESET, DELETE_FAVORITE_RESET } from '../../constants/userConstants';
import { deletefavorite, loadUser, newfavorite } from '../../actions/userActions';
import { useTranslation } from "react-i18next";
import MetaData from '../layout/MetaData'

const ProductDetails = ({ match,history }) => {
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [t, i18n] = useTranslation('common');
  const rt1 = ( i18n.language === 'pk' ? 'text-right' : '' )
  const rta1 = ( i18n.language === 'pk' ? 'text-left' : 'text-right' ) 
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, product,related_product } = useSelector(state => state.productDetails)
  const { isAuthenticated,user } = useSelector(state => state.auth)
  const { error: reviewError, success } = useSelector(state => state.newReview)
  const { error: favoriteError, is_favorite, is_Delete} = useSelector(state => state.favorite) 
  
  const carousel = useRef(null);
  useEffect(() => {
    dispatch(getProductDetails(match.params.id))

    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors())
    }
    if(favoriteError){
      alert.error(favoriteError);
      dispatch(clearErrors())
    }
    if(is_favorite){
      alert.success(t('favorite.add_favorite'))
      dispatch(loadUser())
      dispatch({ type: ADD_FAVORITE_RESET })
    }
    if(is_Delete){
      alert.success(t('favorite.remove_favorite')) 
      dispatch(loadUser())
      dispatch({ type: DELETE_FAVORITE_RESET })
    }
    if (success) {
      alert.success(t('product_details.submit_review_msg'))
      dispatch({ type: NEW_REVIEW_RESET })
    }

  }, [dispatch, alert, error, reviewError, match.params.id,success,favoriteError,is_favorite,is_Delete,user,t])

  const addToCart = () => {
    dispatch(addItemToCart(match.params.id, quantity));
    alert.success(t('cart.item_add_cart'))
  }

  const increaseQty = () => {
    const count = document.querySelector('.count')

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty)
  }

  const decreaseQty = () => {

    const count = document.querySelector('.count')

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty)

  }

  function setUserRatings() {
    const stars = document.querySelectorAll('.star');

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ['click', 'mouseover', 'mouseout'].forEach(function (e) {
        star.addEventListener(e, showRatings);
      })
    })

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === 'click') {
          if (index < this.starValue) {
            star.classList.add('orange');
            setRating(this.starValue)
          } else {
            star.classList.remove('orange')
          }
        }

        if (e.type === 'mouseover') {
          if (index < this.starValue) {
            star.classList.add('yellow');
          } else {
            star.classList.remove('yellow')
          }
        }

        if (e.type === 'mouseout') {
          star.classList.remove('yellow')
        }
      })
    }
  }

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set('rating', rating);
    formData.set('comment', comment);
    formData.set('productId', match.params.id);

    dispatch(newReview(formData));
}

const favoriteHandler = (e,id) => {
  e.preventDefault();
  const formData = new FormData();
  formData.set('productId', id);
  dispatch(newfavorite(formData));
}

const favoriteDeleteHandler = (e,id) => {
   e.preventDefault();
  const formData = new FormData();
  formData.set('productId', id);
  dispatch(deletefavorite(formData));
}
  const settings_product = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Object.keys(related_product).length > 5 ? 5 : Object.keys(related_product).length,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  };
  return (
    <React.Fragment>
            {loading ? <Loader /> : (
    <React.Fragment>
      <div className="container">
      <MetaData title={product.name} />
        <div className="row">
        <div id="column-left" className="col-sm-4 col-md-4 col-lg-3 hidden-xs">

          <div className="left_banner left-sidebar-widget mt_30 mb_40"> <a href="/"><img src="../images/left1.jpg" alt="Left Banner" className="img-responsive" /></a> </div>
          </div>
          <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
            {/* =====  BANNER STRAT  ===== */}
            <div className="breadcrumb ptb_20">
              <h1 style={{float:( i18n.language  === 'pk' ? 'right' : '')}}>{product.name}</h1>
              <ul style={{float:( i18n.language  === 'pk' ? 'left' : '')}}>
                <li><Link to="/">{t('product_details.home')}</Link></li>
                <li><Link to={product.category && product.category.type === 'store' ? `/category/${product.category && product.category._id}` : `/search/category/${product.category && product.category._id}`}> {product.category && product.category.name}</Link></li>
                <li className="active">{product.name}</li>
              </ul>
            </div>
            <div className="row mt_10 ">
              <div className="col-md-6">
                <div>
                  <Carousel showArrows={false} showIndicators={false} showStatus={false} autoPlay infiniteLoop>
                   {product.images && product.images.map(image => (
                                      <div><img  key={image.public_id} src={image.url} alt={product.title} /></div>
                                ))}
                  </Carousel>
                </div>
              </div>
              <div className={`col-md-6 prodetail caption product-thumb ${rt1}`}>
                <h4 data-name="product_name" className="product-name"><Link to={`/product/${product._id}`} title={product.name}>{product.name}</Link></h4>
                <div className="rating">
                        <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                            </div>
                     ({product.numofReviews} {t('product_details.reviews')})
                  </div>
                <span className="price mb_20"><span className="amount"><span className="currencySymbol">$</span>{product.price}</span>
                </span>
                <hr />
                <ul className="list-unstyled product_info mtb_20">
                  <li>
                    <label>{t('product_details.brand')} : </label>
                    <span> <a href="/">{product.seller}</a></span></li>
                  <li>
                    <label>{t('product_details.availability')} : </label>
                    <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? ' In Stock' : ' Out of Stock'}</span></li>
                  <li>
                    <label>{t('product_details.category')} : </label>
                    <Link to={product.category && product.category.type === 'store' ? `/category/${product.category && product.category._id}` : `/search/category/${product.category && product.category._id}`}> {product.category && product.category.name}</Link></li>
                    <li>
                    <label>{t('product_details.brand')} : </label>
                    <Link to={product.brand && product.brand.type === 'store' ? `/brand/${product.brand &&  product.brand._id}` : `/search/brand/${product.brand && product.brand._id}`}> {product.brand && product.brand.name} </Link></li>
                </ul>
                <hr />
                <p className="product-desc mtb_30"> {product.description}</p>
                <div id="product">
                  <div className="form-group">
                    <div className="row">
                      {/* <div className="Sort-by col-md-6">
                        <label>Sort by</label>
                        <select name="product_size" id="select-by-size" className="selectpicker form-control">
                          <option>Small</option>
                          <option>Medium</option>
                          <option>Large</option>
                        </select>
                      </div> */}
                      {/* <div className="Color col-md-6">
                        <label>Color</label>
                        <select name="product_color" id="select-by-color" className="selectpicker form-control">
                          <option>Blue</option>
                          <option>Green</option>
                          <option>Orange</option>
                          <option>White</option>
                        </select>
                      </div> */}
                    </div>
                  </div>
                  <div className="qty mt_30 form-group2">
                    <label>{t('product_details.qty')}</label>
                    <div className="stockCounter d-inline">
                      <span className="btn  minus" style={{ marginRight: '5px' }} onClick={decreaseQty}>-</span>
                      <input type="number" className="form-control count d-inline" style={{ width: '15%' }} value={quantity} readOnly />
                      <span className="btn  plus" style={{ marginLeft: '5px' }} onClick={increaseQty}>+</span>
                    </div>
                  </div>
                  <div className="button-group mt_30">
                    { product.stock === 0 ? <div className="add-to-cart"><span>Add to cart</span></div> : <div className="add-to-cart" onClick={addToCart}><span >Add to cart</span></div> }
                    {
                                    !isAuthenticated ? '' :  
                                    user && user.role === 'user' ?
                                    user.favorite && user.favorite.includes(product._id) ?  <div className="wishlist" onClick={(e) => favoriteDeleteHandler(e,match.params.id)}><span>wishlist</span></div> : <div className="wishlist" onClick={(e) => favoriteHandler(e,match.params.id)}><span>wishlist</span></div> 
                                    : ''
                        }
                    {/* <div className="compare"><a href="/"><span>Compare</span></a></div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 ">
                <div id="exTab5" className={`mtb_30 ${rt1}`}>
                  <ul className="nav nav-tabs" style={{float:( i18n.language  === 'pk' ? 'right' : '')}}>
                    <li className="active"> <a href="#1c" data-toggle="tab">{t('product_details.overview')}</a> </li>
                    <li><Link to={"#2c"} data-toggle="tab">({t('product_details.reviews')} {product.numofReviews})</Link> </li>
                  </ul>
                  <div className="tab-content" style={{paddingTop:( i18n.language  === 'pk' ? '50px' : '')}}>
                    <div className="tab-pane active" id="1c">
                      <p>{product.description}</p>
                    </div>
                    <div className="tab-pane mt_10" id="2c">
                    {isAuthenticated ? <button id="review_btn" type="button" className={`btn  mt_10 ${rt1}`} data-toggle="modal" data-target="#ratingModal" style={{textAlign:( i18n.language  === 'pk' ? 'right' : '') }} onClick={setUserRatings}>
                            {t('product_details.submit_review')}
                            </button>
                                :
                                <div className="alert alert-danger mt_10" type='alert'>{t('product_details.post_login')}</div>
                            }
                      {product.reviews && product.reviews.length > 0 && (
                        <ListReviews  reviews={product.reviews} />
                      )}
                    </div>
                    <div className="row mt_20 mb_50">
                      <div className="rating w-50">
                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="ratingModalLabel">{t('product_details.submit_review')}</h5>
                                <button type="button" className="close"  data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <ul className="stars" style={{float:( i18n.language  === 'pk' ? 'right' : '')}}>
                                  <li className="star"><i className="fa fa-star"></i></li>
                                  <li className="star"><i className="fa fa-star"></i></li>
                                  <li className="star"><i className="fa fa-star"></i></li>
                                  <li className="star"><i className="fa fa-star"></i></li>
                                  <li className="star"><i className="fa fa-star"></i></li>
                                </ul>
                                <textarea
                                  name="review"
                                  id="review" className={`form-control mt_3 ${rt1}`}
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                >
                                </textarea>

                                <button className="btn my_3 float_right review_btn px_4 text-white mt_10" onClick={reviewHandler} data-dismiss="modal" aria-label="Close">{t('product_details.submit')}</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="heading-part text-center">
                  <h2 className={`main_title mt_50 ${rt1}`} style={{float:( i18n.language  === 'pk' ? 'right' : ''),paddingLeft:(i18n.language  === 'pk' ? '10px' : '')}}>{t('product_details.related_products')}</h2>
                  <div className={`${rta1} mt_50`}>
                      <button className="btn" style={{marginRight:'5px',padding:'5px'}} onClick={() => carousel.current.slickPrev()}><i className="fa fa-arrow-left" /></button>
                        <button className="btn" style={{padding:'5px'}} onClick={() => carousel.current.slickNext()}><i className="fa fa-arrow-right" /></button>
                      </div>
                </div>
              </div>
            </div>
            <div className="row mb_30">
            <Slider {...settings_product} ref={carousel}>
                    {related_product && related_product.map(product => (
                      <Product key={product._id} product={product} addtocart={() => addToCart(product._id,1)} user={user} isAuthenticated={isAuthenticated} favoriteHandler={(e) =>  favoriteHandler(e,product._id)}  favoriteDeleteHandler={(e) => favoriteDeleteHandler(e,product._id)}/>
                    ))}
                </Slider>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
            )}
           </React.Fragment> 
  )
}

export default ProductDetails
