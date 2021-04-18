import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Search from './Search'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'
import { useTranslation } from "react-i18next";

const Header = () => {
  const [t, i18n] = useTranslation('common');
  const rt1 = ( i18n.language === 'pk' ? 'text-right' : '' )
  const [value, setValue] = React.useState(i18n.language);
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated,user, loading } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.cart)
  React.useEffect(() => {
    localStorage.setItem('language', value);
  }, [value]);

  const onChange = event => {
    setValue(event.target.value)
    i18n.changeLanguage(event.target.value)
  }
  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id))
  }

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(addItemToCart(id, newQty))
  }
  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    dispatch(addItemToCart(id, newQty))
  }
  const logoutHandler = () => {
    dispatch(logout())
    alert.success(t('logout.logout_msg'))
  }
  return (
    <React.Fragment>
      <header id="header">
        <div className="header-top">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <ul className="header-top-left">
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
              <div className="col-sm-6">
                <ul className="header-top-right text-right">
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
                      <li className="account"><Link to="/" onClick={logoutHandler}> {t('navbar.logout')}</Link></li>
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
              <div className="navbar-header mtb_20"> <Link className="navbar-brand" to={'/'}> <img alt="Coolsd" src="images/logo.png" /> </Link> </div>
              <div className="header-right pull-right mtb_50">
                <button className="navbar-toggle pull-left" type="button" data-toggle="collapse" data-target=".js-navbar-collapse"> <span className="i-bar"><i className="fa fa-bars" /></span></button>
                <div className="shopping-icon">
                  <div className={`cart-item ${rt1}`} data-target="#cart-dropdown" data-toggle="collapse" aria-expanded="true" role="button"> {t('navbar.items')} : <span className="cart-qty">{cartItems.length}</span></div>
                  <div id="cart-dropdown" className="cart-menu collapse">
                    {cartItems.length === 0 ?
                      <React.Fragment>
                        <center>
                          <img className="mt_20" src="images/shopping-cart.png" alt="empty to cart" />
                          <h4 className={`mtb_20 ${rt1}`} style={{paddingRight:(i18n.language  === 'pk' ? '20px' : '')}}>{t('cart.empty_cart')}</h4>
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
                                        <td className="text-center"><Link to={`/product/${item.product}`}><img height={'70px'} width={'70px'} src={item.image} alt={item.name} title={item.name} /></Link></td>
                                        <td className="text-left product-name"><Link to={`/product/${item.product}`}>{item.name}</Link>
                                          <span className="text-left price">${item.price}</span>
                                          <React.Fragment>
                                            <span style={{ marginRight: '15px', fontSize: '15px' }} onClick={() => decreaseQty(item.product, item.quantity)}>-</span>
                                            <label style={{ fontSize: '15px' }}>{item.quantity}</label>
                                            <span style={{ marginLeft: '15px', fontSize: '15px' }} onClick={() => increaseQty(item.product, item.quantity, item.stock)} >+</span>
                                          </React.Fragment>
                                        </td>
                                        <td className="text-center"><span className="close-cart" onClick={() => removeCartItemHandler(item.product)}><i className="fa fa-times-circle" /></span></td>
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
                                    <td className="text-right"><strong>{t('cart.sub_total')} : {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)}</strong></td>
                                    <td className="text-right">${cartItems.reduce((acc, item) => (acc + item.quantity * item.price), 0).toFixed(2)}</td>
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
                            <li style={{float:( i18n.language  === 'pk' ? 'right' : '')}}>
                              <Link to={'/cart'}><button className={`btn pull-left mt_10 ${rt1}`} style={{textAlign:( i18n.language  === 'pk' ? 'right' : '') }}>{t('cart.view_cart')}</button></Link>
                            </li>
                          </ul>
                        </React.Fragment>
                      )}
                  </div>
                </div>
                <Route render={({ history }) => <Search history={history} />} />
              </div>
              <div className="collapse navbar-collapse js-navbar-collapse pull-right">
                <ul id="menu" className={`nav navbar-nav ${rt1}`}>
                  <li><NavLink to={'/'}>{t('navbar.home')}</NavLink></li> 
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
