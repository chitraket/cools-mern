import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import MetaData from '../layout/MetaData';

const OrderSuccess = () => {
    const [t, i18n] = useTranslation('common');
  const rt1 = ( i18n.language === 'pk' ? 'text-right' : 'text-center' )
    return (
        <React.Fragment>
            <MetaData title="Order Success"/>
             <div className="row justify-content-center">
                 <div className={`col-6 mt-5 ${rt1}`}>
                     <h2>{t('order_success.order_success_msg')}</h2>
                     <Link to={"/orders/me"}>Go to Orders</Link>
                 </div>
             </div>
        </React.Fragment>
    )
}

export default OrderSuccess
