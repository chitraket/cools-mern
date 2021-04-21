import React,{useEffect, useState} from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productsActions'
import { useAlert } from 'react-alert'
import Product from './Products'
import './product.css'
import { Link } from 'react-router-dom'
import { getCategory } from '../../actions/categoryActions'
import { addItemToCart } from '../../actions/cartActions'
import Loader from '../layout/Loader'
import { getBrand } from '../../actions/brandActions'
import { ADD_FAVORITE_RESET, DELETE_FAVORITE_RESET } from '../../constants/userConstants'
import { deletefavorite, loadUser, newfavorite } from '../../actions/userActions'
import { useTranslation } from "react-i18next";
import MetaData from '../layout/MetaData'

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
function ProductFilter({ match }) {
    const alert = useAlert();
    const [currentPage,setCurrentPage] = useState(1);
    const [price,setPrice] = useState([1,10000]);
    const [cat,setCat] = useState(match.params.cat ? match.params.cat : '') 
    const [brands,setBrands] = useState(match.params.brands ? match.params.brands : '')
    const [rating,setRating]= useState(0)
    const [t, i18n] = useTranslation('common');
    const rt1 = ( i18n.language === 'pk' ? 'text-right' : '' )
    const rtc1 = ( i18n.language === 'pk' ? 'text-right' : 'text-center' )

    const disptach = useDispatch();
    const {  category,error:categroyError } = useSelector(state => state.category)
    const {  brand,error:brandError } = useSelector(state => state.brand)
    const { isAuthenticated,user } = useSelector(state => state.auth)
    const { error: favoriteError, is_favorite, is_Delete} = useSelector(state => state.favorite) 
    const { loading ,products, error, productsCount , resPerPage,filteredProductsCount } = useSelector(state => state.products)
    const keyword = match.params.keyword
    useEffect(() => {
      if(error){  
         alert.error(error)
         disptach(clearErrors())
      }
      if(categroyError){
         alert.error(categroyError)
         disptach(clearErrors())
      }
      if(brandError){
         alert.error(brandError)
        disptach(clearErrors())
      }
      if(favoriteError){
        alert.error(favoriteError);
        disptach(clearErrors())
      }
     
      if(is_favorite){
        disptach(loadUser())
        disptach({ type: ADD_FAVORITE_RESET })
  
      }
      if(is_Delete){
        disptach(loadUser())
        disptach({ type: DELETE_FAVORITE_RESET })
      }
      disptach(getCategory());
      disptach(getBrand());
      disptach(getProduct(keyword,currentPage,price,cat,brands,rating));
      
    }, [disptach,alert,error,keyword,currentPage,price,cat,brands,rating,categroyError,brandError,is_favorite,is_Delete,favoriteError])
    function setCurrentPageNo(pageNumber) {
      setCurrentPage(pageNumber)
  }
    let count = productsCount;
    if (keyword) {
        count = filteredProductsCount
    }  
    function addToCart (id,quantity) {
      disptach(addItemToCart(id, quantity));
      alert.success(t('cart.item_add_cart'))
    }
    const favoriteHandler = (e,id) => {
      e.preventDefault();
      const formData = new FormData();
      formData.set('productId', id);
      disptach(newfavorite(formData));
      alert.success(t('favorite.add_favorite'))
    }
    
    const favoriteDeleteHandler = (e,id) => {
      e.preventDefault();
      const formData = new FormData();
      formData.set('productId', id);
      disptach(deletefavorite(formData));
      alert.success(t('favorite.remove_favorite'))
    }
    return (
<React.Fragment>
      {loading ? <Loader /> : (
        <React.Fragment>
<div className="container">
  <div className="row ">
    <div id="column-left" className="col-sm-4 col-md-4 col-lg-3 ">
      <div className="filter left-sidebar-widget mb_50">
        <div className={`filter-block mt_20 ${rt1}`}>
          <p>
            <label htmlFor="amount"> {t('product_filter.price_range')}</label>
            <div className="mt_30"/>
           <Range 
              marks={{
                1 : `$1`,
                10000 : `$10000`
              }}
              min={1}
              max={10000}
              defaultValue={[1,10000]}
              tipFormatter={value => `$${value}`}
              tipProps={{
                placement: "top", 
                visible: true
              }}
              value={price}
              onChange={price => setPrice(price)}
           />
          </p>
          <div id="slider-range" className="mtb_30" />

          <div className="list-group">

            <div className="list-group-item mb_10">
              <label>{t('product_filter.rating')}</label>
              <div id="filter-group1">
                <div className="checkbox">
                  <label>
                  <ul>
                    {[5,4,3,2,1].map(star => (
                      <li 
                      style={{
                        cursor:'pointer',
                        listStyleType:'none'
                      }}
                      key={star}
                      onClick={()=> setRating(star)}
                    >
                      <div className="rating-outer">
                        <div className="rating-inner"
                        style={{ width:`${star * 20}%`}}
                        ></div>
                      </div>
                    </li>
                      ))}
                  </ul>
                  </label>
                </div>
              </div>
            </div>
            <div className="list-group-item mb_10">
              <label>{t('product_filter.category')}</label>
              <div id="filter-group1">
                <div className="checkbox">
                  <label>
                  <ul className="pl-0">
                                                    {category.map(categorys => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={categorys._id}
                                                            onClick={() => setCat(categorys._id)}
                                                        >
                                                            {categorys.name}
                                                        </li>
                                                    ))}
                                                </ul>
                  </label>
                </div>
              </div>
            </div>
            <div className="list-group-item mb_10">
              <label>{t('product_filter.brand')}</label>
              <div id="filter-group1">
                <div className="checkbox">
                  <label>
                  <ul className="pl-0">
                                                    {brand.map(brands => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={brands._id}
                                                            onClick={() => setBrands(brands._id)}
                                                        >
                                                            {brands.name}
                                                        </li>
                                                    ))}
                                                </ul>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="left_banner left-sidebar-widget mb_50"> <a href="!#"><img src="../images/left1.jpg" alt="Left Banner" className="img-responsive" /></a> </div>
      <div className="left-special left-sidebar-widget mb_50">
        {/* <div className="heading-part mb_20 ">
          <h2 className="main_title">Top Products</h2>
        </div> */}
        {/* <div id="left-special" className="owl-carousel">
          <ul className="row ">
            <li className="item product-layout-left mb_20">
              <div className="product-list col-xs-4">
                <div className="product-thumb">
                  <div className="image product-imageblock"> <a href="product_detail_page.html"> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product1.jpg" /> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product1-1.jpg" /> </a> </div>
                </div>
              </div>
              <div className="col-xs-8">
                <div className="caption product-detail">
                  <h6 className="product-name"><a href="#">New Aviator Sunglasses</a></h6>
                  <div className="rating">
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-x" /></span>
                  </div>
                  <span className="price"><span className="amount"><span className="currencySymbol">$</span>70.00</span>
                  </span>
                </div>
              </div>
            </li>
            <li className="item product-layout-left mb_20">
              <div className="product-list col-xs-4">
                <div className="product-thumb">
                  <div className="image product-imageblock"> <a href="product_detail_page.html"> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product3.jpg" /> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product3-1.jpg" /> </a> </div>
                </div>
              </div>
              <div className="col-xs-8">
                <div className="caption product-detail">
                  <h6 className="product-name"><a href="#">New Aviator Sunglasses</a></h6>
                  <div className="rating">
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-x" /></span>
                  </div>
                  <span className="price"><span className="amount"><span className="currencySymbol">$</span>70.00</span>
                  </span>
                </div>
              </div>
            </li>
            <li className="item product-layout-left mb_20">
              <div className="product-list col-xs-4">
                <div className="product-thumb">
                  <div className="image product-imageblock"> <a href="product_detail_page.html"> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product4.jpg" /> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product4-1.jpg" /> </a> </div>
                </div>
              </div>
              <div className="col-xs-8">
                <div className="caption product-detail">
                  <h6 className="product-name"><a href="#">New Aviator Sunglasses</a></h6>
                  <div className="rating">
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-x" /></span>
                  </div>
                  <span className="price"><span className="amount"><span className="currencySymbol">$</span>70.00</span>
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <ul className="row ">
            <li className="item product-layout-left mb_20">
              <div className="product-list col-xs-4">
                <div className="product-thumb">
                  <div className="image product-imageblock"> <a href="product_detail_page.html"> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product5.jpg" /> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product5-1.jpg" /> </a> </div>
                </div>
              </div>
              <div className="col-xs-8">
                <div className="caption product-detail">
                  <h6 className="product-name"><a href="#">New Aviator Sunglasses</a></h6>
                  <div className="rating">
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-x" /></span>
                  </div>
                  <span className="price"><span className="amount"><span className="currencySymbol">$</span>70.00</span>
                  </span>
                </div>
              </div>
            </li>
            <li className="item product-layout-left mb_20">
              <div className="product-list col-xs-4">
                <div className="product-thumb">
                  <div className="image product-imageblock"> <a href="product_detail_page.html"> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product6.jpg" /> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product6-1.jpg" /> </a> </div>
                </div>
              </div>
              <div className="col-xs-8">
                <div className="caption product-detail">
                  <h6 className="product-name"><a href="#">New Aviator Sunglasses</a></h6>
                  <div className="rating">
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-x" /></span>
                  </div>
                  <span className="price"><span className="amount"><span className="currencySymbol">$</span>70.00</span>
                  </span>
                </div>
              </div>
            </li>
            <li className="item product-layout-left mb_20">
              <div className="product-list col-xs-4">
                <div className="product-thumb">
                  <div className="image product-imageblock"> <a href="product_detail_page.html"> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product7.jpg" /> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product7-1.jpg" /> </a> </div>
                </div>
              </div>
              <div className="col-xs-8">
                <div className="caption product-detail">
                  <h6 className="product-name"><a href="#">New Aviator Sunglasses</a></h6>
                  <div className="rating">
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-x" /></span>
                  </div>
                  <span className="price"><span className="amount"><span className="currencySymbol">$</span>70.00</span>
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <ul className="row ">
            <li className="item product-layout-left mb_20">
              <div className="product-list col-xs-4">
                <div className="product-thumb">
                  <div className="image product-imageblock"> <a href="product_detail_page.html"> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product8.jpg" /> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product8-1.jpg" /> </a> </div>
                </div>
              </div>
              <div className="col-xs-8">
                <div className="caption product-detail">
                  <h6 className="product-name"><a href="#">New Aviator Sunglasses</a></h6>
                  <div className="rating">
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-x" /></span>
                  </div>
                  <span className="price"><span className="amount"><span className="currencySymbol">$</span>70.00</span>
                  </span>
                </div>
              </div>
            </li>
            <li className="item product-layout-left mb_20">
              <div className="product-list col-xs-4">
                <div className="product-thumb">
                  <div className="image product-imageblock"> <a href="product_detail_page.html"> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product9.jpg" /> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product9-1.jpg" /> </a> </div>
                </div>
              </div>
              <div className="col-xs-8">
                <div className="caption product-detail">
                  <h6 className="product-name"><a href="#">New Aviator Sunglasses</a></h6>
                  <div className="rating">
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-x" /></span>
                  </div>
                  <span className="price"><span className="amount"><span className="currencySymbol">$</span>70.00</span>
                  </span>
                </div>
              </div>
            </li>
            <li className="item product-layout-left mb_20">
              <div className="product-list col-xs-4">
                <div className="product-thumb">
                  <div className="image product-imageblock"> <a href="product_detail_page.html"> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product10.jpg" /> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product10-1.jpg" /> </a> </div>
                </div>
              </div>
              <div className="col-xs-8">
                <div className="caption product-detail">
                  <h6 className="product-name"><a href="#">New Aviator Sunglasses</a></h6>
                  <div className="rating">
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-x" /></span>
                  </div>
                  <span className="price"><span className="amount"><span className="currencySymbol">$</span>70.00</span>
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <ul className="row ">
            <li className="item product-layout-left mb_20">
              <div className="product-list col-xs-4">
                <div className="product-thumb">
                  <div className="image product-imageblock"> <a href="product_detail_page.html"> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product1.jpg" /> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product1-1.jpg" /> </a> </div>
                </div>
              </div>
              <div className="col-xs-8">
                <div className="caption product-detail">
                  <h6 className="product-name"><a href="#">New Aviator Sunglasses</a></h6>
                  <div className="rating">
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-x" /></span>
                  </div>
                  <span className="price"><span className="amount"><span className="currencySymbol">$</span>70.00</span>
                  </span>
                </div>
              </div>
            </li>
            <li className="item product-layout-left mb_20">
              <div className="product-list col-xs-4">
                <div className="product-thumb">
                  <div className="image product-imageblock"> <a href="product_detail_page.html"> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product2.jpg" /> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product2-1.jpg" /> </a> </div>
                </div>
              </div>
              <div className="col-xs-8">
                <div className="caption product-detail">
                  <h6 className="product-name"><a href="#">New Aviator Sunglasses</a></h6>
                  <div className="rating">
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-x" /></span>
                  </div>
                  <span className="price"><span className="amount"><span className="currencySymbol">$</span>70.00</span>
                  </span>
                </div>
              </div>
            </li>
            <li className="item product-layout-left mb_20">
              <div className="product-list col-xs-4">
                <div className="product-thumb">
                  <div className="image product-imageblock"> <a href="product_detail_page.html"> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product3.jpg" /> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product3-1.jpg" /> </a> </div>
                </div>
              </div>
              <div className="col-xs-8">
                <div className="caption product-detail">
                  <h6 className="product-name"><a href="#">New Aviator Sunglasses</a></h6>
                  <div className="rating">
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-1x" /></span>
                    <span className="fa fa-stack"><i className="fa fa-star-o fa-stack-1x" /><i className="fa fa-star fa-stack-x" /></span>
                  </div>
                  <span className="price"><span className="amount"><span className="currencySymbol">$</span>70.00</span>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
    <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
      {/* =====  BANNER STRAT  ===== */}
      {/* <div className="breadcrumb ptb_20">
        <h1>Products</h1>
        <ul>
          <li><Link to={"/"}>Home</Link></li>
          <li className="active">Products</li>
        </ul>
      </div> */}
      {/* =====  BREADCRUMB END===== */}
      {/* <div className="category-page-wrapper mb_30">
        <div className="col-xs-6 sort-wrapper">
          <label className="control-label" htmlFor="input-sort">Sort By :</label>
          <div className="sort-inner">
            <select id="input-sort" className="form-control">
              <option value="ASC" selected="selected">Default</option>
              <option value="ASC">Name (A - Z)</option>
              <option value="DESC">Name (Z - A)</option>
              <option value="ASC">Price (Low &gt; High)</option>
              <option value="DESC">Price (High &gt; Low)</option>
              <option value="DESC">Rating (Highest)</option>
              <option value="ASC">Rating (Lowest)</option>
              <option value="ASC">Model (A - Z)</option>
              <option value="DESC">Model (Z - A)</option>
            </select>
          </div>
          <span><i className="fa fa-angle-down" aria-hidden="true" /></span> </div>
        <div className="col-xs-4 page-wrapper">
          <label className="control-label" htmlFor="input-limit">Show :</label>
          <div className="limit">
            <select id="input-limit" className="form-control">
              <option value={8} selected="selected">08</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
              <option value={100}>100</option>
            </select>
          </div>
          <span><i className="fa fa-angle-down" aria-hidden="true" /></span> </div>
        <div className="col-xs-2 text-right list-grid-wrapper">
          <div className="btn-group btn-list-grid">
            <button type="button" id="list-view" className="btn btn-default list-view" />
            <button type="button" id="grid-view" className="btn btn-default grid-view active" />
          </div>
        </div>
      </div> */}
      {products &&  products.length !== 0 ?
      <div className="row">
      {products && products.map(product => (
            <Product key={product._id} product={product} item={"product-layout  product-grid  col-lg-3 col-md-4 col-xs-6"} col={"mb_30"} addtocart={() => addToCart(product._id,1)} user={user} isAuthenticated={isAuthenticated} favoriteHandler={(e) =>  favoriteHandler(e,product._id)}  favoriteDeleteHandler={(e) => favoriteDeleteHandler(e,product._id)}/>
      ))}
      </div>
       : <p className="mt_90 text-center">{t('product_filter.product_not_found')}</p> }
      {resPerPage <= count && (
           <div className={`${rtc1} mt_50`}>
               <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={count}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />

               </div>
      )}
      {/* <div className="pagination-nav text-center mt_50">
        <ul>
          <li><a href="#"><i className="fa fa-angle-left" /></a></li>
          <li className="active"><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#"><i className="fa fa-angle-right" /></a></li>
        </ul>
        
      </div> */}
    </div>
  </div>
  {/* <div id="brand_carouse" className="ptb_30 text-center">
    <div className="type-01">
      <div className="heading-part mb_20 ">
        <h2 className="main_title">Brand Logo</h2>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="brand owl-carousel ptb_20">
            <div className="item text-center"> <a href="#"><img src="images/brand/brand1.png" alt="Disney" className="img-responsive" /></a> </div>
            <div className="item text-center"> <a href="#"><img src="images/brand/brand2.png" alt="Dell" className="img-responsive" /></a> </div>
            <div className="item text-center"> <a href="#"><img src="images/brand/brand3.png" alt="Harley" className="img-responsive" /></a> </div>
            <div className="item text-center"> <a href="#"><img src="images/brand/brand4.png" alt="Canon" className="img-responsive" /></a> </div>
            <div className="item text-center"> <a href="#"><img src="images/brand/brand5.png" alt="Canon" className="img-responsive" /></a> </div>
            <div className="item text-center"> <a href="#"><img src="images/brand/brand6.png" alt="Canon" className="img-responsive" /></a> </div>
            <div className="item text-center"> <a href="#"><img src="images/brand/brand7.png" alt="Canon" className="img-responsive" /></a> </div>
            <div className="item text-center"> <a href="#"><img src="images/brand/brand8.png" alt="Canon" className="img-responsive" /></a> </div>
            <div className="item text-center"> <a href="#"><img src="images/brand/brand9.png" alt="Canon" className="img-responsive" /></a> </div>
          </div>
        </div>
      </div>
    </div>
  </div> */}
</div>

        </React.Fragment>
      )}
      </React.Fragment>
    )
}

export default ProductFilter
