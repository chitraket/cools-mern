import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import './user.css'
import { clearErrors, deletefavorite, getFavorite, loadUser } from '../../actions/userActions'
import { DELETE_FAVORITE_RESET } from '../../constants/userConstants'
import Loader from '../layout/Loader'
import { useTranslation } from "react-i18next";
import MetaData from '../layout/MetaData'

function Favorite() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    const { error,list,loading } = useSelector(state => state.list)
    const [t, i18n] = useTranslation('common');
    const rt1 = ( i18n.language === 'pk' ? 'text-right' : 'text-center' )
    const { error: favoriteError, is_Delete} = useSelector(state => state.favorite)  
    useEffect(() => {
        
        if(error){
            alert.error(t(error));
            dispatch(clearErrors());
        }
        if(is_Delete){
            alert.success(t('favorite.remove_favorite')) 
            dispatch(loadUser())
            dispatch({ type: DELETE_FAVORITE_RESET })
          }
        if(favoriteError){
            alert.error(favoriteError);
            dispatch(clearErrors())
          }

        dispatch(getFavorite())

    }, [dispatch,alert,error,user,is_Delete,favoriteError,t])

    const favoriteDeleteHandler = (id) => {
       const formData = new FormData();
       formData.set('productId', id);
       dispatch(deletefavorite(formData));
     }
    return (
      <React.Fragment>
      {loading ? <Loader /> : ( 
        <React.Fragment>
        {list.favorite && list.favorite.length === 0 ? <h2 className={`mtb_20 ${rt1}`}>{t('favorite.empty_favorite')}</h2> : (
            <React.Fragment>
<div className="container">
<MetaData title={'Favorite'} />
<div className="row ">
<div id="column-left" className="col-sm-4 col-md-4 col-lg-3 hidden-xs">
  <div className="left_banner left-sidebar-widget mb_50 mt_30"> <a href="!#"><img src="../images/left1.jpg" alt="Left Banner" className="img-responsive" /></a> </div>
</div>
<div className="col-sm-8 col-md-8 col-lg-9 mtb_30">
  {/* =====  BANNER STRAT  ===== */}
  <div className="breadcrumb ptb_20">
    <h1>{t('favorite.favorite')}</h1>
    <ul>
      <li><a href="index-2.html">{t('favorite.home')}</a></li>
      <li className="active">{t('favorite.favorite')}</li>
    </ul>
  </div>
  {/* =====  BREADCRUMB END===== */}
  <form encType="multipart/form-data" method="post" action="#">
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <td className={`${rt1}`}>{t('favorite.image')}</td>
            <td className={`${rt1}`}>{t('favorite.name')}</td>
            <td className={`${rt1}`}>{t('favorite.price')}</td>
            <td className={`${rt1}`}>{t('favorite.delete')}</td>
          </tr>
        </thead>
        <tbody>

          {list.favorite && list.favorite.map(item => (
                <React.Fragment>
                                  <tr key={item._id}>
                <td className={`${rt1}`}><Link to={`/product/${item._id}`}><img height={'70px'} width={'70px'} src={item.attribute && item.attribute[0].images[0].url} alt={item.name} title={item.name}/></Link></td>
            <td className={`${rt1}`}><Link to={`/product/${item._id}`}>{item.name}</Link></td>
            <td className={`${rt1}`}>${item.attribute && item.attribute[0].price}</td>
            <td className={`${rt1}`}><span className="btn btn-danger" onClick={()=> favoriteDeleteHandler(item._id)}><i className="fa fa-trash " ></i></span></td>
            </tr>
                </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  </form>
</div>
</div>
</div>
            </React.Fragment>
        )}
    </React.Fragment>
      )}
      </React.Fragment>
    )
}

export default Favorite
