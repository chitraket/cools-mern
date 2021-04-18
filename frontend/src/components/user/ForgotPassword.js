import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { forgotPassword, clearErrors } from '../../actions/userActions'
import MetaData from '../layout/MetaData'
import { useTranslation } from "react-i18next";

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [t, i18n] = useTranslation('common');
  const rt1 = ( i18n.language === 'pk' ? 'text-right' : '' )
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading, message } = useSelector(state => state.forgotPassword)

  useEffect(() => {
      if (error) {
          alert.error(t(error));
          dispatch(clearErrors());
      }
      if (message) {
          alert.success(t(message, {user:email}));
          dispatch(clearErrors());
      }
  }, [dispatch, alert, error, message,t,email])

  const submitHandler = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.set('email', email);

      dispatch(forgotPassword(formData))
  }
    return (
        <React.Fragment>
            <div className="container">
            <MetaData title={'Frogot Password'} />
  <div className="row">

    <div id="column-left" className="col-sm-4 col-md-4 col-lg-3 hidden-xs">

      <div className="left_banner left-sidebar-widget mt_30 mb_40"> <a href="/"><img src="../images/left1.jpg" alt="Left Banner" className="img-responsive" /></a> </div>
    </div>
    <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
        {/* =====  BANNER STRAT  ===== */}
        <div className="breadcrumb ptb_20">
              <h1 style={{float:( i18n.language  === 'pk' ? 'right' : '')}}>{t('forgot_password.forgot_password')}</h1>
              <ul style={{float:( i18n.language  === 'pk' ? 'left' : '')}}>
                <li><Link to="/">{t('forgot_password.home')}</Link></li>
                <li className="active">{t('forgot_password.forgot_password')}</li>
              </ul>
            </div>
      {/* contact  */}
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel-login">
            <div className="panel-body">
              <div className="row">
                <div className="col-lg-12">
                  <form  onSubmit={submitHandler} >
                    <div className="form-group">
                      <input type="text" name="email" id="email" tabIndex={1} className={`form-control ${rt1}`} placeholder={t('forgot_password.email')} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                          <input type="submit" name="register-submit" id="register-submit" value={t('forgot_password.send_email')} style={{textAlign:( i18n.language  === 'pk' ? 'right' : '') }} tabIndex={4} className="form-control btn btn-register"  disabled={loading ? true:false} />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
        </React.Fragment>
    )
}

export default ForgotPassword
