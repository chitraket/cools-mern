import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { register, clearErrors} from '../../actions/userActions'
import { useTranslation } from "react-i18next";
import './user.css'
import MetaData from '../layout/MetaData'

const Register = ({ history }) => {
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:''
    })
    const [t, i18n] = useTranslation('common');
    const rt1 = ( i18n.language === 'pk' ? 'text-right' : '' )
    const {name,email,password} = user
    const [avatar,setAvatar] = useState('')
    const [avatarPreview,setAvatarpreview] = useState('images/laptop-user-1-1179329.png')
    const alert = useAlert();
    const dispatch = useDispatch();
    const { isAuthenticated,error,loading} = useSelector(state => state.auth)
    if (isAuthenticated) {
      history.push('/')
    }
    useEffect(() => {
        if(error){
            alert.error(t(error));
            dispatch(clearErrors());
        }

    }, [dispatch,alert,error,history,t])
    const submitHandler = (e) => {
        e.preventDefault();

        const formData =  new FormData();
        formData.set('name',name);
        formData.set('email',email);
        formData.set('password',password);
        formData.set('avatar',avatar);
        dispatch(register(formData))
    }
    const onChange = e => {
        if(e.target.name === 'avatar'){
            const reader = new FileReader();
            reader.onload= () => {
                if(reader.readyState === 2){
                    setAvatarpreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
         }else{
            setUser({ ...user,[e.target.name]: e.target.value})
        }
    } 
    return (
        <React.Fragment>
             <div className="container">
             <MetaData title={'Register'} />
  <div className="row ">

    <div id="column-left" className="col-sm-4 col-md-4 col-lg-3 hidden-xs">

      <div className="left_banner left-sidebar-widget mt_30 mb_40"> <a href="/"><img src="images/left1.jpg" alt="Left Banner" className="img-responsive" /></a> </div>
    </div>
    <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
        {/* =====  BANNER STRAT  ===== */}
        <div className="breadcrumb ptb_20">
              <h1 style={{float:( i18n.language  === 'pk' ? 'right' : '')}}>{t('register.register')}</h1>
              <ul style={{float:( i18n.language  === 'pk' ? 'left' : '')}}>
                <li><Link to="/">{t('register.home')}</Link></li>
                <li className="active">{t('register.register')}</li>
              </ul>
            </div>
      {/* contact  */}
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel-login">
            <div className="panel-body">
              <div className="row">
                <div className="col-lg-12">
                  <form  onSubmit={submitHandler} encType='multipart/form-data'>
                    <div className="form-group">
                      <input type="text" name="name"
                       id="username" tabIndex={1} className={`form-control ${rt1}`} placeholder={t('register.name')} value={name} onChange={onChange} />
                    </div>
                    <div className="form-group">
                      <input type="text" name="email" id="email" tabIndex={1} className={`form-control ${rt1}`} placeholder={t('register.email')} value={email} onChange={onChange} />
                    </div>
                    <div className="form-group">
                      <input type="password" name="password" id="password2" tabIndex={2} className={`form-control ${rt1}`} placeholder={t('register.password')} value={password} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                            <div className='d-flex align-items-center'>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className={`custom-file-input ${rt1}`}
                                        id='customFile'
                                        accept="iamges/*"
                                        onChange={onChange}
                                    />
                                </div>
                                
                            </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                          <input type="submit" name="register-submit"  value={t('register.register')} id="register-submit" tabIndex={4} className="form-control btn btn-register" style={{textAlign:( i18n.language  === 'pk' ? 'right' : '') }}  disabled={loading ? true:false} />
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

export default Register
