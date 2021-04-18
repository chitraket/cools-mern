import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { updatePassword, clearErrors} from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import MetaData from '../layout/MetaData'

function UpdatePassword({ history }) {
    const [oldPassword,setOldPassword] = useState('')
    const [password,setPassword] = useState('')
    const alert = useAlert();
    const dispatch = useDispatch();
    const { error,isUpdated,loading } = useSelector(state => state.user)
    const [t, i18n] = useTranslation('common');
    const rt1 = ( i18n.language === 'pk' ? 'text-right' : '' )
    useEffect(() => {
       
        if(error){
            alert.error(t(error));
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success(t('update_password.successfully_password'))
            history.push('/me')
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch,alert,error,history,isUpdated,t])
    const submitHandler = (e) => {
        e.preventDefault();

        const formData =  new FormData();
        formData.set('oldPassword',oldPassword);
        formData.set('password',password);
        
        dispatch(updatePassword(formData))
    }
    return (
        <React.Fragment>
              <div className="container">
              <MetaData title={'Update Password'} />
  <div className="row ">

    <div id="column-left" className="col-sm-4 col-md-4 col-lg-3 hidden-xs">

      <div className="left_banner left-sidebar-widget mt_30 mb_40"> <a href="/"><img src="../images/left1.jpg" alt="Left Banner" className="img-responsive" /></a> </div>
    </div>
    <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
        {/* =====  BANNER STRAT  ===== */}
        <div className="breadcrumb ptb_20">
              <h1 style={{float:( i18n.language  === 'pk' ? 'right' : '')}}>{t('update_password.update_password')}</h1>
              <ul style={{float:( i18n.language  === 'pk' ? 'left' : '')}}>
                <li><Link to="/">{t('update_password.home')}</Link></li>
                <li className="active">{t('update_password.update_password')}</li>
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
                      <input type="password" name="old_password"
                       id="old_password" tabIndex={1} className={`form-control ${rt1}`} placeholder={t('update_password.old_password')} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <input type="password" name="new_password" id="new_password" tabIndex={1} className={`form-control ${rt1}`} placeholder={t('update_password.new_password')} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                          <input type="submit" name="register-submit" id="register-submit" value={t('update_password.update_password')} style={{textAlign:( i18n.language  === 'pk' ? 'right' : '') }} tabIndex={4} className="form-control btn btn-register"  disabled={loading ? true:false} />
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

export default UpdatePassword
