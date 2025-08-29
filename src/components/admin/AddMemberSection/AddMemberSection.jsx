import React, { useState } from "react";
import "../DashSection/DashSection.css";
import "./AddMemberSection.css";
import { Menu, ChevronRight, UserRoundPlus } from "lucide-react";
import profilepic from "../../../assets/images/profilepic.png";
import AddMemberPopup from "../AddMemberPopup/AddMemberPopup";
import AddFamilyPopup from "../AddFamilyPopup/AddFamilyPopup";
import EditMemberPopup from "../EditMemberPopup/EditMemberPopup";
import axios from "axios";
import { useEffect } from "react";

const AddMemberSection = () => {
  const [addMemberPopup, setAddMemberPopup] = useState(false);
  const [addfamilypopup, setAddfamilypopup] = useState(false)
  const [editmemberpopup, setEditmemberpopup] = useState(false)
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token_admin');
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/main-members?page=1&limit=1000`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if(response.data.success){
          setMembers(response.data.members || []);
        }
        setLoading(false);
      } catch (error) {
        setErrors(error.message || 'Failed to fetch members');
        setLoading(false);
      }
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
        <div className="adduserallbox">
          <div className="addmemberheaderbox">
            <p>Joining List</p>
            <div className="addmemberrightbtn" onClick={() => setAddMemberPopup(true)}>
              <UserRoundPlus className="addmembericon" />
              <p>Add Member</p>
            </div>
          </div>
          <div className="addmemberdetailhead">
            <div className="addmemberforextrawid">
              <p className="crudbtn forbold"></p>
              <p className="addregis forbold">Registration No. </p>
              <p className="addfamhead forbold">Head of Family Name</p>
              <p className="addfaname forbold">Father's Name</p>
              <p className="addgot forbold">Gotra</p>
              <p className="addadd forbold">Address</p>
              <p className="addbuzz forbold">Occupation Address</p>
              <p className="addedu forbold">Education</p>
              <p className="addocpu forbold">Occupation</p>
              <p className="addcont forbold">Contact No.</p>
              <p className="addate forbold">Date</p>
            </div>
            {loading && <div className="loader-div"><div className="loader"></div></div>}
            {errors && <p>Error: {errors}</p>}
            {members.map((item) => {
              return (
                <div className="addmemberforextrawid forwhitebg">
                  <div className="crudbtn">
                    <span className="addfam" onClick={() => { setAddfamilypopup(true); setSelectedMemberId(item.user_id)}}>Add Family</span>
                    <span className="adedit" onClick={() => { setEditmemberpopup(true); setSelectedMemberId(item.user_id) }}>Edit</span>
                  </div>
                  <p className="addregis">{item.registration_no}</p>
                  <p className="addfamhead">{item.head_name}</p>
                  <p className="addfaname">{item.father_name}</p>
                  <p className="addgot">{item.gotra}</p>
                  <p className="addadd">{item.address1}</p>
                  <p className="addbuzz">{item.business_address}</p>
                  <p className="addedu">{item.education}</p>
                  <p className="addocpu">{item.occupation}</p>
                  <p className="addcont">{item.phone}</p>
                  <p className="addate">{new Date(item.created_at).toLocaleDateString()}</p>
                </div>
              )
            })}

          </div>
        </div>
        <AddMemberPopup addMemberPopup={addMemberPopup} setAddMemberPopup={setAddMemberPopup} />
        <AddFamilyPopup addfamilypopup={addfamilypopup} setAddfamilypopup={setAddfamilypopup} userId={selectedMemberId}/>
        <EditMemberPopup editmemberpopup={editmemberpopup} setEditmemberpopup={setEditmemberpopup}   userId={selectedMemberId} />
      </div>
    </>
  );
};

export default AddMemberSection;
