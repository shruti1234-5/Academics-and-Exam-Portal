import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentLayout from '../components/StudentLayout';
import { FaNewspaper } from 'react-icons/fa';

const StudentNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/news/');
        if (res.data.msg === 'Success') {
          setNews(res.data.value);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

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
            <h3 className="text-center mb-4 text-primary-nou">Latest News & Updates</h3>
            <div className="row g-4">
                {news?.length > 0 ? (
                    news.map((item) => (
                        <div className="col-lg-4 col-md-6 d-flex" key={item._id}>
                            <div className="card-custom w-100 d-flex flex-column">
                                <div className="card-header-custom">
                                    <h5 className="mb-0 text-truncate" title={item.newsTitle}>{item.newsTitle}</h5>
                                </div>
                                <div className="card-body-custom d-flex flex-column flex-grow-1">
                                    <p className="card-text flex-grow-1">{item.description}</p>
                                    <p className="text-muted small mt-auto pt-2">
                                        Posted on: {new Date(item.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <div className="card-custom text-center py-5">
                            <div className="card-body-custom">
                                <FaNewspaper size={50} className="text-muted mb-3" />
                                <h4 className="text-muted">No News Available</h4>
                                <p className="text-muted">Please check back later for updates.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </StudentLayout>
  );
};

export default StudentNews; 