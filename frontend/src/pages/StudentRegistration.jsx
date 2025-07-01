import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const StudentRegistration = () => {
  const navigate = useNavigate();

  const [year, setYear] = useState(null);
  const [branch, setBranch] = useState(null);
  const [program, setProgram] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    gender: '',
    dob: '',
    fname: '',
    mname: '',
    branch: '',
    year: '',
    program: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePaymentAndRegister = async (e) => {
    e.preventDefault();
    // Validate form fields
    for (const key in formData) {
      if (!formData[key]) {
        toast.error('Please fill all fields');
        return;
      }
    }
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error('Razorpay SDK failed to load.');
      return;
    }
    let keyId;
    try {
      const keyRes = await axios.get('http://localhost:5000/api/payment/key');
      keyId = keyRes.data.key;
    } catch (err) {
      toast.error('Failed to fetch payment key');
      return;
    }
    try {
      // 1. Create order on backend
      const orderRes = await axios.post('http://localhost:5000/api/payment/create-order', {
        amount: 1000,
        currency: 'INR',
        receipt: 'student_reg_' + Date.now()
      });
      const order = orderRes.data;
      // 2. Open Razorpay checkout
      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Student Registration',
        description: 'Registration Fees',
        order_id: order.id,
        handler: async function (response) {
          // 3. On payment success, submit registration
          const paymentData = {
            ...formData,
            paymentStatus: 'success',
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            paymentAmount: order.amount / 100,
            paymentDate: new Date(),
          };
          try {
            const regRes = await axios.post('http://localhost:5000/api/student/register', paymentData);
            if (regRes.data.msg === 'Success') {
              toast.success('Student Registered Successfully');
              setFormData({
                name: '', email: '', password: '', contact: '', gender: '', dob: '', fname: '', mname: '', branch: '', year: '', program: ''
              });
              navigate('/student/login');
            } else {
              toast.error('Registration Failed: ' + regRes.data.msg);
            }
          } catch (err) {
            toast.error('Registration failed after payment. Contact support.');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.contact
        },
        theme: { color: '#8C1E2D' }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error('Payment initiation failed.');
    }
  };

  const fetchData = async () => {
    const res1 = await axios.get('http://localhost:5000/api/admin/branch');
    const res2 = await axios.get('http://localhost:5000/api/admin/year');
    const res3 = await axios.get('http://localhost:5000/api/admin/program');
    setBranch(res1.data.value);
    setYear(res2.data.value);
    setProgram(res3.data.value);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="d-flex flex-column min-vh-100 bg-accent-nou">
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center py-5 flex-grow-1">
        <div className="card shadow p-4 bg-hero-gradient" style={{ maxWidth: '500px', width: '100%' }}>
          <h3 className="text-center mb-4 text-accent-nou">Student Registration</h3>
          <form onSubmit={handlePaymentAndRegister} >
            {/* Name + Contact */}
            <div className="row mb-3">
              <div className="col">
                <input type="text" name="name" placeholder="Full Name" className="form-control" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="col">
                <input type="tel" name="contact" placeholder="Contact Number" className="form-control" value={formData.contact} onChange={handleChange} required />
              </div>
            </div>
            {/* Email + Password */}
            <div className="row mb-3">
              <div className="col">
                <input type="email" name="email" placeholder="Email Address" className="form-control" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="col">
                <input type="password" name="password" placeholder="Password" className="form-control" value={formData.password} onChange={handleChange} required />
              </div>
            </div>
            {/* Gender + DOB */}
            <div className="row mb-3">
              <div className="col">
                <select name="gender" className="form-control" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col">
                <input type="date" name="dob" className="form-control" value={formData.dob} onChange={handleChange} required />
              </div>
            </div>
            {/* Father's Name + Mother's Name */}
            <div className="row mb-3">
              <div className="col">
                <input type="text" name="fname" placeholder="Father's Name" className="form-control" value={formData.fname} onChange={handleChange} required />
              </div>
              <div className="col">
                <input type="text" name="mname" placeholder="Mother's Name" className="form-control" value={formData.mname} onChange={handleChange} required />
              </div>
            </div>
            {/* Branch + Year */}
            <div className="row mb-3">
              <div className="col">
                <select name="branch" className="form-control" value={formData.branch} onChange={handleChange} required>
                  <option value="">Select Branch</option>
                  {branch?.map((x) => (
                    <option key={x._id} value={x.branch}>{x.branch}</option>
                  ))}
                </select>
              </div>
              <div className="col">
                <select name="year" className="form-control" value={formData.year} onChange={handleChange} required>
                  <option value="">Select Year</option>
                  {year?.map((x) => (
                    <option key={x._id} value={x.year}>{x.year}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Program */}
            <div className="mb-3">
              <select name="program" className="form-control" value={formData.program} onChange={handleChange} required>
                <option value="">Select Program</option>
                {program?.map((x) => (
                  <option key={x._id} value={x.program}>{x.program}</option>
                ))}
              </select>
            </div>
            <div>
              <button type="submit" className="hero-btn w-100">Pay Fees</button>
            </div>
            <p className="text-center pt-2 mb-0 pb-0 text-accent-nou">Already have an account? <Link to="/student/login" className="text-secondary-nou"><b className='text-primary-nou'>Login</b></Link></p>
          </form>
        </div>
      </div>
      <div className="text-center mt-auto bg-secondary-nou text-accent-nou py-3">
        <p className="mb-0">&copy; Copyright 2023. All rights reserved.</p>
      </div>
    </div>
  );
};

export default StudentRegistration;
