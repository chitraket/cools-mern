import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, getCategory } from '../../actions/categoryActions';
const Footer = () => {
  const [t, i18n] = useTranslation('common');
  const rt1 = ( i18n.language === 'pk' ? 'text-right' : '' )
  const alert = useAlert();
  const disptach = useDispatch();
  const {  category,error:categroyError } = useSelector(state => state.category)
  useEffect(() => {
    disptach(getCategory());
    
    if(categroyError){
    alert.error(categroyError)
    disptach(clearErrors())
    }
  
  }, [disptach,alert,categroyError])

    return (
        <React.Fragment>
            <div className="footer pt_60">
  <div className="container">
    <div className="row">
      <div className="col-md-3 footer-block">
        <div className="content_footercms_right">
          <div className="footer-contact">
            <div className="footer-logo mt_20 mb_40"> <a href="index-2.html"> <img src="images/footer-logo.png" alt="Cools" /> </a> </div>
            <ul>
              <li>B-14 Collins Street West Victoria 2386</li>
              <li>(+123) 456 789 - (+024) 666 888</li>
              <li>Contact@yourcompany.com</li>
            </ul>
            <div className="social_icon">
              <ul>
                <li><a href="!#"><i className="fa fa-facebook" /></a></li>
                <li><a href="!#"><i className="fa fa-google" /></a></li>
                <li><a href="!#"><i className="fa fa-linkedin" /></a></li>
                <li><a href="!#"><i className="fa fa-twitter" /></a></li>
                <li><a href="!#"><i className="fa fa-rss" /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-2 footer-block">
        <h6 className={`footer-title ptb_20 ${rt1}`}style={{paddingRight:(i18n.language  === 'pk' ? '20px' : '')}} > {t('footer.categories')}</h6>
        <ul>
        {category && category.map(categorys => (
            <li key={categorys._id}> <Link to={ categorys.type === 'store' ? `/category/${categorys._id}` : `/search/category/${categorys._id}`}>{categorys.name}</Link></li>        
          ))}
        </ul>
      </div>
      {/* <div className="col-md-2 footer-block">
        <h6 className="footer-title ptb_20">Information</h6>
        <ul>
          <li><a href="contact.html">Specials</a></li>
          <li><a href="!#">New Products</a></li>
          <li><a href="!#">Best Sellers</a></li>
          <li><a href="!#">Our Stores</a></li>
          <li><a href="!#">Contact Us</a></li>
          <li><a href="!#">About Us</a></li>
        </ul>
      </div> */}
      <div className="col-md-3">
        <h6 className="ptb_20">SIGN UP OUR NEWSLETTER</h6>
        <p className="mt_10 mb_20">For get offers from our favorite brands &amp; get 20% off for next </p>
        <div className="form-group">
          <input className="mb_20" type="text" placeholder="Enter Your Email Address" />
          <button className="btn">Subscribe</button>
        </div>
      </div>
    </div>
  </div>
  <div className="footer-bottom mt_60 ptb_10">
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <div className="copyright-part">@ 2021 All Rights Reserved Cools</div>
        </div>
        <div className="col-sm-6">
          <div className="payment-icon text-right">
            <ul>
              <li><i className="fa fa-cc-paypal " /></li>
              <li><i className="fa fa-cc-stripe" /></li>
              <li><i className="fa fa-cc-visa" /></li>
              <li><i className="fa fa-cc-discover" /></li>
              <li><i className="fa fa-cc-mastercard" /></li>
              <li><i className="fa fa-cc-amex" /></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
        </React.Fragment>
    )
}

export default Footer
