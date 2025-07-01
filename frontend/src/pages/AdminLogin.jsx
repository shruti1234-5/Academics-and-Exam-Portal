import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    
    try{
        const admin = {email,password};
        const response = await axios.post('http://localhost:5000/api/admin/login',admin)
        if(response.data.msg === 'Success')
        {
            localStorage.clear();
            localStorage.setItem('admin', response.data.id)
            toast.success('Login Successful!');
            setEmail('');
            setPassword('');
           navigate('/admin/dashboard');
        } else {
            toast.error(response.data.msg || 'An unknown error occurred.');
        }
    }
    catch(error){
        if (error.response) {
            toast.error(error.response.data.msg || 'Invalid credentials or server error.');
        } else if (error.request) {
            toast.error('Network error. Please check your connection.');
        } else {
            toast.error('An unexpected error occurred.');
        }
        console.error('Login error:', error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-accent-nou">
      {/* <Header /> */}
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center py-5 flex-grow-1">
        <div className="card shadow p-4 bg-hero-gradient" style={{ maxWidth: '400px', width: '100%' }}>
          <h3 className="text-center mb-4 text-accent-nou">Admin Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label text-accent-nou">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="admin@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
  
            <div className="mb-4">
              <label className="form-label text-accent-nou">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
  
            <button type="submit" className="hero-btn w-100">
              Login
            </button>
          </form>
        </div>
      </div>
  
      {/* Footer at the bottom */}
      <div className="text-center mt-auto bg-secondary-nou text-accent-nou py-3">
        <p className="mb-0">&copy; Copyright 2023. All rights reserved.</p>
      </div>
    </div>
  );
  
};

export default AdminLogin;
