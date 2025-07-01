import { useState, useEffect } from 'react';
import axios from 'axios';
import StudentLayout from '../components/StudentLayout';
import { FaBookReader, FaDownload } from 'react-icons/fa';

const StudentStudy = () => {
  const [study, setStudy] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/study/');
        if (res.data.msg === 'Success') {
          setStudy(res.data.value);
        } else {
          console.log(res.data.msg);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
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
        <h3 className="text-center mb-4 text-primary-nou">Study Materials</h3>
        <div className="row g-4">
          {study?.length > 0 ? (
            study.map((e) => (
              <div className="col-md-6 col-lg-4" key={e._id}>
                <div className="card-custom h-100">
                    <div className="card-header-custom">
                        <h5 className="mb-0">{e.topic}</h5>
                    </div>
                    <div className="card-body-custom d-flex flex-column">
                        <p className="text-muted flex-grow-1">  <b>Description: </b>{e.description}</p>
                        <div className="text-center">
                            <a
                              href={`http://localhost:5000/uploads/${e.doc}`}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-primary mt-3 w-50 text-white rounded-3 p-2 text-decoration-none"
                              download
                            >
                              <FaDownload className="me-2" /> Download 
                            </a>
                        </div>
                    </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
                <div className="card-custom text-center py-5">
                    <div className="card-body-custom">
                        <FaBookReader size={50} className="text-muted mb-3" />
                        <h4 className="text-muted">No Study Materials Available</h4>
                        <p className="text-muted">Please check back later.</p>
                    </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentStudy;
