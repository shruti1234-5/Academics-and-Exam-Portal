import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminLayout from '../components/AdminLayout';
import { FaTrash } from 'react-icons/fa';

const AdminViewFeed = () => {
  const [feedback, setFeedback] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const [complain, setComplain] = useState([]);

  const fetchAll = async () => {
    try {
      const [f1, f2, f3] = await Promise.all([
        axios.get('http://localhost:5000/api/feed/feedback'),
        axios.get('http://localhost:5000/api/feed/suggestion'),
        axios.get('http://localhost:5000/api/feed/complain')
      ]);

      if (f1.data.msg === 'Success') setFeedback(f1.data.value);
      if (f2.data.msg === 'Success') setSuggestion(f2.data.value);
      if (f3.data.msg === 'Success') setComplain(f3.data.value);
    } catch (error) {
      toast.error("Failed to fetch feedback data.");
      console.log(error);
    }
  };

  const deleteFeedback = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this item?")) {
        const res = await axios.delete(`http://localhost:5000/api/feed/${id}`);
        if (res.data.msg === 'Success') {
          toast.success("Item deleted successfully.");
          fetchAll();
        } else {
          toast.error(res.data.msg || "Failed to delete item.");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Couldn't delete item.");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const renderTable = (data, title) => (
    <div className="card-custom">
      <h5 className="card-header-custom">{title}</h5>
      <div className="card-body-custom">
        <div className="table-responsive">
          <table className="table-custom">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Student ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, i) => (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  <td>{item.subject}</td>
                  <td>{item.message}</td>
                  <td>{item.studentId}</td>
                  <td>
                    <button className="btn-danger-icon" onClick={() => deleteFeedback(item._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr><td colSpan="5" className="text-center">No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="container-fluid">
        <h3 className="text-center my-4 text-primary-nou">Student Feedback Management</h3>
        <div className="row">
          <div className="col-12 mb-4 text-secondary-nou">
            {renderTable(feedback, "Feedbacks")}
          </div>
          <div className="col-12 mb-4">
            {renderTable(suggestion, "Suggestions")}
          </div>
          <div className="col-12 mb-4">
            {renderTable(complain, "Complains")}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminViewFeed;
