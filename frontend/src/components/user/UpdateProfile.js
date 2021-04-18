import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { updateProfile,loadUser, clearErrors} from '../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import './user.css'
import { useTranslation } from "react-i18next";
import MetaData from '../layout/MetaData'

const UpdateProfile = ({ history }) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [avatar,setAvatar] = useState('')
    const [avatarPreview,setAvatarpreview] = useState('images/default_avatar.jpg')
    const alert = useAlert();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    const { error,isUpdated,loading } = useSelector(state => state.user)
    const [t, i18n] = useTranslation('common');
    const rt1 = ( i18n.language === 'pk' ? 'text-right' : '' )
    useEffect(() => {
        if(user) {
           setName(user.name);
           setEmail(user.email);
           setAvatarpreview(user.avatar.url)
        }
        if(error){
            alert.error(t(error));
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success(t('update_profile.successfully_user'))
            dispatch(loadUser());
            history.push('/me')
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

    }, [dispatch,alert,error,history,isUpdated,user,t])
    const submitHandler = (e) => {
        e.preventDefault();

        const formData =  new FormData();
        formData.set('name',name);
        formData.set('email',email);
        formData.set('avatar',avatar);
        dispatch(updateProfile(formData))
    }
    const onChange = e => {
        
            const reader = new FileReader();
            reader.onload= () => {
                if(reader.readyState === 2){
                    setAvatarpreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
         
    } 
    return (
        <React.Fragment>
            <div className="container">
            <MetaData title={'Update Profile'} />
  <div className="row ">

    <div id="column-left" className="col-sm-4 col-md-4 col-lg-3 hidden-xs">

      <div className="left_banner left-sidebar-widget mt_30 mb_40"> <a href="/"><img src="../images/left1.jpg" alt="Left Banner" className="img-responsive" /></a> </div>
    </div>
    <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
        {/* =====  BANNER STRAT  ===== */}
        <div className="breadcrumb ptb_20">
              <h1 style={{float:( i18n.language  === 'pk' ? 'right' : '')}}>{t('update_profile.update_profile')}</h1>
              <ul style={{float:( i18n.language  === 'pk' ? 'left' : '')}}>
                <li><Link to="/">{t('update_profile.home')}</Link></li>
                <li className="active">{t('update_profile.update_profile')}</li>
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
                       id="username" tabIndex={1} className={`form-control ${rt1}`} placeholder={t('update_profile.name')} value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <input type="email" name="email" id="email" tabIndex={1} className={`form-control ${rt1}`} placeholder={t('update_profile.email')} value={email} onChange={(e) => setEmail(e.target.value)} />
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
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="iamges/*"
                                        onChange={onChange}
                                    />
                                </div>
                                
                            </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                          <input type="submit" name="register-submit" value={t('update_profile.update_profile')}  style={{textAlign:( i18n.language  === 'pk' ? 'right' : '') }} id="register-submit" tabIndex={4} className="form-control btn btn-register"  disabled={loading ? true:false} />
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

export default UpdateProfile
