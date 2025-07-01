import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminLayout from '../components/AdminLayout';
import { FaEdit, FaTrash, FaPlus, FaEye, FaToggleOn, FaToggleOff, FaClipboardList } from 'react-icons/fa';

function ExamManagement() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all exams
  const fetchExams = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/exam/');
      if (response.data.msg === 'Success') {
        setExams(response.data.value);
      } else {
        toast.error(response.data.msg || "Failed to fetch exams");
      }
    } catch (error) {
      toast.error('Error fetching exams');
      console.error('Error fetching exams:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Toggle exam status
  const toggleStatus = async (examId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Deactive' : 'Active';
      const response = await axios.patch(`http://localhost:5000/api/admin/exam/${examId}/status`, { status: newStatus });
      if (response.data.msg === 'Success') {
        toast.success(`Exam status changed to ${newStatus}`);
        setExams(exams.map(exam => 
          exam._id === examId 
            ? { ...exam, status: newStatus }
            : exam
        ));
      } else {
        toast.error(response.data.msg || "Failed to update status");
      }
    } catch (error) {
      toast.error('Error updating status');
      console.error('Error updating status:', error);
    }
  };

  // Delete exam
  const deleteExam = async (examId) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      try {
        const res = await axios.delete(`http://localhost:5000/api/admin/exam/${examId}`);
        if(res.data.msg === 'Success') {
            toast.success('Exam deleted successfully');
            setExams(exams.filter(exam => exam._id !== examId));
        } else {
            toast.error(res.data.msg || "Failed to delete exam");
        }
      } catch (error) {
        toast.error('Error deleting exam');
        console.error('Error deleting exam:', error);
      }
    }
  };

  // Edit exam (navigate to add exam page with exam data)
  const editExam = (exam) => {
    // Store exam data in localStorage for editing
    localStorage.setItem('editExam', JSON.stringify(exam));
    navigate('/admin/addexam');
  };

  // View results
  const viewResults = (exam) => {
    navigate(`/admin/exam/${exam._id}/results`);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-center text-primary-nou">Exam Management</h3>
          <button
            className="btn-primary text-white"
            onClick={() => {
              localStorage.removeItem('editExam');
              navigate('/admin/addexam');
            }}
          >
            <FaPlus className="me-2" /> Add New Exam
          </button>
        </div>

        {exams.length === 0 ? (
          <div className="text-center py-5 card-custom">
            <div className="card-body-custom">
                <FaClipboardList size={50} className="text-muted mb-3" />
                <h4 className="text-muted">No exams found</h4>
                <p className="text-muted mb-4">Get started by creating your first exam.</p>
                <button className="btn-primary text-white " onClick={() => navigate('/admin/addexam')}>
                    <FaPlus className="me-2" /> Create First Exam
                </button>
            </div>
          </div>
        ) : (
          <div className="row">
            {exams.map((exam) => (
              <div key={exam._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card-custom h-100">
                  <div className="card-header-custom d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 text-truncate" style={{ maxWidth: '200px' }}>{exam.name}</h5>
                    <span className={`badge ${exam.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                      {exam.status}
                    </span>
                  </div>
                  <div className="card-body-custom d-flex flex-column">
                    <p className="text-muted small flex-grow-1" style={{ minHeight: '40px' }}>
                      {exam.desc || 'No description provided.'}
                    </p>
                    <div className="d-flex justify-content-around text-center my-3">
                      <div>
                        <div className="fw-bold">{exam.duration}</div>
                        <small className="text-muted">Mins</small>
                      </div>
                      <div>
                        <div className="fw-bold">{exam.questions?.length || 0}</div>
                        <small className="text-muted">Qns</small>
                      </div>
                      <div>
                        <div className="fw-bold">{new Date(exam.createdAt).toLocaleDateString()}</div>
                        <small className="text-muted">Created</small>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer-custom">
                    <div className="d-flex justify-content-between">
                      <button className="btn-icon" title="Edit" onClick={() => editExam(exam)}><FaEdit /></button>
                      <button className="btn-icon" title="View Results" onClick={() => viewResults(exam)}><FaEye /></button>
                      <button className="btn-icon" title="Toggle Status" onClick={() => toggleStatus(exam._id, exam.status)}>
                        {exam.status === 'Active' ? <FaToggleOff /> : <FaToggleOn />}
                      </button>
                      <button className="btn-danger-icon" title="Delete" onClick={() => deleteExam(exam._id)}><FaTrash /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default ExamManagement;

