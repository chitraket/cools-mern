import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItemToCart,removeItemFromCart } from '../../actions/cartActions';
import { useTranslation } from "react-i18next";
import MetaData from '../layout/MetaData';

function Cart({history}) {
    const dispatch = useDispatch();
    const [t, i18n] = useTranslation('common');
  const rt1 = ( i18n.language === 'pk' ? 'text-right' : 'text-left' )
  const rt12 = ( i18n.language === 'pk' ? 'text-right' : '' )
    const { cartItems } = useSelector(state => state.cart)
    const removeCartItemHandler = (id) => {
      dispatch(removeItemFromCart(id))
    }
    const increaseQty=(id , quantity , stock,color)=> {
        const newQty = quantity + 1;
        if(newQty > stock) return;
        dispatch(addItemToCart(id,newQty,color))
      }
      const decreaseQty=(id,quantity,color)=> {
        const newQty = quantity - 1;
        if(newQty <= 0) return;
        dispatch(addItemToCart(id,newQty,color))
      }
      const checkoutHandler=()=> {
        history.push('/login?redirect=shipping')
      }
    return (
        <React.Fragment>
           <MetaData title={'Cart'} />
            {cartItems.length === 0 ? 
            <React.Fragment>
             
            <div className="mt_20 text-center">
            <img  src="images/animation.gif" alt="empty cart"/>
             <h2 className={`mb_40 ${rt12}`} style={{paddingRight:( i18n.language  === 'pk' ? '50px' : '')}}> {t('cart.empty_cart')}</h2>
              </div>
            </React.Fragment> : (
                <React.Fragment>
    <div className="container">
  <div className="row ">
    <div id="column-left" className="col-sm-4 col-md-4 col-lg-3 hidden-xs">
      <div className="left_banner left-sidebar-widget mb_50 mt_30"> <a href="!#"><img src="images/left1.jpg" alt="Left Banner" className="img-responsive" /></a> </div>
      {/* <div className="left-special left-sidebar-widget mb_50">
        <div className="heading-part mb_20 ">
          <h2 className="main_title">Top Products</h2>
        </div>
        <div id="left-special" className="owl-carousel">
          <ul className="row ">
            <li className="item product-layout-left mb_20">
              <div className="product-list col-xs-4">
                <div className="product-thumb">
                  <div className="image product-imageblock"> <a href="product_detail_page.html"> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product1.jpg" /> <img className="img-responsive" title="iPod Classic" alt="iPod Classic" src="images/product/product1-1.jpg" /> </a> </div>
                </div>
              </div>
              <div className="col-xs-8">
                <div className="caption product-detail">
                  <h6 className="product-name"><a href="!#">New Aviator Sunglasses</a></h6>
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
          <ul className="row ">
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
          </ul>
          <ul className="row ">
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
          </ul>
          <ul className="row ">
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
          </ul>
        </div>
      </div> */}
    </div>
    <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
      {/* =====  BANNER STRAT  ===== */}
      <div className="breadcrumb ptb_20">
        <h1 style={{float:( i18n.language  === 'pk' ? 'right' : '')}}>{t('cart.shopping_cart')}</h1>
        <ul style={{float:( i18n.language  === 'pk' ? 'left' : '')}}>
          <li><a href="index-2.html">{t('cart.home')}</a></li>
          <li className="active">{t('cart.shopping_cart')}</li>
        </ul>
      </div>
      {/* =====  BREADCRUMB END===== */}
      <form encType="multipart/form-data" method="post" >
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <td className={`${rt1}`}>{t('cart.image')}</td>
                <td className={`${rt1}`}>{t('cart.name')}</td>
                <td className={`${rt1}`}>{t('cart.category')}</td>
                <td className={`${rt1}`}>Color</td>
                <td className={`${rt1}`}>{t('cart.quantity')}</td>
                <td className={`${rt1}`}>{t('cart.unit_price')}</td>
                <td className={`${rt1}`}>{t('cart.total')}</td>
                <td className={`${rt1}`}>{t('cart.delete')}</td>
              </tr>
            </thead>
            <tbody>

              {cartItems.map(item => (
                    <React.Fragment>
                                      <tr key={item.product}>
                    <td className={`${rt1}`}><Link to={`/product/${item.product}`}><img height={'70px'} width={'70px'} src={item.image} alt={item.name} title={item.name}/></Link></td>
                <td className={`${rt1}`}><Link to={`/product/${item.product}`}>{item.name}</Link></td>
                <td className={`${rt1}`}>{item.category}</td>
                <td className={`${rt1}`}>{item.color}</td>
                <td className={`${rt1}`}>
                    <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" style={{marginRight:'5px'}} onClick={()=> decreaseQty(item.product,item.quantity,item.color)}>-</span>
                                <input type="number" className="form-control count d-inline quantity" style={{width:'15%'}}  value={item.quantity} readOnly />
                                <span className="btn btn-danger plus" style={{marginLeft:'5px'}} onClick={()=> increaseQty(item.product,item.quantity,item.stock,item.color)} >+</span>
                            </div>
                </td>
                <td className={`${rt1}`}>${item.price}</td>
                <td className={`${rt1}`}>${item.price*item.quantity}</td>
                <td className={`${rt1}`}><span className="btn btn-danger" onClick={()=> removeCartItemHandler(item.product)}><i className="fa fa-trash " ></i></span></td>
                </tr>
                    </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </form>
      <div className="row">
        <div className="col-sm-6 col-sm-offset-6">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className={`${rt1}`}><strong>{t('cart.sub_total')} : {cartItems.reduce((acc,item)=>(acc + Number(item.quantity)),0)}</strong></td>
                <td className={`${rt1}`}>${cartItems.reduce((acc,item)=>(acc + item.quantity * item.price),0).toFixed(2)}</td>
              </tr>
              {/* <tr>
                <td className="text-right"><strong>Eco Tax (-2.00):</strong></td>
                <td className="text-right">$2.00</td>
              </tr>
              <tr>
                <td className="text-right"><strong>VAT (20%):</strong></td>
                <td className="text-right">$42.00</td>
              </tr>
              <tr>
                <td className="text-right"><strong>Total:</strong></td>
                <td className="text-right">$254.00</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
      
        <button className="btn pull-right mt_30" type="submit" style={{textAlign:( i18n.language  === 'pk' ? 'right' : '') }}  onClick={checkoutHandler}>{t('cart.check_out')}</button>
    </div>
  </div>
</div>


                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default Cart
