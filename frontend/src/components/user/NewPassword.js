import React, {  useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearErrors } from '../../actions/userActions'
import MetaData from '../layout/MetaData'
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom'

const NewPassword = ({ history,match}) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [t, i18n] = useTranslation('common');
    const alert = useAlert();
    const dispatch = useDispatch();

  const { error, success } = useSelector(state => state.forgotPassword)

  useEffect(() => {

      if (error) {
          alert.error(t(error));
          dispatch(clearErrors());
      }
      if (success) {
          alert.success(t('reset_password.successfully_password'))
          history.push('/login')
      }

  }, [dispatch, alert, error, success,history,t])

  const submitHandler = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.set('password', password);
        formData.set('confirmPassword',confirmPassword);
      dispatch(resetPassword(match.params.token,formData))
  }
    return (
        <React.Fragment>
                        <div className="container">
                        <MetaData title={'Reset Password'} />
  <div className="row ">

    <div id="column-left" className="col-sm-4 col-md-4 col-lg-3 hidden-xs">

      <div className="left_banner left-sidebar-widget mt_30 mb_40"> <a href="/"><img src="images/left1.jpg" alt="Left Banner" className="img-responsive" /></a> </div>
    </div>
    <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
    <div className="breadcrumb ptb_20">
              <h1 style={{float:( i18n.language  === 'pk' ? 'right' : '')}}>{t('reset_password.reset_password')}</h1>
              <ul style={{float:( i18n.language  === 'pk' ? 'left' : '')}}>
                <li><Link to="/">{t('reset_password.home')}</Link></li>
                <li className="active">{t('reset_password.reset_password')}</li>
              </ul>
            </div>
        {/* =====  BANNER STRAT  ===== */}
      {/* contact  */}
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel-login">
            <div className="panel-body">
              <div className="row">
                <div className="col-lg-12">
                  <form  onSubmit={submitHandler} >
                    <div className="form-group">
                      <input type="password" name="password" id="password" tabIndex={1} className="form-control" placeholder={t('reset_password.new_password')}  value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <input type="password" name="confirm_password" id="confirm_password" tabIndex={1} className="form-control" placeholder={t('reset_password.confirm_password')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                          <input type="submit" name="register-submit" id="register-submit" value={t('reset_password.set_password')} style={{textAlign:( i18n.language  === 'pk' ? 'right' : '') }} tabIndex={4} className="form-control btn btn-register"   />
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

export default NewPassword
