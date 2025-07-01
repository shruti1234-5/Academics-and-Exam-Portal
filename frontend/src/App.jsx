import {Routes, Route} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Homepage from './components/Homepage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminYear from './pages/AdminYear'
import AdminBranch from './pages/AdminBranch'
import AdminNews from './pages/AdminNews'
import AdminProgram from './pages/AdminProgram'
import AdminStudy from './pages/AdminStudy'
import StudentRegistration from './pages/StudentRegistration'
import AdminStudentPage from './pages/AdminStudentPage'
import StudentLogin from './pages/StudentLogin'
import StudentDashboard from './pages/StudentDashboard'
import StudentFeedback from './pages/StudentFeedback'
import ViewFeedback from './pages/ViewFeedback'
import StudentStudy from './pages/StudentStudy'
import AdminViewFeed from './pages/AdminViewFeed'
import AdminAddExam from './pages/AdminAddExam'
import Exam from './pages/ExamManagement'
import StudentExam from './pages/StudentExam'
import StartExam from './pages/StartExam'
import TakeExam from './pages/TakeExam'
import ExamResult from './pages/ExamResult'
import ExamResults from './pages/ExamResults'
import StudentNews from './pages/StudentNews'

function App() {
 
  return (
    <>     
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path = "/" element={ <Homepage />} />

        <Route path = "/student/register" element={ <StudentRegistration />} />
        <Route path = "/student/login" element={ <StudentLogin />} />
        <Route path = "/student/dashboard" element={ <StudentDashboard />} />
        <Route path = "/student/feedback" element={ <StudentFeedback />} />
        <Route path = "/student/viewfeedback" element={ <ViewFeedback />} />
        <Route path = "/student/study" element={ <StudentStudy />} />
        <Route path = "/student/exam" element={ <StudentExam />} />
        <Route path = "/student/news" element={ <StudentNews />} />
        <Route path = "/student/startexam" element={ <StartExam />} />
        <Route path = "/student/takeexam" element={ <TakeExam />} />
        <Route path = "/student/examresult" element={ <ExamResult />} />

        <Route path = "/admin/login" element={ <AdminLogin />} />
        <Route path = "/admin/dashboard" element={ <AdminDashboard />} />
        <Route path = "/admin/year" element={ <AdminYear />} />
        <Route path = "/admin/branch" element={ <AdminBranch />} />
        <Route path = "/admin/program" element={ <AdminProgram />} />
        <Route path = "/admin/news" element={ <AdminNews />} />
        <Route path = "/admin/student" element={ <AdminStudentPage />} />
        <Route path = "/admin/study" element={ <AdminStudy />} />
        <Route path = "/admin/feed" element={ <AdminViewFeed />} />
        <Route path = "/admin/addexam" element={ <AdminAddExam />} />
        <Route path = "/admin/exam" element={ <Exam />} />
        <Route path = "/admin/exam/:examId/results" element={ <ExamResults />} />

        </Routes>
      
    </>
  )
}

export default App
