import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Search from './Search'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'
import { useTranslation } from "react-i18next";
import { getCategory } from '../../actions/categoryActions'
import { clearErrors, getBrand } from '../../actions/brandActions'

const Header = () => {
  const alert = useAlert();
  const disptach = useDispatch();
  const [t, i18n] = useTranslation('common');
  const rt1 = ( i18n.language === 'pk' ? 'text-right' : 'text-left' )
  const rt2 = ( i18n.language === 'pk' ? 'text-left' : 'text-left' )
  const rth1 = ( i18n.language === 'pk' ? 'header-top-right text-right' : 'header-top-left text-left' )
  const rth2 = ( i18n.language === 'pk' ? 'header-top-left text-left' : 'header-top-right text-right' )
  const rtmc1 = ( i18n.language === 'pk' ? 'pull-right' : 'pull-left' )
  const rtmc2 = ( i18n.language === 'pk' ? 'pull-left' : 'pull-right' )
  const [value, setValue] = React.useState(i18n.language);
  const { isAuthenticated,user, loading } = useSelector(state => state.auth)
  const {  category,error:categroyError } = useSelector(state => state.category)
  const { brand,error:brandError} = useSelector(state => state.brand)
  const { cartItems } = useSelector(state => state.cart)
  React.useEffect(() => {
    localStorage.setItem('language', value);
    disptach(getCategory());
    disptach(getBrand());
    if(categroyError){
      alert.error(categroyError)
      disptach(clearErrors())
      }
     if(brandError){
        alert.error(brandError)
        disptach(clearErrors())
     }
  }, [disptach,value,categroyError,brandError,alert]);

  const onChange = event => {
    setValue(event.target.value)
    i18n.changeLanguage(event.target.value)
  }
  const removeCartItemHandler = (id) => {
    disptach(removeItemFromCart(id))
  }

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    disptach(addItemToCart(id, newQty))
  }
  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    disptach(addItemToCart(id, newQty))
  }
  const logoutHandler = () => {
    disptach(logout())
    alert.success(t('logout.logout_msg'))
  }
  return (
    <React.Fragment>
      <header id="header">
        <div className="header-top">
          <div className="container">
            <div className="row">
              <div className={`col-sm-6 ${rtmc1}`}>
                <ul className={`${rth1}`} >
                  <li className="language dropdown">
                    <select value={value} onChange={onChange} style={{backgroundColor:'#000',color:'#fff',borderColor:'#000'}}>
                      <option value="en">English</option>
                      <option value="in">Hindi</option>
                      <option value="bd" >Bangla</option>
                      <option value="pk">Urdu</option>
                    </select>
                  </li>
                </ul>
              </div>
              <div className={`col-sm-6 ${rtmc2}`}>
                <ul className={`${rth2}`}>
                  {isAuthenticated ? (
                    <React.Fragment>
                      <li className="account">{user && user.name}</li>
                      { user && user.role !== 'admin' ? (
                        <React.Fragment>
                        <li className="account"><Link to={'/orders/me'}>{t('navbar.order')}</Link></li>
                        <li className="sitemap"><Link to="/me/favorite">{t('navbar.favorite')}</Link></li>
                        </React.Fragment> 
                      ) : (
                        <li className="account"><Link to={'/dashboard'}>{t('navbar.dashboard')}</Link></li>
                      )}
                      <li className="sitemap"><Link to="/me">{t('navbar.profile')}</Link></li>
                      <li className="account"><Link to="/" onClick={logoutHandler}>{t('navbar.logout')}</Link></li>
                    </React.Fragment>
                  ) : !loading && <React.Fragment><li className="account"><Link to={'/login'}>{t('navbar.login')}</Link></li><li className="account"><Link to={'/register'}>{t('navbar.register')}</Link></li></React.Fragment>}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="header">
          <div className="container">
            <nav className="navbar">
              <div className={`navbar-header mtb_20 ${rtmc1} `}> <Link className="navbar-brand" to={'/'}> <img alt="Coolsd" src="images/logo.png" /> </Link> </div>
              <div className={`${rtmc2} mtb_50`}>
                <button className={`navbar-toggle ${rtmc2}`} type="button" data-toggle="collapse" data-target=".js-navbar-collapse"> <span className="i-bar"><i className="fa fa-bars" /></span></button>
                <div className="shopping-icon">
                  <div className={`cart-item`} data-target="#cart-dropdown" data-toggle="collapse" aria-expanded="true" role="button"> {t('navbar.items')} : <span className="cart-qty">{cartItems.length}</span></div>
                  <div id="cart-dropdown" className="cart-menu collapse" style={{left:( i18n.language  === 'pk' ? '1px' : '')}}>
                    {cartItems.length === 0 ?
                      <React.Fragment>
                        <center>
                          <img className="mt_20" src="images/shopping-cart.png" alt="empty to cart" />
                          <h4 className={`mtb_20`} >{t('cart.empty_cart')}</h4>
                        </center>
                      </React.Fragment>
                      : (
                        <React.Fragment>
                          <ul key={cartItems.length}>
                            <li>
                              <table className="table table-striped">
                                <tbody>
                                  {cartItems.map(item => (
                                    <React.Fragment>
                                      <tr key={item.product}>
                                        <td className={`text-center ${rt1}`}><Link to={`/product/${item.product}`}><img height={'70px'} width={'70px'} src={item.image} alt={item.name} title={item.name} /></Link></td>
                                        <td className={`${rt1} product-name`}><Link to={`/product/${item.product}`}>{item.name}</Link>
                                          <span className={`${rt1} price`}>${item.price}</span>
                                          <React.Fragment>
                                            <span style={{ marginRight: '15px', fontSize: '15px' }} onClick={() => decreaseQty(item.product, item.quantity)}>-</span>
                                            <label style={{ fontSize: '15px' }}>{item.quantity}</label>
                                            <span style={{ marginLeft: '15px', fontSize: '15px' }} onClick={() => increaseQty(item.product, item.quantity, item.stock)} >+</span>
                                          </React.Fragment>
                                        </td>
                                        <td className={`text-center ${rt2}`}><span className="close-cart" onClick={() => removeCartItemHandler(item.product)}><i className="fa fa-times-circle" /></span></td>
                                      </tr>
                                    </React.Fragment>
                                  ))}

                                </tbody>
                              </table>
                            </li>
                            <li>
                              <table className="table">
                                <tbody>
                                  <tr className={`${rt1}`}>
                                    <td className={`${rt1}`}><strong>{t('cart.sub_total')} : {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)}</strong></td>
                                    <td className={`${rt1}`}>${cartItems.reduce((acc, item) => (acc + item.quantity * item.price), 0).toFixed(2)}</td>
                                  </tr>
                                  {/* <tr>
                        <td className="text-right"><strong>Eco Tax (-2.00)</strong></td>
                        <td className="text-right">$2.00</td>
                      </tr>
                      <tr>
                        <td className="text-right"><strong>VAT (20%)</strong></td>
                        <td className="text-right">$20.00</td>
                      </tr>
                      <tr>
                        <td className="text-right"><strong>Total</strong></td>
                        <td className="text-right">$2,122.00</td>
                      </tr> */}
                                </tbody>
                              </table>
                            </li>
                            <li className={`${rtmc1}`}>
                              <Link to={'/cart'}><button className={`btn  mt_10 `} >{t('cart.view_cart')}</button></Link>
                            </li>
                          </ul>
                        </React.Fragment>
                      )}
                  </div>
                </div>
                <Route render={({ history }) => <Search history={history}  rtmc2={rtmc2}/>} />
              </div>
              <div className={`collapse navbar-collapse js-navbar-collapse ${rtmc2}`}>
                <ul id="menu" className={`nav navbar-nav `}>
                  <li><NavLink to={'/'}>{t('navbar.home')}</NavLink></li> 
                  <li className="dropdown mega-dropdown"> <a href="!#" className="dropdown-toggle" data-toggle="dropdown">{t('navbar.glasses')}</a>
                    <ul className="dropdown-menu mega-dropdown-menu row">
                      <li className="col-md-3" className={`${rtmc1}`}>
                        <ul className={`${rt1}`}>
                          <li className="dropdown-header">{t('navbar.categories')}</li>
                          {category && category.map(categorys => (
                            <li key={categorys._id}><Link to={ categorys.type === 'store' ? `/category/${categorys._id}` : `/search/category/${categorys._id}`}> {categorys.name}</Link></li>
                          ))}
                        </ul>
                      </li>
    <li className="col-md-3" className={`${rtmc1}`}>
      <ul className={`${rt1}`}>
        <li className="dropdown-header">{t('navbar.brand')}</li>
        {brand && brand.map(brands => (
            <li  key={brands._id} key={brands._id}><Link to={ brands.type === 'store' ? `/brand/${brands._id}` : `/search/brand/${brands._id}`}>{brands.name}</Link></li>
        ))}
      </ul>
    </li>
    {/* <li className="col-md-3">
      <ul>
        <li id="myCarousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="item active"> <a href="#"><img src="images/menu-banner1.jpg" className="img-responsive" alt="Banner1" /></a></div>
           
            <div className="item"> <a href="#"><img src="images/menu-banner2.jpg" className="img-responsive" alt="Banner1" /></a></div>
          
            <div className="item"> <a href="#"><img src="images/menu-banner3.jpg" className="img-responsive" alt="Banner1" /></a></div>
            
          </div>
         
        </li>
     
      </ul>
    </li> */}
  </ul>
</li>

                </ul>
              </div>
              {/* /.nav-collapse */}
            </nav>
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

export default Header
