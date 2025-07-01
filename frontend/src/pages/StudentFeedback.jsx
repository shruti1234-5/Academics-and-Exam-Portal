import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import StudentLayout from '../components/StudentLayout';
import { FaPaperPlane } from 'react-icons/fa';

const StudentFeedback = () => {
  const [form, setForm] = useState({
    subject: '',
    type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const studentId = localStorage.getItem('student');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const feed = { studentId, ...form };

    try {
      const res = await axios.post('http://localhost:5000/api/feed/', feed);
      if (res.data.msg === 'Success') {
        toast.success('Feedback submitted successfully!');
        setForm({ subject: '', type: '', message: '' });
      } else {
        toast.error(`Error: ${res.data.msg}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || 'An error occurred while submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StudentLayout>
      <div className="container-fluid d-flex justify-content-center">
        <div className="card-custom" style={{ maxWidth: '600px', width: '100%' }}>
            <div className="card-header-custom">
                <h4 className="text-center text-primary-nou">Student Feedback Form</h4>
            </div>
            <div className="card-body-custom">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            className="form-control"
                            value={form.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Message Type</label>
                        <select
                            name="type"
                            className="form-select"
                            value={form.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Type...</option>
                            <option value="Feedback">Feedback</option>
                            <option value="Suggestion">Suggestion</option>
                            <option value="Complain">Complain</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea
                            name="message"
                            rows="5"
                            className="form-control"
                            value={form.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="hero-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : <>Submit <FaPaperPlane /></>}
                    </button>
                </form>
            </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentFeedback;
