import React, { useEffect, useRef } from 'react'
import { useAlert } from 'react-alert';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../actions/cartActions';
import { clearErrors, getBestProduct } from '../../actions/productsActions';
import { deletefavorite, loadUser, newfavorite } from '../../actions/userActions';
import { ADD_FAVORITE_RESET, DELETE_FAVORITE_RESET } from '../../constants/userConstants';
import Product from './Products';

function TopProduct({ title, sort, order, rt1, rta1, i18n, t }) {
  const alert = useAlert();
  const disptach = useDispatch();
  const carousels = useRef(null);
  const { bestproduct, error } = useSelector(state => state.bestproduct)
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const { error: favoriteError, is_favorite, is_Delete } = useSelector(state => state.favorite)
  useEffect(() => {
    disptach(getBestProduct(sort, order));
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
  const addToCart = (id, quantity, color) => {
    disptach(addItemToCart(id, quantity, color));
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
    slidesToShow: Object.keys(bestproduct).length > 5 ? 5 : Object.keys(bestproduct).length,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Object.keys(bestproduct).length > 3 ? 3 : Object.keys(bestproduct).length,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Object.keys(bestproduct).length > 3 ? 3 : Object.keys(bestproduct).length,
          slidesToScroll: 3,
          initialSlide: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Object.keys(bestproduct).length > 2 ? 2 : Object.keys(bestproduct).length,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Object.keys(bestproduct).length > 1 ? 1 : Object.keys(bestproduct).length,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div>
      <div className="col-sm-12" key={bestproduct.length}>
        {/* =====  PRODUCT TAB  ===== */}
        <div className="row">

          <div className="col-md-12">

            <div className="heading-part text-center">
              <h2 className={`main_title mt_50 ${rt1}`} style={{ float: (i18n.language === 'pk' ? 'right' : ''), paddingLeft: (i18n.language === 'pk' ? '10px' : '') }}>{title}</h2>
              <div className={`${rta1} mt_50`}>
                {bestproduct.length >= 5 ? <React.Fragment>
                  <button className="btn" style={{ marginRight: '5px', padding: '5px' }} onClick={() => carousels.current.slickPrev()}><i className="fa fa-arrow-left" /></button>
                  <button className="btn" style={{ padding: '5px' }} onClick={() => carousels.current.slickNext()}><i className="fa fa-arrow-right" /></button>
                </React.Fragment> : ''
                }
              </div>
            </div>
          </div>
        </div>
        <div className="row mb_50 mt_10">
          <Slider {...settings_product} ref={carousels}>
            {bestproduct && bestproduct.map(product => (
              <Product key={product._id} product={product} addtocart={() => addToCart(product._id, 1, product.attribute && product.attribute[0].color && product.attribute[0].color.name)} user={user} isAuthenticated={isAuthenticated} favoriteHandler={(e) => favoriteHandler(e, product._id)} favoriteDeleteHandler={(e) => favoriteDeleteHandler(e, product._id)} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default TopProduct