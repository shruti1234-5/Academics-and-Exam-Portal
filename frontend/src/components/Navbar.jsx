import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

const  Navbar = () =>  {
    const navigate = useNavigate();
    const handleNav = (sectionId) => (e) => {
        e.preventDefault();
        navigate('/', { state: { scrollTo: sectionId } });
    };
    return (
        <div>
            <div className="row mt-0 pt-0">
                <div className="col-sm-12">
                <nav className="navbar navbar-expand-lg sticky-navbar">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav text-center ms-auto me-auto">
                                <li className="nav-item mx-3">
                                    <Link className="nav-link text-white nav-hover" to='/'>Home</Link>
                                </li>                              
                                <li className="nav-item mx-3">
                                    <a className="nav-link text-white nav-hover" href="#about" onClick={handleNav('about')}>About Us</a>
                                </li>  
                                <li className="nav-item mx-3">
                                    <a className="nav-link text-white nav-hover" href="#whyus" onClick={handleNav('whyus')}>Why Us</a>
                                </li>
                                <li className="nav-item mx-3">
                                    <a className="nav-link text-white nav-hover" href="#academics" onClick={handleNav('academics')}>Academics</a>
                                </li>
                                <li className="nav-item mx-3">
                                    <Link className="nav-link text-white nav-hover" to="/student/login">  Student Page</Link>
                                </li>
                                <li className="nav-item mx-3">
                                    <Link className="nav-link text-white nav-hover" to="/admin/login">  Admin Page</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
