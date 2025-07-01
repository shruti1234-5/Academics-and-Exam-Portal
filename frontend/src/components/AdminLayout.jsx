import React, { useState, useEffect } from 'react';
import AdminSidenav from './AdminSidenav';
import AdminTopnav from './AdminTopnav';

const AdminLayout = ({ children }) => {
    const [isSidenavOpen, setIsSidenavOpen] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            const small = window.innerWidth <= 768;
            setIsSmallScreen(small);
            setIsSidenavOpen(!small);
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidenav = () => {
        setIsSidenavOpen(!isSidenavOpen);
    };

    return (
        <div className="d-flex" style={{ height: '100vh' }}>
            <AdminSidenav 
                isSidenavOpen={isSidenavOpen} 
                toggleSidenav={toggleSidenav} 
                isSmallScreen={isSmallScreen} 
            />
            <div 
                className="flex-grow-1 d-flex flex-column bg-accent-nou" 
                style={{ 
                    overflow: 'auto', 
                    paddingLeft: isSmallScreen ? '60px' : (isSidenavOpen ? '250px' : '60px'),
                    transition: 'padding-left 0.3s ease'
                }}
            >
                <AdminTopnav />
                <main className="p-4" style={{ flexGrow: 1 }}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout; 