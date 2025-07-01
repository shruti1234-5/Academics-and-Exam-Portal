import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const StudentTopnav = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('student')) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('student');
        toast.success('Logout Successful!');
        navigate('/');
    };

    return (
        <>
            <nav className="navbar navbar-dark text-light bg-hero-gradient">
                <div className="container-fluid">
                    <a className="navbar-brand">Student Dashboard</a>
                    <div className="m-2">
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default StudentTopnav;