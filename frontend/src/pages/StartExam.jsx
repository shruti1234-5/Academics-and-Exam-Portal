import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StartExam() {
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    // Get exam data from localStorage
    const examData = localStorage.getItem('currentExam');
    if (!examData) {
      navigate('/student/exam');
      return;
    }
    setExam(JSON.parse(examData));
  }, [navigate]);

  const handleNext = () => {
    navigate('/student/takeexam');
  };

  const handleBack = () => {
    navigate('/student/exam');
  };

  if (!exam) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">📋 Exam Instructions</h3>
            </div>
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h4 className="text-primary">{exam.name}</h4>
                <p className="text-muted">Please read all instructions carefully before starting</p>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card bg-light border-0">
                    <div className="card-body text-center">
                      <h5 className="text-primary">⏱️ Duration</h5>
                      <h3 className="mb-0">{exam.duration} minutes</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card bg-light border-0">
                    <div className="card-body text-center">
                      <h5 className="text-info">❓ Questions</h5>
                      <h3 className="mb-0">{exam.questions?.length || 0} questions</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-dark mb-3">📝 Important Instructions:</h5>
                <div className="alert alert-warning">
                  <ul className="mb-0">
                    <li><strong>Time Limit:</strong> You have {exam.duration} minutes to complete this exam</li>
                    <li><strong>Navigation:</strong> You can navigate between questions using the navigation buttons</li>
                    <li><strong>Answering:</strong> Select only one answer per question</li>
                    <li><strong>Review:</strong> You can review and change your answers before final submission</li>
                    <li><strong>Submission:</strong> Once you click "Submit Exam", you cannot go back</li>
                    <li><strong>Auto-submit:</strong> The exam will automatically submit when time runs out</li>
                  </ul>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-dark mb-3">⚠️ Important Notes:</h5>
                <div className="alert alert-danger">
                  <ul className="mb-0">
                    <li>Do not refresh the page during the exam</li>
                    <li>Do not close the browser tab</li>
                    <li>Ensure you have a stable internet connection</li>
                    <li>Your answers are saved automatically as you progress</li>
                  </ul>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-dark mb-3 text-secondary-nou">📊 Exam Structure:</h5>
                <div className="row">
                  <div className="col-md-6">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <h6 className="text-primary">Question Types:</h6>
                        <p className="mb-0">Multiple Choice Questions (MCQ)</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card border-0 bg-light">
                      <div className="card-body">
                        <h6 className="text-info">Scoring:</h6>
                        <p className="mb-0">1 point per correct answer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="form-check d-inline-block me-4">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="agreeInstructions"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="agreeInstructions">
                    I have read and understood all instructions
                  </label>
                </div>
              </div>
            </div>
            <div className="card-footer bg-white border-0 p-4">
              <div className="d-flex justify-content-between">
                <button 
                  className="btn btn-secondary btn-lg"
                  onClick={handleBack}
                >
                  ← Back to Exams
                </button>
                <button 
                  className="btn btn-success btn-lg"
                  onClick={handleNext}
                  disabled={!agreed}
                >
                  Next → Start Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartExam; 