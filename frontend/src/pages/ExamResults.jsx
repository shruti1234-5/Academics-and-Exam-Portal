import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminLayout from '../components/AdminLayout';
import { FaArrowLeft, FaChartBar, FaUserGraduate, FaCheckCircle, FaTimesCircle, FaPercentage, FaTachometerAlt } from 'react-icons/fa';

function ExamResults() {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExamAndResults();
  }, [examId]);

  const fetchExamAndResults = async () => {
    setLoading(true);
    try {
      const examResponse = await axios.get(`http://localhost:5000/api/admin/exam/${examId}`);
      if (examResponse.data.msg === 'Success') {
        setExam(examResponse.data.exam);
      } else {
        toast.error(examResponse.data.msg || 'Failed to fetch exam details.');
      }

      const resultsResponse = await axios.get(`http://localhost:5000/api/admin/examresult/`);
      if (resultsResponse.data.msg === 'Success') {
        const examResults = resultsResponse.data.results.filter(result => (result.examId?._id || result.examId)?.toString() === examId);
        setResults(examResults);
      } else {
        toast.error(resultsResponse.data.msg || 'Failed to fetch exam results.');
      }
    } catch (error) {
      toast.error('An error occurred while fetching data.');
      console.error('Error fetching exam results:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'success';
    if (grade === 'B+' || grade === 'B') return 'info';
    if (grade === 'C+' || grade === 'C') return 'warning';
    return 'danger';
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const calculateStats = () => {
    if (results.length === 0) return null;

    const totalStudents = results.length;
    const avgScore = results.reduce((sum, result) => sum + result.score, 0) / totalStudents;
    const avgPercentage = results.reduce((sum, result) => sum + result.percentage, 0) / totalStudents;
    const passedStudents = results.filter(result => result.percentage >= (exam?.passingScore || 40)).length;
    const failedStudents = totalStudents - passedStudents;

    return {
      totalStudents,
      avgScore: avgScore.toFixed(1),
      avgPercentage: avgPercentage.toFixed(1),
      passedStudents,
      failedStudents,
      passRate: ((passedStudents / totalStudents) * 100).toFixed(1)
    };
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

  const stats = calculateStats();

  const statCards = stats ? [
    { title: 'Total Students', value: stats.totalStudents, icon: <FaUserGraduate />, color: 'primary' },
    { title: 'Avg Score', value: `${stats.avgScore}/${exam?.questions.length}`, icon: <FaTachometerAlt />, color: 'info' },
    { title: 'Avg Percentage', value: `${stats.avgPercentage}%`, icon: <FaPercentage />, color: 'purple' },
    { title: 'Passed', value: stats.passedStudents, icon: <FaCheckCircle />, color: 'success' },
    { title: 'Failed', value: stats.failedStudents, icon: <FaTimesCircle />, color: 'danger' },
    { title: 'Pass Rate', value: `${stats.passRate}%`, icon: <FaChartBar />, color: 'warning' },
  ] : [];

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-0 text-primary-nou">Exam Results</h3>
          <p className="mb-0 text-secondary-nou"><b>{exam?.name}</b></p>
        </div>
        <button className="btn btn-secondary d-flex align-items-center rounded-3" onClick={() => navigate('/admin/exam')}>
          <FaArrowLeft className="me-2" /> Back to Exams
        </button>
      </div>

      {stats && (
        <div className="row g-4 mb-4">
          {statCards.map(card => (
            <div className="col-lg-2 col-md-4 col-sm-6" key={card.title}>
                <div className={`card-custom dashboard-card bg-light border-start border-5 border-${card.color} h-100`}>
                    <div className="card-body-custom text-center">
                        <div className={`text-${card.color} mb-2`} style={{ fontSize: '2rem' }}>{card.icon}</div>
                        <h5 className="mb-1">{card.value}</h5>
                        <p className="text-muted small mb-0">{card.title}</p>
                    </div>
                </div>
            </div>
          ))}
        </div>
      )}

      <div className="card-custom">
        <div className="card-header-custom">
          <h5 className="mb-0">Student Results</h5>
        </div>
        <div className="card-body-custom">
          {results.length === 0 ? (
            <div className="text-center py-5">
              <FaChartBar size={50} className="text-muted mb-3" />
              <h5 className="text-muted">No students have taken this exam yet</h5>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table-custom">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Student ID</th>
                    <th>Score</th>
                    <th>Percentage</th>
                    <th>Grade</th>
                    <th>Time Taken</th>
                    <th>Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={result._id}>
                      <td>{index + 1}</td>
                      <td><span className="badge bg-secondary">{result.studentId}</span></td>
                      <td><strong>{result.score}/{result.totalQuestions}</strong></td>
                      <td>
                        <span className={`badge bg-${getGradeColor(result.grade)}`}>{result.percentage.toFixed(1)}%</span>
                      </td>
                      <td><span className={`badge bg-${getGradeColor(result.grade)}`}>{result.grade}</span></td>
                      <td>{formatTime(result.timeTaken)}</td>
                      <td>{new Date(result.submittedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default ExamResults; 