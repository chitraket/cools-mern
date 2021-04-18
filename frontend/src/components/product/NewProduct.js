import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../actions/cartActions';
import { clearErrors, gettopProduct } from '../../actions/productsActions';
import { deletefavorite, loadUser, newfavorite } from '../../actions/userActions';
import { ADD_FAVORITE_RESET, DELETE_FAVORITE_RESET } from '../../constants/userConstants';
import Product from './Products';

function NewProduct({ carousel, title, sort, order, rt1, rta1, i18n, t }) {
  const alert = useAlert();
  const disptach = useDispatch();
  const { topproduct, error } = useSelector(state => state.topproduct)
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const { error: favoriteError, is_favorite, is_Delete } = useSelector(state => state.favorite)
  useEffect(() => {
    disptach(gettopProduct(sort, order));

    if (error) {
      alert.error(error)
      disptach(clearErrors())
    }
    if (favoriteError) {
      alert.error(favoriteError);
      disptach(clearErrors())
    }

    if (is_favorite) {
      disptach(loadUser())
      disptach({ type: ADD_FAVORITE_RESET })

    }
    if (is_Delete) {
      disptach(loadUser())
      disptach({ type: DELETE_FAVORITE_RESET })
    }

  }, [disptach, alert, error, favoriteError, is_favorite, is_Delete, sort, order])
  const addToCart = (id, quantity) => {
    disptach(addItemToCart(id, quantity));
    alert.success(t('cart.item_add_cart'))
  }
  const favoriteHandler = (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('productId', id);
    disptach(newfavorite(formData));
    alert.success(t('favorite.add_favorite'))
  }

  const favoriteDeleteHandler = (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('productId', id);
    disptach(deletefavorite(formData));
    alert.success(t('favorite.remove_favorite'))
  }
  const settings_product = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: Object.keys(topproduct).length > 5 ? 5 : Object.keys(topproduct).length,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  };
  return (
    <div>
      <div className="col-sm-12">
        {/* =====  PRODUCT TAB  ===== */}
        <div className="row">

          <div className="col-md-12">

            <div className="heading-part text-center">
              <h2 className={`main_title mt_50 ${rt1}`} style={{ float: (i18n.language === 'pk' ? 'right' : ''), paddingLeft: (i18n.language === 'pk' ? '10px' : '') }}>{title}</h2>
              <div className={`${rta1} mt_50`}>
                {topproduct.length >= 5 ? <React.Fragment>
                  <button className="btn" style={{ marginRight: '5px', padding: '5px' }} onClick={() => carousel.current.slickPrev()}><i className="fa fa-arrow-left" /></button>
                  <button className="btn" style={{ padding: '5px' }} onClick={() => carousel.current.slickNext()}><i className="fa fa-arrow-right" /></button>
                </React.Fragment> : ''
                }
              </div>
            </div>
          </div>
        </div>
        <div className="row mb_50 mt_10">
          <Slider {...settings_product} ref={carousel}>
            {topproduct && topproduct.map(product => (
              <Product key={product._id} product={product} addtocart={() => addToCart(product._id, 1)} user={user} isAuthenticated={isAuthenticated} favoriteHandler={(e) => favoriteHandler(e, product._id)} favoriteDeleteHandler={(e) => favoriteDeleteHandler(e, product._id)} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default NewProduct
