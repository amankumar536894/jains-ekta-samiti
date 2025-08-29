import React from 'react'
import './ViewMembersSection.css'
import "../DashSection/DashSection.css";
import { Menu, ChevronRight } from 'lucide-react'
import profilepic from "../../../assets/images/profilepic.png";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ViewMembersSection = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token_admin')
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/main-members?page=1&limit=1000`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.data.success) {
          setMembers(response.data.members || []);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      }
      setLoading(false);
    };
    fetchMembers();
  }, []);

  return (
    <>
      <div className="dashsection">
        <div className="topnavbaar">
          <Menu />
          <div className="adminprofile">
            <img src={profilepic} />
            <p>Admin</p>
          </div>
        </div>
        <div className="detailnavbaar">
          <p className="welcometext">Welcome</p>
          <div className="welcomeright">
            <p>Jain Ekta Samiti</p>
            <ChevronRight size={20} className="rightarrow" />
            <p>Add Members</p>
          </div>
        </div>

        <div className="viewmembersection">
          <div className="viewmembertitles forwhitebg">
            <p className='viewmemberimg'>Image</p>
            <p className='viewheadname'>Head of Family Name</p>
            <p className='viewfathername'>Father's Name</p>
            <p className='viewgotra'>Gotra</p>
            <p className='viewnum'>Mobile No</p>
          </div>
          {loading ? (
            <div className="loader-div">
              <div className="loader"></div>
            </div>
          ) : (
            members.map((item) => {
              const imageUrl = item.photo
                ? `${import.meta.env.VITE_BACKEND_URL}${item.photo.startsWith("/public") ? item.photo : `/public${item.photo}`}`
                : profilepic;

              console.log(imageUrl)
              console.log(item.photo)

              return (
                <Link to={`/member/${item.user_id}`} key={item.user_id} className="viewmembertitles normalbg">
                  <p className='viewmemberimg'>
                    <div className='viewimgbox'>
                      <img src={imageUrl} alt={item.head_name} />
                    </div>
                  </p>
                  <p className='viewheadname'>{item.head_name}</p>
                  <p className='viewfathername'>{item.father_name}</p>
                  <p className='viewgotra'>{item.gotra}</p>
                  <p className='viewnum'>{item.phone}</p>
                </Link>
              )
            })
          )}
        </div>
      </div>
    </>
  )
}

export default ViewMembersSection
