import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { countries } from 'countries-list'
import { Link } from 'react-router-dom'
import { saveShippingInfo } from '../../actions/cartActions';
import { useTranslation } from "react-i18next";
import MetaData from '../layout/MetaData';

const Shipping = ({ history }) => {
  const countriesList = Object.values(countries)
  const [t, i18n] = useTranslation('common');
  const rt1 = ( i18n.language === 'pk' ? 'text-right' : '' )
    const { shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [country, setCountry] = useState(shippingInfo.country)

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }))
        history.push('/confirm')
    }
  return (
    <React.Fragment>
       <MetaData title={'Shopping'} />
      {/* =====  CONTAINER START  ===== */}
      <div className="container">
        <div className="row ">
          <div id="column-left" className="col-sm-4 col-md-4 col-lg-3 hidden-xs">
            <div className="left_banner left-sidebar-widget mb_50 mt_30"> <a href="!#"><img src="images/left1.jpg" alt="Left Banner" className="img-responsive" /></a> </div>
          </div>
          <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
            {/* =====  BANNER STRAT  ===== */}
            <div className="breadcrumb ptb_20">
              <h1 style={{float:( i18n.language  === 'pk' ? 'right' : '')}}>{t('shopping.shopping')}</h1>
              <ul style={{float:( i18n.language  === 'pk' ? 'left' : '')}}>
                <li><Link to={'/'}>{t('shopping.home')}</Link></li>
                <li className="active">{t('shopping.shopping')}</li>
              </ul>
            </div>
            {/* =====  BREADCRUMB END===== */}
            <div className="panel-group">
              <div className="panel">
                <div className="panel-body">
                  <form className="form-horizontal" onSubmit={submitHandler}>
                    <div className="form-group required">
                      <label htmlFor="input-payment-address-1" className="col-sm-2 control-label">{t('shopping.address')}</label>
                      <div className="col-sm-10">
                        <input type="text" className={`form-control ${rt1}`} id="input-payment-address-1" placeholder={t('shopping.address')} value={address} onChange={(e) => setAddress(e.target.value)}  name="address_1" required/>
                      </div>
                    </div>
                    <div className="form-group required">
                      <label htmlFor="input-payment-city" className="col-sm-2 control-label">{t('shopping.city')}</label>
                      <div className="col-sm-10">
                        <input type="text" className={`form-control ${rt1}`} id="input-payment-city" placeholder={t('shopping.city')} value={city} onChange={(e) => setCity(e.target.value)}  name="city" required/>
                      </div>
                    </div>
                    <div className="form-group required">
                      <label htmlFor="input-payment-city" className="col-sm-2 control-label">{t('shopping.phone')}</label>
                      <div className="col-sm-10">
                        <input type="number" className={`form-control ${rt1}`} id="input-payment-city" placeholder={t('shopping.phone')} value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}  name="phone" required/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="input-payment-postcode" className="col-sm-2 control-label">{t('shopping.post_code')}</label>
                      <div className="col-sm-10">
                        <input type="text" className={`form-control ${rt1}`} id="input-payment-postcode" placeholder={t('shopping.post_code')} value={postalCode} onChange={(e) => setPostalCode(e.target.value)}  name="postalCode" required/>
                      </div>
                    </div>
                    <div className="form-group required">
                      <label htmlFor="input-payment-country" className="col-sm-2 control-label">{t('shopping.country')}</label>
                      <div className="col-sm-10" >
                        <select className={`form-control ${rt1}`} id="input-payment-country" value={country} onChange={(e) => setCountry(e.target.value)} name="country_id" required>
                          {countriesList.map(country => (
                            <option key={country.name} value={country.name} >{country.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="buttons clearfix">
                      <div className="pull-right">
                        <input type="submit" className="btn"  id="button-payment-address" value={t('shopping.save_address')} />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Shipping
