import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Slider from './Slider'
import Footer from './Footer'
import slider2 from '../assets/mba.jpg'
import slider3 from '../assets/mca.jpg'
import about from '../assets/about.jpg'
import logo from '../assets/logo.png';
import useScrollReveal from '../hooks/useScrollReveal';
import { useLocation, useNavigate } from 'react-router-dom';

const Homepage = () => {
  useScrollReveal();
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100); // wait for render
      }
      navigate('.', { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <>
      {/* <Header />     */}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay  mt-0 pt-0"></div>
        <div className="container hero-content">
          <img src={logo} alt="Logo" className="hero-logo mb-3" />
          <h1 className="hero-title mb-3">Welcome to Academic & Exam Portal</h1>
          <p className="hero-subtitle mb-4">Empowering Digital Education. Explore, Learn, and Succeed with us!</p>
          <button className="hero-btn" onClick={() => navigate('/student/register')}>Get Started</button>
        </div>
      </section>
      <Navbar />
      <Slider />

      <div id="about" className="row mx-auto align-items-center my-5 section-bg animated-section" style={{ maxWidth: '90%', borderRadius: '1.5rem', boxShadow: '0 4px 32px rgba(140,30,45,0.07)' }}>
        <div className="col-md-6 text-center">
          <img src={about} className="img-fluid rounded section-img img-hover-fancy" alt="About" />
        </div>
        <div className="col-md-6">
          <h4 className="text-primary-nou">About us</h4>
          <h2 className="fw-bold">Give Wings To Your Dreams</h2>
          <p className="mt-3">
            The institute is a one-stop digital solution designed to streamline the academic processes of 
            educational institutions. Our platform simplifies student registration, course management, exam scheduling, 
            results, and more — all in one integrated system.Our vision is to revolutionize academic administration through technology, enabling institutions to
             focus more on education and less on paperwork.Our mission is
to provide a scalable, user-friendly, and secure platform that transforms how educational institutions manage academic and examination processes.
          </p>
        </div>
      </div>

      <div className="section-divider"></div>

      <div id="whyus" className="py-5 text-center text-white animated-section bg-primary-nou">
        <div className="container">
          <h2 className="mb-5 pb-2">Why Us?</h2>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-3">
              <div className="card p-3 border-0 shadow text-center card-hover img-hover-fancy" data-index="0" style={{ borderRadius: '1rem', background: '#fff', color: '#8C1E2D' }}>
                <i className="fas fa-comments-dollar fa-3x mb-3" style={{ color: '#8C1E2D' }}></i>
                <h5 className="fw-bold">Flipped Classes</h5>
                <p className="text-muted">To focus on an individual rather than on an entire classroom – An Interactive Method</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
              <div className="card p-3 border-0 shadow text-center card-hover img-hover-fancy" data-index="1" style={{ borderRadius: '1rem', background: '#fff', color: '#8C1E2D' }}>
                <i className="fas fa-drafting-compass fa-3x mb-3" style={{ color: '#8C1E2D' }}></i>
                <h5 className="fw-bold">Varied Activities</h5>
                <p className="text-muted">Empowering Growth and Development with education and co-curricular activities – The Immediate Need</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
              <div className="card p-3 border-0 shadow text-center card-hover img-hover-fancy" data-index="2" style={{ borderRadius: '1rem', background: '#fff', color: '#8C1E2D' }}>
                <i className="fas fa-user-tie fa-3x mb-3" style={{ color: '#8C1E2D' }}></i>
                <h5 className="fw-bold">Qualified Faculty</h5>
                <p className="text-muted">We have experts in the field of technology and management to take care of your career choices</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
              <div className="card p-3 border-0 shadow text-center card-hover img-hover-fancy" data-index="3" style={{ borderRadius: '1rem', background: '#fff', color: '#8C1E2D' }}>
                <i className="fas fa-university fa-3x mb-3" style={{ color: '#8C1E2D' }}></i>
                <h5 className="fw-bold">First-Rate Campus</h5>
                <p className="text-muted">Highly developed and marvelous campus and infrastructure fulfilling all the needs of its habitant</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider"></div>

      <div id="academics" className="py-5 text-center text-dark section-bg animated-section" style={{ borderRadius: '1.5rem', margin: '0 2vw' }}>
        <div className="container">
          <h2 className="mb-5">Build a Strong career with us</h2>
          <div className="row mt-3">
            <div className="col-md-6 text-center">
              <img src={slider2} className="img-fluid rounded h-75 section-img img-hover-fancy" alt="MBA" />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold mt-2 text-primary-nou">Master of Business Administration</h2>
              <h5 className="mt-2">The perfect start of your management journey</h5>
              <h2 className="fw-3 mt-3">Hot Jobs for MBA Graduates</h2>
              <ul className="text-start mt-3 custom-list">
                <li>Marketing Manager</li>
                <li>Finance Manager</li>
                <li>IT Manager</li>
                <li>Human Resource Manager</li>
                <li>Management consultant</li>
                <li>Business operations Manager</li>
              </ul>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <h2 className="fw-bold mt-2 text-primary-nou">Master of Computer Applications</h2>
              <h5 className="mt-2">Joining the technical force with correct requisites</h5>
              <h2 className="fw-3 mt-3">Hot Jobs for MCA Graduates</h2>
              <ul className="text-start mt-3 custom-list">
                <li>Software Developer</li>
                <li>Cloud Architect</li>
                <li>Business Analyst</li>
                <li>Data Scientist</li>
                <li>Web Developer</li>
                <li>Project Manager</li>
              </ul>
            </div>
            <div className="col-md-6 text-center">
              <img src={slider3} className="img-fluid rounded h-75 section-img img-hover-fancy" alt="MCA" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;