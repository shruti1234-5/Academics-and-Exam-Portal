import React from "react";
import {Link} from 'react-router-dom'
import logo from '../assets/logo.png'

const AdminSidenav = ({ isSidenavOpen, toggleSidenav, isSmallScreen }) => {
    const sidenavClass = `admin-sidenav bg-hero-gradient ${isSidenavOpen ? 'sidenav-open' : 'sidenav-closed'} ${isSmallScreen ? 'sidenav-small' : ''}`;

    return (
        <div className={sidenavClass}>
            <ul className="pt-2 list-unstyled">
                <li className="sidenav-toggle">
                    <button className="btn btn-link text-accent-nou" onClick={toggleSidenav}>
                        <i className="fas fa-bars"></i>
                    </button>
                </li>
                {/* {(!isSmallScreen || isSidenavOpen) && (
                    <img
                        src={logo}
                        alt="logo"
                        className="bg-light rounded-3 shadow-lg mx-auto d-block p-1"
                        style={{
                            width: '180px',
                            transition: 'width 0.3s ease',
                            marginBottom: '20px'
                        }}
                    />
                )} */}
                <li><Link className="nav-link text-accent-nou fs-4" to="/admin/dashboard"><i className="fas fa-tachometer-alt me-2"></i> <span >Dashboard</span></Link></li>
                <li><Link className="nav-link text-accent-nou fs-4" to="/admin/student"><i className="fas fa-user-graduate me-2"></i> <span>Student</span></Link></li>
                <li><Link className="nav-link text-accent-nou fs-4" to="/admin/year"><i className="fas fa-calendar-alt me-2"></i> <span >Year</span></Link></li>
                <li><Link className="nav-link text-accent-nou fs-4" to="/admin/branch"><i className="fas fa-code-branch me-2"></i> <span>Branch</span></Link></li>
                <li><Link className="nav-link text-accent-nou fs-4" to="/admin/program"><i className="fas fa-graduation-cap me-2"></i> <span>Program</span></Link></li>
                <li><Link className="nav-link text-accent-nou fs-4" to="/admin/news"><i className="fas fa-newspaper me-2"></i> <span>News</span></Link></li>
                <li><Link className="nav-link text-accent-nou fs-4" to="/admin/study"><i className="fas fa-book-open me-2"></i> <span>Study Material</span></Link></li>
                <li><Link className="nav-link text-accent-nou fs-4" to="/admin/feed"><i className="fas fa-comments me-2"></i> <span>Feedbacks</span></Link></li>
                <li><Link className="nav-link text-accent-nou fs-4" to="/admin/exam"><i className="fas fa-file-signature me-2"></i> <span>Exam Management</span></Link></li>
            </ul>
        </div>
    )
}

export default AdminSidenav;