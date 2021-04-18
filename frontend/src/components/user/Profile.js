import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useTranslation } from "react-i18next";

const Profile = () => {
    const { user, loading } = useSelector(state => state.auth)
    const [t, i18n] = useTranslation('common');
    const rt1 = ( i18n.language === 'pk' ? 'text-right' : '' )
    return (
        <React.Fragment>
            {loading ? <Loader /> : (
                <React.Fragment>
                    <div className="container">
                    <MetaData title={'Profile'} />
                        <div className={`row ${rt1}`}>
                            <div id="column-left" className="col-sm-4 col-md-4 col-lg-3 hidden-xs">
                                <div className="left_banner left-sidebar-widget mt_30 mb_40"> <a href="!#"><img src="images/left1.jpg" alt="Left Banner" className="img-responsive" /></a> </div>
                            </div>
                            <div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
                                <div className="breadcrumb ptb_20">
                                    <h1 style={{float:( i18n.language  === 'pk' ? 'right' : '')}}>{t('profile.profile')}</h1>
                                    <ul style={{float:( i18n.language  === 'pk' ? 'left' : '')}}>
                                        <li><Link to="/">{t('profile.home')}</Link></li>
                                        <li className="active">{t('profile.profile')}</li>
                                    </ul>
                                </div>
                                <div className="row">
                                    <div className="col-md-9 col-md-offset-3">
                                        <div className="panel-login">
                                            <div className="panel-body">
                                                <div className="row justify-content-around mt-5 user-info">
                                                    <div className="col-12 col-md-3" >
                                                        <figure className='avatar avatar-profile' >
                                                            <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                                                        </figure>
                                                    </div>
                                                    <div className="col-12 col-md-5" style={{ paddingLeft: '10%' }}>
                                                        <h4>{t('profile.full_name')}</h4>
                                                        <p>{user.name}</p>

                                                        <h4>{t('profile.email')}</h4>
                                                        <p>{user.email}</p>

                                                        <h4>{t('profile.joined_on')}</h4>
                                                        <p>{String(user.createdAt).substring(0, 10)}</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-12" style={{ paddingTop: '2%' }}>
                                                    <Link to="/me/update" className="btn mt-5" style={{ paddingRight: '2%' }}>
                                                        {t('profile.edit_profile')}
                            </Link>
                                                    {user.role !== 'admin' && (
                                                        <Link to="/orders/me" className="btn mt-5 " style={{ paddingRight: '2%', marginLeft: '2%' }}>
                                                            My Orders
                                                        </Link>
                                                    )}

                                                    <Link to="/password/update" className="btn   mt-3" style={{ paddingRight: '2%', marginLeft: '2%' }}>
                                                        {t('profile.change_password')}
                            </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default Profile
