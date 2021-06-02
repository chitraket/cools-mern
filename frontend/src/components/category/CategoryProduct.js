import React, { useEffect, useRef, useState } from 'react'
import { useAlert } from 'react-alert';

import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { clearErrors, getcategoryProducts } from '../../actions/productsActions';
import { addItemToCart } from '../../actions/cartActions';
import Product from '../product/Products';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { useTranslation } from "react-i18next";
import { deletefavorite, loadUser, newfavorite } from '../../actions/userActions';
import { ADD_FAVORITE_RESET, DELETE_FAVORITE_RESET } from '../../constants/userConstants';

function CategoryProduct({ match }) {
  const carousel = useRef(null);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation('common');
  const rt1 = (i18n.language === 'pk' ? 'text-right' : 'text-center')
  const rta1 = (i18n.language === 'pk' ? 'text-left' : 'text-right')
  const alert = useAlert();
  const [priceRange] = useState({
    under5k: 5000,
    under10k: 10000
  })
  const { loading, error, productsByPrice, category } = useSelector(state => state.categoryProducts)
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const { error: favoriteError, is_favorite, is_Delete } = useSelector(state => state.favorite)
  useEffect(() => {
    dispatch(getcategoryProducts(match.params.id))
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
    if (favoriteError) {
      alert.error(favoriteError);
      dispatch(clearErrors())
    }

    if (is_favorite) {
      dispatch(loadUser())
      dispatch({ type: ADD_FAVORITE_RESET })

    }
    if (is_Delete) {
      dispatch(loadUser())
      dispatch({ type: DELETE_FAVORITE_RESET })
    }
  }, [error, dispatch, alert, match.params.id, is_Delete, is_favorite, favoriteError])
  function addToCart(id, quantity, color) {
    dispatch(addItemToCart(id, quantity, color));
    alert.success(t('cart.item_add_cart'))
  }
  const favoriteHandler = (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('productId', id);
    dispatch(newfavorite(formData));
    alert.success(t('favorite.add_favorite'))
  }

  const favoriteDeleteHandler = (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('productId', id);
    dispatch(deletefavorite(formData));
    alert.success(t('favorite.remove_favorite'))
  }


  return (
    <React.Fragment>
      {loading ? <Loader /> : (
        <React.Fragment>
          <div className="wrapper">
            <MetaData title={category && category.name} />
            <div className="banner">
              <Slider>
                {
                  category && category.sliders !== '' ?
                    category.sliders && category.sliders.map(cat => (
                      <div className="item"><a href="/"><img key={cat.public_id} src={cat.url} alt={category.name} className="img-responsive" /></a></div>
                    ))
                    :
                    ''
                }
              </Slider>
            </div>
            {Object.keys(productsByPrice).map((key, index) => {
              return (
                <React.Fragment>
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="heading-part text-center">
                              <h2 className="main_title mt_50" style={{ float: (i18n.language === 'pk' ? 'right' : ''), paddingLeft: (i18n.language === 'pk' ? '10px' : '') }}>Rs.{priceRange[key]}</h2>
                              <div className={`${rta1} mt_50`}>
                                {productsByPrice[key].length >= 5 ? <React.Fragment>
                                  <button className="btn" style={{ marginRight: '5px', padding: '5px' }} onClick={() => carousel.current.slickPrev()}><i className="fa fa-arrow-left" /></button>
                                  <button className="btn" style={{ padding: '5px' }} onClick={() => carousel.current.slickNext()}><i className="fa fa-arrow-right" /></button>
                                </React.Fragment> : ''}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mb_50 mt_10">
                          {
                            productsByPrice[key].length ?
                              <Slider
                                dots={false}
                                arrows={false}
                                ref={carousel}
                                infinite={true}
                                speed={500}
                                slidesToShow={Object.keys(productsByPrice[key]).length > 5 ? 5 : Object.keys(productsByPrice[key]).length}
                                slidesToScroll={1}
                                autoplay={true}
                                autoplaySpeed={3000}
                                pauseOnHover={true}>
                                {productsByPrice[key].map(product => (
                                  <Product key={product._id} product={product} addtocart={() => addToCart(product._id, 1, product.attribute && product.attribute[0].color && product.attribute[0].color.name)} user={user} isAuthenticated={isAuthenticated} favoriteHandler={(e) => favoriteHandler(e, product._id)} favoriteDeleteHandler={(e) => favoriteDeleteHandler(e, product._id)} />
                                ))}
                              </Slider>
                              :
                              <p className={`mt_10 ${rt1}`} style={{ paddingRight: (i18n.language === 'pk' ? '15px' : '') }}>{t('category.category_not_product')}</p>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default CategoryProduct
