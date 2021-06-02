import React from 'react'
import { Link } from 'react-router-dom'

import './product.css'

const Product = ({ product, col, item, addtocart, user, isAuthenticated, favoriteHandler, favoriteDeleteHandler }) => {

    return (
        <div className={`item ${item}`}>
            <div className={`product-thumb ${col}`}>
                <div className="image product-imageblock">
                    <Link to={`/product/${product._id}`}>
                        <img data-name="product_image" src={product.attribute && product.attribute[0].images[0].url} alt={product.name} title={product.name} className="img-responsive" />
                        {
                            Object.keys(product.attribute && product.attribute[0].images).length > 1 ? <img src={product.attribute && product.attribute[0].images[1].url} alt={product.name} title={product.name} className="img-responsive" /> : <img src={product.attribute && product.attribute[0].images[0].url} alt={product.name} title={product.name} className="img-responsive" />
                        }
                    </Link> </div>
                <div className="caption product-detail text-left">
                    <h6 data-name="product_name" className="product-name mt_20"><Link to={`/product/${product._id}`} title={product.name}>{product.name}</Link></h6>
                    <div className="rating">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%`, left: '-20px' }}></div>
                        </div>
                    </div>
                    <span className="price"><span className="amount"><span className="currencySymbol">$</span>{product.attribute && product.attribute[0].price}</span>
                    </span>
                    <div className="button-group text-center">
                        {
                            !isAuthenticated ? '' :
                                user && user.role === 'user' ?
                                    user.favorite && user.favorite.includes(product._id) ? <div className="wishlist" onClick={favoriteDeleteHandler}><span>wishlist</span></div> : <div className="wishlist" onClick={favoriteHandler}><span>wishlist</span></div>
                                    : ''
                        }
                        <Link to={`/product/${product._id}`}> <div className="quickview"><span>Quick View</span></div></Link>
                        {product.attribute && product.attribute[0].qty === 0 ? <div className="add-to-cart"><span>Add to cart</span></div> : <div className="add-to-cart" onClick={addtocart}><span >Add to cart</span></div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
