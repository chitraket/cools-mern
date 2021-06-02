import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './admin.css'

function Sidebar() {
    const { user } = useSelector(state => state.auth)
    const per = [];
    user && user.permission && user.permission.map((p, i) => {
        return per.push(p);
    })
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </li>
                    {per.includes("1") || per.includes("2") || per.includes("3") ?
                        <li>
                            <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                                className="fa fa-product-hunt"></i> Products</a>
                            <ul className="collapse list-unstyled" id="productSubmenu">
                                {per.includes("2") || per.includes("3") ?
                                    <li>
                                        <Link to="/admin/products"><i className="fa fa-clipboard"></i> All</Link>
                                    </li> : ''}
                                {per.includes("1") ?
                                    <li>
                                        <Link to="/admin/product"><i className="fa fa-plus"></i> Create</Link>
                                    </li>
                                    : ''}
                            </ul>
                        </li>
                        : ''}
                    {per.includes("4") || per.includes("5") || per.includes("6") ?
                        <li>
                            <a href="#categorySubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                                className="fa fa-product-hunt"></i> Shape</a>
                            <ul className="collapse list-unstyled" id="categorySubmenu">
                                {per.includes("5") || per.includes("6") ?
                                    <li>
                                        <Link to="/admin/categorys"><i className="fa fa-clipboard"></i> All</Link>
                                    </li>
                                    : ''}
                                {per.includes("4") ?
                                    <li>
                                        <Link to="/admin/category"><i className="fa fa-plus"></i> Create</Link>
                                    </li>
                                    : ''}
                            </ul>
                        </li>
                        : ''}
                    {per.includes("7") || per.includes("8") || per.includes("9") ?
                        <li>
                            <a href="#brandSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                                className="fa fa-product-hunt"></i> Brand</a>
                            <ul className="collapse list-unstyled" id="brandSubmenu">
                                {per.includes("8") || per.includes("9") ?
                                    <li>
                                        <Link to="/admin/brands"><i className="fa fa-clipboard"></i> All</Link>
                                    </li>
                                    : ''}
                                {per.includes("7") ?
                                    <li>
                                        <Link to="/admin/brand"><i className="fa fa-plus"></i> Create</Link>
                                    </li>
                                    : ''}
                            </ul>
                        </li> : ''}
                    {per.includes("10") || per.includes("11") || per.includes("12") ?
                        <li>
                            <a href="#sliderSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                                className="fa fa-product-hunt"></i>Slider</a>
                            <ul className="collapse list-unstyled" id="sliderSubmenu">
                                {per.includes("11") || per.includes("12") ?
                                    <li>
                                        <Link to="/admin/sliders"><i className="fa fa-clipboard"></i>All</Link>
                                    </li>
                                    : ''}
                                {per.includes("10") ?
                                    <li>
                                        <Link to="/admin/slider"><i className="fa fa-plus"></i>Create</Link>
                                    </li>
                                    : ''}
                            </ul>
                        </li>
                        : ''}
                    {per.includes("21") || per.includes("22") || per.includes("23") ?
                        <li>
                            <a href="#colorSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                                className="fa fa-product-hunt"></i> Color</a>
                            <ul className="collapse list-unstyled" id="colorSubmenu">
                                {per.includes("22") || per.includes("23") ?
                                    <li>
                                        <Link to="/admin/colors"><i className="fa fa-clipboard"></i> All</Link>
                                    </li>
                                    : ''}
                                {per.includes("21") ?
                                    <li>
                                        <Link to="/admin/color"><i className="fa fa-plus"></i> Create</Link>
                                    </li>
                                    : ''}
                            </ul>
                        </li> : ''}
                    {per.includes("13") || per.includes("14") || per.includes("15") || per.includes("16") ?
                        <li>
                            <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                        </li>
                        : ''}
                    {per.includes("17") ?
                        <li>
                            <Link to="/admin/orders/date"><i className="fa fa-shopping-basket"></i>Payment</Link>
                        </li>
                        : ''}
                    {per.includes("18") || per.includes("20") ?
                        <li>
                            <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                        </li>
                        : ''}
                    {per.includes("50") || per.includes("51") || per.includes("52") ?
                        <li>
                            <a href="#adminSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                                className="fa fa-product-hunt"></i> Admin</a>
                            <ul className="collapse list-unstyled" id="adminSubmenu">
                                {per.includes("51") || per.includes("52") ?
                                    <li>
                                        <Link to="/admin/admins"><i className="fa fa-users"></i> All</Link>
                                    </li>
                                    : ''}
                                {per.includes("50") ?
                                    <li>
                                        <Link to="/admin/admins/add"><i className="fa fa-users"></i> Create</Link>
                                    </li>
                                    : ''}
                            </ul>
                        </li>
                        : ''}
                    {per.includes("20") ?
                        <li>
                            <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                        </li>
                        : ''}
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
