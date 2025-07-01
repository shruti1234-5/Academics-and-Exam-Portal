import React from 'react';
import logo from '../assets/logo.png';
import {Link, useNavigate} from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="shadow-sm m-0 p-2 border-bottom" style={{background: "linear-gradient(120deg, #8C1E2D 0%, #00509E 100%)"}}>
      <div className="container d-flex flex-wrap justify-content-between align-items-center py-2">
        {/* Left: Logo & Title */}
        <div className="d-flex align-items-center">
          <img src={logo} alt="Logo" className="header-logo me-3" style={{ width: '170px', height: "100px", borderRadius: "70px" }} />
          <div>
            <h3 className="m-0 fw-bold" style={{color:"white", letterSpacing: '1px'}}>Academic & Exam Portal</h3>
            <small className="text-white">Empowering Digital Education</small>
          </div>
        </div>
        {/* Right: Registration & Info */}
        <div className="d-flex flex-column align-items-end pt-3">
          <button 
            className="hero-btn mb-2"
            onClick={() => navigate('/student/register')}
          >
            Student Registration
          </button>
          <div style={{ fontSize: '0.95rem', color: '#fff' }}>
            <i className="fa fa-envelope me-1 text-white"></i>support@inrollnow.com
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
