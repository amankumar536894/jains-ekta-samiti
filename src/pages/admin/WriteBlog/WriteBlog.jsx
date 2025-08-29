import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WriteBlog.css'
import AdminNavbaar from '../../../components/admin/AdminNavbaar/AdminNavbaar'
import WriteBlogSection from '../../../components/admin/WriteBlogSection/WriteBlogSection'

const WriteBlog = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token_admin');
    if (!token) {
      navigate('/admin/loggin'); 
    }
  }, [navigate]);
  return (
    <>
      <div className="writeblog">
        <AdminNavbaar/>
        <WriteBlogSection/>
      </div>
    </>
  )
}

export default WriteBlog
