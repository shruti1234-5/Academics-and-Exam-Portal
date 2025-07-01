import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminLayout from '../components/AdminLayout';
import { FaPlus, FaTrash, FaArrowLeft, FaEye, FaTimes, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const AdminAddExam = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [examId, setExamId] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const [exam, setExam] = useState({ name: '', desc: '', duration: '' });
  const [questions, setQuestions] = useState([
    { question: '', choices: ['', ''], correct: '' },
  ]);

  useEffect(() => {
    const editExamData = localStorage.getItem('editExam');
    if (editExamData) {
      const examData = JSON.parse(editExamData);
      setExam({
        name: examData.name || '',
        desc: examData.desc || '',
        duration: examData.duration || ''
      });
      setQuestions(examData.questions && examData.questions.length > 0 ? examData.questions : [{ question: '', choices: ['', ''], correct: '' }]);
      setExamId(examData._id);
      setIsEditing(true);
      localStorage.removeItem('editExam');
    }
  }, []);

  const handleExamChange = (e) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleChoiceChange = (qIndex, cIndex, value) => {
    const updated = [...questions];
    updated[qIndex].choices[cIndex] = value;
    setQuestions(updated);
  };

  const addChoice = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].choices.push('');
    setQuestions(updated);
  };

  const removeChoice = (qIndex, cIndex) => {
    const updated = [...questions];
    updated[qIndex].choices.splice(cIndex, 1);
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', choices: ['', ''], correct: '' }]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
        const updated = [...questions];
        updated.splice(index, 1);
        setQuestions(updated);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation: Check if all required fields are filled
    if (!exam.name.trim()) {
      alert('Please enter exam name');
      return;
    }
    
    if (!exam.desc.trim()) {
      alert('Please enter exam description');
      return;
    }
    
    if (!exam.duration) {
      alert('Please enter exam duration');
      return;
    }

    // Validation: Check if all questions have correct choices
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      
      if (!question.question.trim()) {
        alert(`Please enter question ${i + 1}`);
        return;
      }
      
      // Check if all choices are filled
      for (let j = 0; j < question.choices.length; j++) {
        if (!question.choices[j].trim()) {
          alert(`Please fill all choices for question ${i + 1}`);
          return;
        }
      }
      
      // Check if correct choice is filled
      if (!question.correct.trim()) {
        alert(`Please enter correct choice for question ${i + 1}`);
        return;
      }
      
      // Check if correct choice matches one of the choices
      if (!question.choices.includes(question.correct.trim())) {
        alert(`Correct choice for question ${i + 1} must match one of the provided choices`);
        return;
      }
    }
  
    try {
      const payload = {
        ...exam,
        questions,
      };

      let response;
      if (isEditing) {
        // Update existing exam
        response = await axios.put(`http://localhost:5000/api/admin/exam/${examId}`, payload);
      } else {
        // Create new exam
        response = await axios.post('http://localhost:5000/api/admin/exam/', payload);
      }
  
      if (response.data.msg === 'Success') {
        toast.success(isEditing ? "Exam updated successfully!" : "Exam added successfully!");
        navigate('/admin/exam');
      } else {
        alert("Error: " + response.data.msg);
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="text-center text-primary-nou">{isEditing ? 'Edit Exam' : 'Create New Exam'}</h3>
            <div>
                <button className="btn-primary me-2 text-white" onClick={() => navigate('/admin/exam')}>
                    <FaArrowLeft className="me-2" /> Back to List
                </button>
                <button className="btn-info" onClick={() => setShowPreview(true)}>
                    <FaEye className="me-2" /> Preview
                </button>
            </div>
        </div>

        {showPreview && (
          <div className="modal-backdrop">
            <div className="modal-content-custom" style={{maxWidth: '800px'}}>
              <div className="card-custom">
                <div className="card-header-custom d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Exam Preview: {exam.name}</h5>
                    <button onClick={() => setShowPreview(false)} className="btn-icon-close"><FaTimes /></button>
                </div>
                <div className="card-body-custom" style={{maxHeight: '70vh', overflowY: 'auto'}}>
                    <h6><strong>Description:</strong> {exam.desc}</h6>
                    <h6><strong>Duration:</strong> {exam.duration} minutes</h6>
                    <hr />
                    {questions.map((q, idx) => (
                    <div key={idx} className="mb-3 p-3 border rounded">
                        <p className="fw-bold">Q{idx + 1}: {q.question}</p>
                        <ul className="list-unstyled">
                        {q.choices.map((choice, cidx) => (
                            <li key={cidx} className={`p-2 rounded ${q.correct === choice ? 'bg-success-soft text-dark' : ''}`}>
                            <strong>{String.fromCharCode(65 + cidx)}.</strong> {choice}
                            {q.correct === choice && <span className="ms-2 badge bg-success">Correct</span>}
                            </li>
                        ))}
                        </ul>
                    </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="card-custom">
            <div className="card-header-custom text-secondary-nou">Exam Details</div>
            <div className="card-body-custom">
              <div className="row">
                <div className="col-md-6 mb-3"> 
                    <label className="form-label">Exam Name</label>
                    <input type="text" name="name" className="form-control" value={exam.name} onChange={handleExamChange} required />
                </div>
                <div className="col-md-6 mb-3"> 
                    <label className="form-label">Duration (minutes)</label>
                    <input type="number" name="duration" className="form-control" value={exam.duration} onChange={handleExamChange} required min="1" />
                </div>
                <div className="col-12 mb-3">
                    <label className="form-label">Description</label>
                    <textarea name="desc" className="form-control" value={exam.desc} onChange={handleExamChange} required></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="card-custom">
            <div className="card-header-custom text-secondary-nou">Questions</div>
            <div className="card-body-custom">
              {questions.map((q, qIndex) => (
                <div key={qIndex} className="p-3 border rounded mb-4 bg-light-subtle">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">Question {qIndex + 1}</h5>
                    {questions.length > 1 && (
                      <button type="button" className="btn-danger-icon" onClick={() => removeQuestion(qIndex)}><FaTrash /></button>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Question Text</label>
                    <input type="text" className="form-control" placeholder="Enter the question" value={q.question} onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)} required />
                  </div>

                  <label className="form-label">Choices</label>
                  {q.choices.map((choice, cIndex) => (
                    <div key={cIndex} className="input-group mb-2">
                      <span className="input-group-text">{String.fromCharCode(65 + cIndex)}</span>
                      <input type="text" className="form-control" placeholder={`Choice ${String.fromCharCode(65 + cIndex)}`} value={choice} onChange={(e) => handleChoiceChange(qIndex, cIndex, e.target.value)} required />
                      {q.choices.length > 2 && (
                        <button type="button" className="btn-icon" onClick={() => removeChoice(qIndex, cIndex)}><FaMinusCircle /></button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => addChoice(qIndex)}><FaPlusCircle className="me-1" /> Add Choice</button>
                  
                  <div className="mt-3">
                    <label className="form-label">Correct Answer</label>
                    <input type="text" className="form-control" placeholder="Enter the correct choice exactly as written above" value={q.correct} onChange={(e) => handleQuestionChange(qIndex, 'correct', e.target.value)} required />
                  </div>
                </div>
              ))}
              <button type="button" className="p-2 bg-primary-nou text-white" onClick={addQuestion}><FaPlus className="me-2" /> Add Question</button>
            </div>
          </div>
          
          <div className="text-center my-4">
            <button className="hero-btn" type="submit">
              {isEditing ? 'Update Exam' : 'Save Exam'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminAddExam;
