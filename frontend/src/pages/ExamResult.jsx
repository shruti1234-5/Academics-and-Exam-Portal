import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ExamResult() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Get result data from localStorage
    const resultData = localStorage.getItem('examResult');
    if (!resultData) {
      navigate('/student/exam');
      return;
    }
    setResult(JSON.parse(resultData));
  }, [navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', color: 'success' };
    if (percentage >= 80) return { grade: 'A', color: 'success' };
    if (percentage >= 70) return { grade: 'B+', color: 'info' };
    if (percentage >= 60) return { grade: 'B', color: 'info' };
    if (percentage >= 50) return { grade: 'C+', color: 'warning' };
    if (percentage >= 40) return { grade: 'C', color: 'warning' };
    return { grade: 'F', color: 'danger' };
  };

  if (!result) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const gradeInfo = getGrade(result.percentage);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0 text-primary-nou">📊 Exam Results</h3>
            </div>
            <div className="card-body p-5">
              <div className="text-center mb-5">
                <h4 className="text-primary">{result.examName}</h4>
                <p className="text-muted">Exam completed successfully!</p>
              </div>

              {/* Score Display */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card bg-light border-0 text-center">
                    <div className="card-body">
                      <h5 className="text-primary">Score</h5>
                      <h2 className="mb-0">{result.score}/{result.totalQuestions}</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card bg-light border-0 text-center">
                    <div className="card-body">
                      <h5 className="text-info">Percentage</h5>
                      <h2 className={`mb-0 text-${gradeInfo.color}`}>{result.percentage}%</h2>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grade Display */}
              <div className="text-center mb-4">
                <div className={`badge bg-${gradeInfo.color} fs-1 px-4 py-3`}>
                  Grade: {gradeInfo.grade}
                </div>
              </div>

              {/* Detailed Results */}
              <div className="row mb-4">
                <div className="col-md-4">
                  <div className="card border-0 bg-light">
                    <div className="card-body text-center">
                      <h6 className="text-muted">Total Questions</h6>
                      <h4 className="mb-0">{result.totalQuestions}</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 bg-light">
                    <div className="card-body text-center">
                      <h6 className="text-muted">Answered</h6>
                      <h4 className="mb-0">{result.answeredQuestions}</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 bg-light">
                    <div className="card-body text-center">
                      <h6 className="text-muted">Correct Answers</h6>
                      <h4 className="mb-0 text-success">{result.correctAnswers}</h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Information */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card border-0 bg-light">
                    <div className="card-body text-center">
                      <h6 className="text-muted">Time Taken</h6>
                      <h4 className="mb-0">{formatTime(result.timeTaken)}</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border-0 bg-light">
                    <div className="card-body text-center">
                      <h6 className="text-muted">Submitted At</h6>
                      <h6 className="mb-0">{new Date(result.submittedAt).toLocaleString()}</h6>
                    </div>
                  </div>
                </div>
              </div>

          

              {/* Feedback */}
              <div className="mb-4">
                <h5 className="text-dark mb-3">💡 Feedback:</h5>
                <div className={`alert alert-${gradeInfo.color}`}>
                  {result.percentage >= 80 && (
                    <p className="mb-0">
                      <strong>Excellent!</strong> You have performed exceptionally well. Keep up the great work!
                    </p>
                  )}
                  {result.percentage >= 60 && result.percentage < 80 && (
                    <p className="mb-0">
                      <strong>Good Job!</strong> You have performed well. Consider reviewing the topics you found challenging.
                    </p>
                  )}
                  {result.percentage >= 40 && result.percentage < 60 && (
                    <p className="mb-0">
                      <strong>Fair Performance.</strong> You need to improve in some areas. Consider studying the topics more thoroughly.
                    </p>
                  )}
                  {result.percentage < 40 && (
                    <p className="mb-0">
                      <strong>Needs Improvement.</strong> You should review the course material and consider retaking the exam.
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="text-center">
                <div className="d-flex justify-content-center gap-3">
                 
                  <button 
                    className="btn btn-secondary"
                    onClick={() => navigate('/student/dashboard')}
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamResult; 