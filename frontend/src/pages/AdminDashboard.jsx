import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    students: 0,
    exams: 0,
    news: 0,
    study: 0, 
    programs: 0,
    branches: 0,
    years: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [students, exams, news, study, programs, branches, years] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/student/'),
          axios.get('http://localhost:5000/api/admin/exam/'),
          axios.get('http://localhost:5000/api/admin/news/'),
          axios.get('http://localhost:5000/api/admin/study/'),
          axios.get('http://localhost:5000/api/admin/program/'),
          axios.get('http://localhost:5000/api/admin/branch/'),
          axios.get('http://localhost:5000/api/admin/year/')
        ]);
        setCounts({
          students: students.data.value?.length || 0,
          exams: exams.data.value?.length || 0,
          news: news.data.value?.length || 0,
          study: study.data.value?.length || 0,
          programs: programs.data.value?.length || 0,
          branches: branches.data.value?.length || 0,
          years: years.data.value?.length || 0
        });
      } catch (error) {
        console.error('Error fetching dashboard counts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  const cards = [
    { label: 'Students', count: counts.students, icon: 'fa-users', color: 'primary',  link: '/admin/student' },
    { label: 'Exams', count: counts.exams, icon: 'fa-file-alt', color: 'success', link: '/admin/exam' },
    { label: 'News', count: counts.news, icon: 'fa-newspaper', color: 'info', link: '/admin/news' },
    { label: 'Study Materials', count: counts.study, icon: 'fa-book', color: 'warning', link: '/admin/study' },
    { label: 'Programs', count: counts.programs, icon: 'fa-graduation-cap', color: 'secondary', link: '/admin/program' },
    { label: 'Branches', count: counts.branches, icon: 'fa-code-branch', color: 'dark', link: '/admin/branch' },
    { label: 'Years', count: counts.years, icon: 'fa-calendar', color: 'danger', link: '/admin/year' }
  ];

  return (
    <AdminLayout>
      <h3 className="mb-4 text-primary-nou">Admin Dashboard</h3>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {cards.map((card, idx) => (
            <div className="col-md-4 col-lg-3" key={card.label}>
              <div className={`card dashboard-card shadow-sm border-0 bg-${card.color} text-white h-100`} onClick={() => window.location.href = card.link}>
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <i className={`fa ${card.icon} fa-2x mb-3`}></i>
                  <h2 className="mb-1">{card.count}</h2>
                  <h5 className="mb-0">{card.label}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;