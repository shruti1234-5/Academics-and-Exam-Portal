import React, { useState, useEffect } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import StudentLayout from "../components/StudentLayout";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const ViewFeedback = () => {
  const [feed, setFeed] = useState([]);
  const [form, setForm] = useState({ subject: '', type: '', message: '' });
  const [editId, setEditId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const studentId = localStorage.getItem('student');

  const fetchFeeds = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/feed/${studentId}`);
      if (res.data.msg === 'Success') {
        setFeed(res.data.value);
      } else {
        toast.error(res.data.msg || "Failed to fetch feedback");
      }
    } catch (error) {
      toast.error("Failed to fetch feedback");
      console.error("Error fetching feedback:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if(studentId) fetchFeeds();
    else setLoading(false);
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/feed/${editId}`, { studentId, ...form });
      if (res.data.msg === "Success") {
        toast.success("Feedback updated successfully");
        closeForm();
        fetchFeeds();
      } else {
        toast.error(res.data.msg || "Failed to update feedback");
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Couldn't update feedback");
      console.error(err.message);
    }
  };

  const editFeed = (item) => {
    setForm({ subject: item.subject, type: item.type, message: item.message });
    setEditId(item._id);
    setShowForm(true);
  };

  const deleteFeed = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
        try {
            const res = await axios.delete(`http://localhost:5000/api/feed/${id}`);
            if (res.data.msg === 'Success') {
                toast.success("Feedback deleted successfully");
                fetchFeeds();
            } else {
                toast.error(res.data.msg || "Failed to delete feedback");
            }
        } catch(error) {
            toast.error(error.response?.data?.msg || "Couldn't delete feedback");
            console.error("Error deleting feedback:", error);
        }
    }
  };
  
  const closeForm = () => {
    setShowForm(false);
    setEditId('');
    setForm({ subject: '', type: '', message: '' });
  };

  if (loading) {
    return <StudentLayout><div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}><div className="spinner-border"></div></div></StudentLayout>;
  }

  return (
    <StudentLayout>
        <div className="card-custom">
            <h4 className="card-header-custom text-primary-nou">My Submitted Feedback</h4>
            <div className="card-body-custom">
                <div className="table-responsive">
                    <table className="table-custom">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th className="text-center">Type</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feed?.length > 0 ? feed.map((e, i) => (
                                <tr key={e._id}>
                                    <td>{i + 1}</td>
                                    <td>{e.subject}</td>
                                    <td><div className="scrollable-cell-content">{e.message}</div></td>
                                    <td className="text-center"><span className={`badge bg-${e.type === 'Complain' ? 'danger' : e.type === 'Suggestion' ? 'info' : 'secondary'}`}>{e.type}</span></td>
                                    <td className="text-center">
                                        <div className="flex item-center justify-center" style={{ minWidth: '100px' }}>
                                            <button className="w-6 h-6 text-gray-500 hover:text-gray-700" onClick={() => editFeed(e)}><FaEdit /></button>
                                            <button className="w-6 h-6 text-red-500 hover:text-red-700 ms-2" onClick={() => deleteFeed(e._id)}><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="5" className="text-center">No feedback submitted yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

      {/* Edit Modal */}
      {showForm && (
        <div className="modal-backdrop">
          <div className="modal-content-custom">
            <div className="card-custom">
                <div className="card-header-custom d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Edit Feedback</h4>
                    <button onClick={closeForm} className="btn-icon-close"><FaTimes /></button>
                </div>
                <div className="card-body-custom">
                    <form onSubmit={handleUpdate}>
                      <div className="mb-3">
                        <label className="form-label">Subject</label>
                        <input type="text" name="subject" className="form-control" value={form.subject} onChange={handleChange} required />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Message Type</label>
                        <select name="type" className="form-select" value={form.type} onChange={handleChange} required>
                          <option value="">Select Type</option>
                          <option value="Feedback">Feedback</option>
                          <option value="Suggestion">Suggestion</option>
                          <option value="Complain">Complain</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea name="message" rows="4" className="form-control" value={form.message} onChange={handleChange} required />
                      </div>
                      <button type="submit" className="btn-primary w-100">Update Feedback</button>
                    </form>
                </div>
            </div>
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default ViewFeedback;
