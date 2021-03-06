import React from 'react'
import { useTranslation } from "react-i18next";
import MetaData from './layout/MetaData';
function NotFound() {
    const [t, i18n] = useTranslation('common');
    const rt1 = ( i18n.language === 'pk' ? 'text-right' : 'text-center' )
    return (
        <React.Fragment>
        <MetaData title={'404 - Not Found'} />
         <React.Fragment> 
         <div className={`mt_20 ${rt1}`}>
         <img  src="images/4O4-Page.gif" style={{height:"400px"}} alt="404 Empty"/>
          <h2 className={`mb_40 `} style={{paddingRight:( i18n.language  === 'pk' ? '50px' : '')}}>{t('404_error.error')}</h2>
           </div>
         </React.Fragment>
         </React.Fragment>
    )
}

export default NotFound
