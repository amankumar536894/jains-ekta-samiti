import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMembers.css';
import AdminNavbaar from '../../../components/admin/AdminNavbaar/AdminNavbaar';
import AddMemberSection from '../../../components/admin/AddMemberSection/AddMemberSection';

const AddMembers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token_admin');
    if (!token) {
      navigate('/admin/loggin'); 
    }
  }, [navigate]);

  return (
    <div className="addmembers">
      <AdminNavbaar />
      <AddMemberSection />
    </div>
  );
};

export default AddMembers;
