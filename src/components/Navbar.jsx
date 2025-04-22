import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    const logoutHandler = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const [navbar, setNavBar] = useState(false);

    return (
        <>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                {/* Brand/logo */}
                <Link className="navbar-brand ps-3" to="/">Store Admin</Link>

                {/* Sidebar toggle button (visible on all screens) */}
                <button onClick={() => setNavBar(!navbar)} className="lg:hidden btn   order-1  me-4 text-white hover:text-gray-800" id='moniletoglemenu'>
                    <i className="fas fa-bars"></i>
                </button>

                {/* Mobile menu toggle button (only visible on mobile) */}


                {/* Search form (optional) */}
                <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <div className="input-group"></div>
                </form>

                {/* User dropdown */}
                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-user fa-fw"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><button onClick={logoutHandler} className="dropdown-item">Logout</button></li>
                        </ul>
                    </li>
                </ul>
            </nav>

            {/* Mobile menu content - using Bootstrap's collapse mechanism */}
            <div
                style={{
                    backgroundColor: "black",
                    display: navbar ? "flex" : "none",
                    flexDirection: "column",
                }}
            >
                <Link className='navmenuitem' to={"/"}>Dashboard</Link>
                <Link className='navmenuitem' to={"/category"}>Add Category</Link>
                <Link className='navmenuitem' to={"/sub-category"}>Add Sub Category</Link>
                <Link className='navmenuitem' to={"/add-product"}>Add Product</Link>
                <Link className='navmenuitem' to={"/view-product"}>View Product</Link>
                <Link className='navmenuitem' to={"/order-details"}>View Order</Link>
                <Link className='navmenuitem' to={"/analytics"}>analytics</Link>
            </div>
        </>
    );
};

export default Navbar;