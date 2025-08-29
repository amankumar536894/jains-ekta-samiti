import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewMembers.css'
import AdminNavbaar from '../../../components/admin/AdminNavbaar/AdminNavbaar'
import ViewMembersSection from '../../../components/admin/ViewMembersSection/ViewMembersSection'

const ViewMembers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token_admin');
    if (!token) {
      navigate('/admin/loggin'); 
    }
  }, [navigate]);

  return (
    <>
      <div className="viewmembers">
        <AdminNavbaar/>
        <ViewMembersSection/>
      </div>
    </>
  )
}

export default ViewMembers
