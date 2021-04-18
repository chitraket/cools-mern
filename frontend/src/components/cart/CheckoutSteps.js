import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({shipping,confirmOrder,payment}) => {
    return (
        <div className="checkout-progress d-flex justify-content-center mt-5">
            {/* {shipping ? <Link to='shipping' className="float-right">
            </Link>} */}
        </div>
    )
}

export default CheckoutSteps
