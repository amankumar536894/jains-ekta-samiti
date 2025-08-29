import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'
import AdminNavbaar from '../../../components/admin/AdminNavbaar/AdminNavbaar'
import DashSection from '../../../components/admin/DashSection/DashSection'

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token_admin');
    if (!token) {
      navigate('/admin/loggin'); 
    }
  }, [navigate]);
  return (
    <>
      <div className="dashboard">
        <AdminNavbaar/>
        <DashSection/>
      </div>
    </>
  )
}

export default Dashboard
