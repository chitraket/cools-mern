import React, {  useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Loader from './layout/Loader';
import { getCategory } from '../actions/categoryActions'
import { Link } from 'react-router-dom'
import { getBrand } from '../actions/brandActions'
import { clearErrors, getSlider } from '../actions/sliderActions'
import { useTranslation } from "react-i18next";
import SliderList from './admin/SliderList'
import './Home.scss'
import NewProduct from './product/NewProduct'
import MetaData from './layout/MetaData'
import TopProduct from './product/TopProduct'
function Home() {
  const alert = useAlert();
  const disptach = useDispatch();
  const [t, i18n] = useTranslation('common');
  const rt1 = ( i18n.language === 'pk' ? 'text-right' : '' )
  const rta1 = ( i18n.language === 'pk' ? 'text-left' : 'text-right' )
  const {  category,error:categroyError } = useSelector(state => state.category)
  const { brand,error:brandError} = useSelector(state => state.brand)
  const { loading, slider,error:sliderError} = useSelector(state => state.slider)
  const carousel = useRef(null);
  useEffect(() => {
    disptach(getCategory());
    disptach(getBrand());
    disptach(getSlider());
    if(sliderError){
      alert.error(sliderError);
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
  }, [disptach,alert,categroyError,brandError,sliderError])
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Object.keys(category).length > 6 ? 6 : Object.keys(category).length,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows:false,
    initialSlide: 0,
    responsive: [
      {
          breakpoint: 1024,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false
          }
      },
      {
          breakpoint: 768,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              initialSlide: 3
          }
      },
      {
          breakpoint: 600,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
          }
      },
      {
          breakpoint: 480,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      }
  ]
  };
  const settingss = {
    dots: true,
    arrows:true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  };
  const settings_brand = {
    dots: false,
    arrows:true,
    infinite: true,
    speed: 500,
    slidesToShow: Object.keys(brand).length > 5 ? 5 : Object.keys(brand).length,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    initialSlide: 0,
    responsive: [
      {
          breakpoint: 1024,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false
          }
      },
      {
          breakpoint: 768,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              initialSlide: 3
          }
      },
      {
          breakpoint: 600,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
          }
      },
      {
          breakpoint: 480,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      }
  ]
  };
  return (
    <React.Fragment>
      {loading ? <Loader/> : (
        
          <div className="wrapper">
             <MetaData title={'Buy Best Products Online'} />
          {/* =====  BANNER STRAT  ===== */}
          <div className="banner">
              <Slider {...settingss}>
              {slider && slider.map(sliders => (
                        <div className="item " key={sliders._id}> <Link to={sliders.url}> <img src={sliders.images.url} alt={SliderList.name} className="img-responsive" /> </Link> </div>
                    ))}
              </Slider>
          </div>
          {/* =====  BANNER END  ===== */}
          <div className="row">
          </div>
          {/* =====  CONTAINER START  ===== */}
          <div className="container">
            <div className="row ">
              
              <div className="pt_30 text-center">
                <div className="type-01">
                  <div className="col-sm-12">
                  <Slider {...settings}>
                  {category && category.map(categorys => (
                        <div className="item text-center" key={categorys._id}> <Link to={ categorys.type === 'store' ? `/category/${categorys._id}` : `/search/category/${categorys._id}`}> <img src={categorys.images.url} alt={categorys.name} className="img-responsive" /> </Link> </div>
                    ))}
                    </Slider>
                  </div>
                </div>
              </div>
              <NewProduct carousel={carousel} title={t('home.new_product')} sort="createdAt" order="desc" rt1={rt1} rta1={rta1} i18n={i18n} t={t}/>
              <TopProduct carousel={carousel} title={t('home.best_selling_product')} sort="sold" order="desc"  rt1={rt1} rta1={rta1} i18n={i18n} t={t}/>
            </div>
            <div id="brand_carouse" className="mtb_40 text-center">
              <div className="type-01">
                <div className="heading-part mb_20 ">
                  <h2 className={`main_title ${rt1}`} style={{float:( i18n.language  === 'pk' ? 'right' : ''),paddingLeft:(i18n.language  === 'pk' ? '10px' : '')}}>{t('home.brand')}</h2>
                  <div className={`${rta1}`}>
                  {brand.length >= 5 ? <React.Fragment>
                        <button className="btn" style={{marginRight:'5px',padding:'5px'}} onClick={() => carousel.current.slickPrev()}><i className="fa fa-arrow-left" /></button>
                        <button className="btn" style={{padding:'5px'}} onClick={() => carousel.current.slickNext()}><i className="fa fa-arrow-right" /></button>
                        </React.Fragment> : ''
                }
                      </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="brand  ptb_20">
                    <Slider {...settings_brand} 
                    ref={carousel}
                  >
                  {brand && brand.map(brands => (
                        <div className="item text-center" key={brands._id}> <Link to={ brands.type === 'store' ? `/brand/${brands._id}` : `/search/brand/${brands._id}`}>  <img src={brands.images.url} alt={brands.name} className="img-responsive" /> </Link> </div>
                    ))}
                    </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* =====  CONTAINER END  ===== */}
        </div>
      )}

    </React.Fragment>
  )
}

export default Home
