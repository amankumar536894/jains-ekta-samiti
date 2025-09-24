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
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

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

  useEffect(() => {
    fetchMembers();
  }, []);

  // debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const searchMembers = async () => {
      if (!debouncedQuery) {
        // If query cleared, reload full list
        await fetchMembers();
        return;
      }
      setLoading(true);
      try {
        const token = localStorage.getItem('token_admin');
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/main-members/search`, {
          params: { q: debouncedQuery, page: 1, limit: 25 },
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setMembers(response.data.members || []);
        }
      } catch (error) {
        console.error('Error searching members:', error);
      }
      setLoading(false);
    };
    searchMembers();
  }, [debouncedQuery]);

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
          <div className="searchbar-row">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, phone, email, gotra, registration..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
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
