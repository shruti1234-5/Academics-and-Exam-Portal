import React from "react";
import {Link} from 'react-router-dom'
import logo from '../assets/logo.png'

const StudentSidenav = ({ isSidenavOpen, toggleSidenav, isSmallScreen }) => {
    const sidenavClass = `student-sidenav bg-hero-gradient ${isSidenavOpen ? 'sidenav-open' : 'sidenav-closed'} ${isSmallScreen ? 'sidenav-small' : ''}`;

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
                <li><Link className="nav-link text-accent-nou fs-4" to="/student/dashboard"><i className="fas fa-tachometer-alt me-2"></i> <span>Dashboard</span></Link></li>
                <li><Link className="nav-link text-accent-nou fs-4" to="/student/exam"><i className="fas fa-file-alt me-2"></i> <span>Exams</span></Link></li>
                <li><Link className="nav-link text-accent-nou fs-4" to="/student/news"><i className="fas fa-newspaper me-2"></i> <span>News</span></Link></li>
                <li><Link className="nav-link text-accent-nou fs-4" to="/student/study"><i className="fas fa-book-open me-2"></i> <span>Study Material</span></Link></li>
                <li><Link className="nav-link text-accent-nou fs-4" to="/student/feedback"><i className="fas fa-comments me-2"></i> <span>Add Feedback</span></Link></li>
                <li><Link className="nav-link text-accent-nou fs-4" to="/student/viewfeedback"><i className="fas fa-eye me-2"></i> <span>View Feedback</span></Link></li>
            </ul>
    
        </div>
    )
}

export default StudentSidenav;