import React from "react";
import "./DashSection.css";
import { Menu, ChevronRight, Users } from "lucide-react";
import profilepic from "../../../assets/images/profilepic.png";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashSection = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token_admin');
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/main-members/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.data.success) {
        console.log(response.data)
        setDashboardData(response.data || {});
      }
      setLoading(false);
    } catch (error) {
      setErrors(error.message || 'Failed to fetch dashboard data');
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token_admin');
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/main-members?page=1&limit=10000`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.data.success) {
          setMembers(response.data.members || []);
        }
        setLoading(false);
      } catch (error) {
        if(error.response.data.success === false){
            console.log(error.response.data);
            localStorage.removeItem('token_admin');
            navigate('/admin/loggin');
            return;
        }
        setErrors(error.message || 'Failed to fetch members');
        setLoading(false);
      }
    };
    fetchMembers();
    fetchDashboardData();
  }, []);
  console.log(members)
  console.log(dashboardData)

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
            <p>Shantmat Setu</p>
            <ChevronRight size={20} className="rightarrow" />
            <p>Dashboards</p>
          </div>
        </div>
        <div className="forallfour">
          <div className="forperfour">
            <div className="leftperfour">
              <p className="leftperfourtitle">Total Main Members</p>
              <p className="leftperfourdata">{dashboardData?.totalMainMembers}</p>
            </div>
            <Users className="righticonper" />
          </div>
          <div className="forperfour">
            <div className="leftperfour">
              <p className="leftperfourtitle">Total Family Members</p>
              <p className="leftperfourdata">{dashboardData?.totalFamilyMembers}</p>
            </div>
            <Users className="righticonper" />
          </div>
          <div className="forperfour">
            <div className="leftperfour">
              <p className="leftperfourtitle">Total Male</p>
              <p className="leftperfourdata">{dashboardData?.totalMale}</p>
            </div>
            <Users className="righticonper" />
          </div>
          <div className="forperfour">
            <div className="leftperfour">
              <p className="leftperfourtitle">Total Female</p>
              <p className="leftperfourdata">{dashboardData?.totalFemale}</p>
            </div>
            <Users className="righticonper" />
          </div>
        </div>
        <div className="recentlist">
          <div className="toprecent">
            <div>Recent Joining List</div>
            {/* <div>02 Nov 2021 to 31 Dec 2021</div> */}
          </div>
          <div className="headerrecent fordark">
            <p className="registerdiv">Registration No.</p>
            <p className="headdiv">Head of the Family Name</p>
            <p className="fatherdiv">Father's Name</p>
            <p className="gotradiv">Gotra</p>
            <p className="citydiv">Education</p>
            <p className="contactdiv">Contact No</p>
            <p className="statusdiv">Occupation</p>
            <p className="datediv">Date</p>
          </div>

          {loading ? (
            <div className="loader-div">
             <div className="loader"></div> 
            </div>
          ) : errors ? (
            <p className="text-center">{errors}</p>
          ) : (
            members.map((item) => {
              return (
                <div className="headerrecent">
                  <p className="registerdiv">{item.registration_no}</p>
                  <p className="headdiv">{item.head_name}</p>
                  <p className="fatherdiv">{item.father_name}</p>
                  <p className="gotradiv">{item.gotra}</p>
                  <p className="citydiv">{item.education}</p>
                  <p className="contactdiv">{item.phone}</p>
                  <p className="statusdiv">{item.occupation}</p>
                  <p className="datediv">{new Date(item.created_at).toISOString().split("T")[0]}
                  </p>
                </div>
              )
            })
          )}
        </div>
      </div>
    </>
  );
};

export default DashSection;
