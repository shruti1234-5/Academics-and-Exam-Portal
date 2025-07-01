import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StudentLayout from '../components/StudentLayout';
import { FaFileAlt, FaBook, FaNewspaper } from 'react-icons/fa';

const StudentDashboard = () => {
    const [counts, setCounts] = useState({
        exams: 0,
        study: 0,
        news: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [exams, study, news] = await Promise.all([
                    axios.get('http://localhost:5000/api/admin/exam/'),
                    axios.get('http://localhost:5000/api/admin/study/'),
                    axios.get('http://localhost:5000/api/admin/news/')
                ]);
                setCounts({
                    exams: exams.data.value?.length || 0,
                    study: study.data.value?.length || 0,
                    news: news.data.value?.length || 0
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
        {
          label: 'Available Exams',
          count: counts.exams,
          icon: <FaFileAlt size={40} />,
          color: '#ffffff',
          bgClass: 'bg-success',
          link: '/student/exam'
        },
        {
          label: 'Study Materials',
          count: counts.study,
          icon: <FaBook size={40} />,
          color: '#ffffff',
          bgClass: 'bg-warning',
          link: '/student/study'
        },
        {
          label: 'Latest News',
          count: counts.news,
          icon: <FaNewspaper size={40} />,
          color: '#ffffff',
          bgClass: 'bg-info',
          link: '/student/viewnews'
        }
      ];

    return (
        <StudentLayout>
            <h3 className="mb-4 text-primary-nou">Student Dashboard</h3>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row g-4 ">
                    {cards.map((card) => (
                        <div className="col-md-4" key={card.label}>
                            <Link to={card.link} className="text-decoration-none">
                            <div className={`dashboard-card p-4 text-center h-100 text-white ${card.bgClass}`}>
  <div className="mb-3" style={{ color: card.color }}>{card.icon}</div>
  <h2 className="mb-1">{card.count}</h2>
  <h5 className="mb-0">{card.label}</h5>
</div>

                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </StudentLayout>
    );
};

export default StudentDashboard;