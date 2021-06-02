import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { login, clearErrors} from '../../actions/userActions'
import { useTranslation } from "react-i18next";
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
const Login = ({ history ,location }) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [t, i18n] = useTranslation('common');
    const rt1 = ( i18n.language === 'pk' ? 'text-right' : '' )
    const alert = useAlert();
    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector(
      (state) => state.auth
    );
    const redirect = location.search ? location.search.split('=')[1] : '/'
    if (isAuthenticated) {
      history.push(redirect)
    }
    useEffect(() => {
      
        if(error){
            alert.error(t(error));
            dispatch(clearErrors());
        }

    }, [dispatch,alert,error,history,redirect,t])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email,password))
    }
    return (
       <React.Fragment>
          {loading ? <Loader/> : ( 
            <div className="container">
              <MetaData title={'Login'} />
        <div className="row ">
        <div id="column-left" className="col-sm-4 col-md-4 col-lg-3 hidden-xs">
        <div className="left_banner left-sidebar-widget mt_30 mb_40"> <a href="/"><img src="images/left1.jpg" alt="Left Banner" className="img-responsive" /></a> </div>
        </div>
    <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
        <div className="breadcrumb ptb_20">
              <h1 style={{float:( i18n.language  === 'pk' ? 'right' : '')}}>{t('login.login')}</h1>
              <ul style={{float:( i18n.language  === 'pk' ? 'left' : '')}}>
                <li><Link to="/">{t('login.home')}</Link></li>
                <li className="active">{t('login.login')}</li>
              </ul>
            </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel-login">
            <div className="panel-body">
              <div className="row">
                <div className="col-lg-12">
                  <form   onSubmit={submitHandler} >
                    <div className="form-group">
                      <input type="text" name="username" id="username1" tabIndex={1} className={`form-control ${rt1}`} placeholder={t('login.email')} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <input type="password" name="password" id="password" tabIndex={2} className={`form-control ${rt1}`} placeholder={t('login.password')} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                          <input type="submit" name="login-submit" value={t('login.login')} id="login-submit" tabIndex={4} className={`form-control btn btn-login ${rt1}`} style={{textAlign:( i18n.language  === 'pk' ? 'right' : '') }}/>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="text-center">
                            <Link to={"/password/forgot"} tabIndex={5} style={{textAlign:( i18n.language  === 'pk' ? 'right' : '') }} className={`forgot-password ${rt1}`}>{t('login.forgot_password')}</Link>
                          </div>
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
) }
       </React.Fragment>
    )
}

export default Login
