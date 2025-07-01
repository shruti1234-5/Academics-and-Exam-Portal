import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TakeExam() {
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [examStarted, setExamStarted] = useState(false);

  useEffect(() => {
    // Get exam data from localStorage
    const examData = localStorage.getItem('currentExam');
    if (!examData) {
      navigate('/student/exam');
      return;
    }
    const examObj = JSON.parse(examData);
    setExam(examObj);
    setTimeLeft(examObj.duration * 60); // Convert minutes to seconds
  }, [navigate]);

  useEffect(() => {
    if (examStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Auto-submit when time runs out
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [examStarted, timeLeft]);

  const startExam = () => {
    setExamStarted(true);
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit the exam? You cannot go back after submission.')) {
      // Calculate score
      let score = 0;
      exam.questions.forEach((question, index) => {
        if (answers[index] === question.correct) {
          score++;
        }
      });

      const percentage = Math.round((score / exam.questions.length) * 100);
      
      // Get grade
      const getGrade = (percentage) => {
        if (percentage >= 90) return 'A+';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B+';
        if (percentage >= 60) return 'B';
        if (percentage >= 50) return 'C+';
        if (percentage >= 40) return 'C';
        return 'F';
      };

      const result = {
        examId: exam._id,
        examName: exam.name,
        totalQuestions: exam.questions.length,
        answeredQuestions: Object.keys(answers).length,
        correctAnswers: score,
        score: score,
        percentage: percentage,
        grade: getGrade(percentage),
        timeTaken: exam.duration * 60 - timeLeft,
        submittedAt: new Date().toISOString()
      };

      // Get student ID from localStorage
      const studentId = localStorage.getItem('student');
      if (studentId) {
        result.studentId = studentId;
      } else {
        // If no student data, redirect to login
        alert('Please login again');
        navigate('/student/login');
        return;
      }

      // Save result to database
      const saveResult = async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/student/examresult/', result);
          if (response.data.msg === 'Success') {
            // Store result in localStorage for the result page
            localStorage.setItem('examResult', JSON.stringify(result));
            navigate('/student/examresult');
          } else {
            alert('Error saving result: ' + response.data.msg);
          }
        } catch (error) {
          console.error('Error saving exam result:', error);
          if (error.response?.data?.msg === 'You have already taken this exam') {
            alert('You have already taken this exam!');
            navigate('/student/exam');
          } else {
            alert('Error saving result. Please try again.');
          }
        }
      };

      saveResult();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

  if (!examStarted) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-success text-white text-center">
                <h3 className="mb-0">🚀 Ready to Start?</h3>
              </div>
              <div className="card-body p-5 text-center">
                <h4 className="text-primary mb-4">{exam.name}</h4>
                <p className="text-muted mb-4">
                  You're about to start the exam. Make sure you're ready and have read all instructions.
                </p>
                <div className="alert alert-info">
                  <strong>Time Limit:</strong> {exam.duration} minutes<br />
                  <strong>Questions:</strong> {exam.questions.length} questions
                </div>
                <button 
                  className="btn btn-success btn-lg"
                  onClick={startExam}
                >
                  Start Exam Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = exam.questions[currentQuestion];

  return (
    <div className="container-fluid">
      {/* Header with timer and progress */}
      <div className="row bg-primary text-white py-3">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-0">{exam.name}</h4>
              <small>Question {currentQuestion + 1} of {exam.questions.length}</small>
            </div>
            <div className="text-center">
              <div className="h4 mb-0">
                <span className={timeLeft < 300 ? 'text-warning' : ''}>
                  ⏱️ {formatTime(timeLeft)}
                </span>
              </div>
              <small>Time Remaining</small>
            </div>
            <div className="text-end">
              <div className="h6 mb-0">
                {Object.keys(answers).length} / {exam.questions.length}
              </div>
              <small>Answered</small>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-9">
          {/* Main exam content */}
          <div className="p-4">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <div className="mb-4">
                  <h5 className="text-primary">
                    Question {currentQuestion + 1}:
                  </h5>
                  <p className="h6">{currentQ.question}</p>
                </div>

                <div className="mb-4">
                  <h6 className="text-muted mb-3">Select your answer:</h6>
                  {currentQ.choices.map((choice, index) => (
                    <div key={index} className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`question-${currentQuestion}`}
                          id={`choice-${currentQuestion}-${index}`}
                          value={choice}
                          checked={answers[currentQuestion] === choice}
                          onChange={() => handleAnswerSelect(currentQuestion, choice)}
                        />
                        <label 
                          className="form-check-label" 
                          htmlFor={`choice-${currentQuestion}-${index}`}
                        >
                          <strong>{String.fromCharCode(65 + index)}.</strong> {choice}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          {/* Question navigation */}
          <div className="p-4">
            <div className="card shadow-sm">
              <div className="card-header">
                <h6 className="mb-0">Question Navigation</h6>
              </div>
              <div className="card-body">
                <div className="row g-2">
                  {exam.questions.map((_, index) => (
                    <div key={index} className="col-4">
                      <button
                        className={`btn btn-sm w-100 ${
                          index === currentQuestion
                            ? 'btn-primary'
                            : answers[index]
                            ? 'btn-success'
                            : 'btn-outline-secondary'
                        }`}
                        onClick={() => setCurrentQuestion(index)}
                      >
                        {index + 1}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="card mt-3">
              <div className="card-body">
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-outline-primary"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                  >
                    ← Previous
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleNext}
                    disabled={currentQuestion === exam.questions.length - 1}
                  >
                    Next →
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={handleSubmit}
                  >
                    Submit Exam
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

export default TakeExam; 