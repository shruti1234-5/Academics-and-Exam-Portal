import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentLayout from '../components/StudentLayout';
import { FaPlay, FaEye, FaClipboardList } from 'react-icons/fa';

function StudentExam() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [examResults, setExamResults] = useState({});
  const [loading, setLoading] = useState(true);
  const studentId = localStorage.getItem('student');

  useEffect(() => {
    const fetchData = async () => {
      if (!studentId) {
        setLoading(false);
        return;
      }
      try {
        const [examResponse, resultResponse] = await Promise.all([
            axios.get('http://localhost:5000/api/admin/exam/'),
            axios.get(`http://localhost:5000/api/student/examresult/student/${studentId}`)
        ]);

        if (examResponse.data.msg === 'Success') {
            const activeExams = examResponse.data.value.filter(exam => exam.status === 'Active');
            setExams(activeExams);
        }

        if (resultResponse.data.msg === 'Success') {
            const resultsMap = resultResponse.data.results.reduce((acc, result) => {
                acc[result.examId] = result;
                return acc;
            }, {});
            setExamResults(resultsMap);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [studentId]);

  const startExam = (exam) => {
    if (examResults[exam._id]) {
      alert('You have already taken this exam!');
      return;
    }
    localStorage.setItem('currentExam', JSON.stringify(exam));
    navigate('/student/startexam');
  };

  const viewResult = (exam) => {
    const result = examResults[exam._id];
    if (result) {
      localStorage.setItem('examResult', JSON.stringify(result));
      navigate('/student/examresult');
    }
  };

  const getGradeColor = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'text-success';
    if (grade === 'B+' || grade === 'B') return 'text-info';
    if (grade === 'C+' || grade === 'C') return 'text-warning';
    return 'text-danger';
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="container-fluid">
        <h3 className="text-center mb-4 text-primary-nou">Available Exams</h3>
        
        {exams.length === 0 ? (
          <div className="text-center py-5 card-custom">
            <div className="card-body-custom">
                <FaClipboardList size={50} className="text-muted mb-3" />
                <h4 className="text-muted">No Active Exams</h4>
                <p className="text-muted">There are currently no active exams available.</p>
            </div>
          </div>
        ) : (
          <div className="row">
            {exams.map((exam) => {
              const hasTaken = examResults[exam._id];
              const result = hasTaken ? examResults[exam._id] : null;
              
              return (
                <div key={exam._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="card-custom h-100">
                    <div className={`card-header-custom ${hasTaken ? 'bg-secondary-soft' : ''}`}>
                      <h5 className="mb-0 text-truncate">{exam.name}</h5>
                    </div>
                    <div className="card-body-custom d-flex flex-column">
                      <p className="text-muted small flex-grow-1">{exam.desc || 'No description provided.'}</p>
                      <div className="d-flex justify-content-around text-center my-3">
                        <div>
                          <div className="fw-bold">{exam.duration}</div>
                          <small className="text-muted">Mins</small>
                        </div>
                        <div>
                          <div className="fw-bold">{exam.questions?.length || 0}</div>
                          <small className="text-muted">Qns</small>
                        </div>
                      </div>
                      
                      {hasTaken && result && (
                        <div className="text-center bg-light p-2 rounded">
                           <small className="text-muted">Result</small>
                           <div className="d-flex justify-content-around">
                                <div>
                                    <div className="fw-bold">{result.score}/{result.totalQuestions}</div>
                                    <small className="text-muted">Score</small>
                                </div>
                                <div className={getGradeColor(result.grade)}>
                                    <div className="fw-bold">{result.percentage}%</div>
                                    <small>Grade: {result.grade}</small>
                                </div>
                           </div>
                        </div>
                      )}
                    </div>
                    <div className="card-footer-custom">
                      {hasTaken ? (
                        <button className="btn-primary w-50 text-white rounded-3" onClick={() => viewResult(exam)}>
                          <FaEye className="me-2" /> View Result
                        </button>
                      ) : (
                        <button className="btn btn-success w-50 rounded-3 text-white" onClick={() => startExam(exam)}>
                          <FaPlay className="me-2" /> Start Exam
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </StudentLayout>
  );
}

export default StudentExam;

