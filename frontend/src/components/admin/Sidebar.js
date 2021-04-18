import React from 'react'
import { Link } from 'react-router-dom'
import './admin.css'

function Sidebar() {
    return (
            <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </li>

                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-product-hunt"></i> Products</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <Link to="/admin/products"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/admin/product"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="#categorySubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-product-hunt"></i> Category</a>
                        <ul className="collapse list-unstyled" id="categorySubmenu">
                            <li>
                                <Link to="/admin/categorys"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/admin/category"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#brandSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-product-hunt"></i> Brand</a>
                        <ul className="collapse list-unstyled" id="brandSubmenu">
                            <li>
                                <Link to="/admin/brands"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/admin/brand"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#sliderSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-product-hunt"></i>Slider</a>
                        <ul className="collapse list-unstyled" id="sliderSubmenu">
                            <li>
                                <Link to="/admin/sliders"><i className="fa fa-clipboard"></i>All</Link>
                            </li>

                            <li>
                                <Link to="/admin/slider"><i className="fa fa-plus"></i>Create</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li>

                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
