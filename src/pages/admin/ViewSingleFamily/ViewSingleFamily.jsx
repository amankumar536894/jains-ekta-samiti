import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';import './ViewSingleFamily.css'
import AdminNavbaar from '../../../components/admin/AdminNavbaar/AdminNavbaar'
import SingleFamilySection from '../../../components/admin/SingleFamilySection/SingleFamilySection'

const ViewSingleFamily = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token_admin');
    if (!token) {
      navigate('/admin/loggin'); 
    }
  }, [navigate]);
  return (
    <>
      <div className="viewsinglefamily">
        <AdminNavbaar/>
        <SingleFamilySection/>
      </div>
    </>
  )
}

export default ViewSingleFamily
