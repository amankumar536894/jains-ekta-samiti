import React, { useState } from 'react'
import '../ViewMembersSection/ViewMembersSection.css'
import "../DashSection/DashSection.css";
import './SingleFamilySection.css'
import { Menu, ChevronRight } from 'lucide-react';
import profilepic from "../../../assets/images/profilepic.png";
import FamilyDeletePopup from '../../User/FamilyDeletePopup/FamilyDeletePopup';
import AddFamilyPopup from '../../admin/AddFamilyPopup/AddFamilyPopup';
import EditFamDetailsPop from '../../User/EditFamDetailsPop/EditFamDetailsPop';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const SingleFamilySection = () => {
    const [famdel, setFamdel] = useState(false)
    const [editfamuser, setEditfamuser] = useState(false)
    const [addfamilypopup, setAddfamilypopup] = useState(false)
    const [familydata, setFamilydata] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState('')
    const [familyMemberID, setFamilyMemberID] = useState(null)
    const [mainMemberName, setMainMemberName] = useState("")

    const { user_id } = useParams();
    console.log(user_id)

    useEffect(() => {
        const fetchFamilyData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token_admin');
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/family-members/${user_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                console.log(response.data.data)
                if(response.data.data.length === 0){
                    alert("No family member found")
                }
                setFamilydata(response.data.data);
            } catch (error) {
                console.error('Error fetching family data:', error);
                setErrors(error.message || 'Failed to fetch family data');
            } finally {
                setLoading(false);
            }
        };
        const fetchMainMember = async () => {
            try {
                const token = localStorage.getItem('token_admin');
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/main-members/${user_id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data?.success) {
                    setMainMemberName(res.data.member?.head_name || "");
                }
            } catch (e) {
                console.error('Error fetching main member:', e);
            }
        };
        if (user_id) {
            fetchFamilyData();
            fetchMainMember();
        }
    }, [user_id]);

    const handleFamilyDeleted = (id) => {
        if (!id) return;
        setFamilydata((prev) => prev.filter((f) => f.id !== id));
    };

    const handleFamilyUpdated = (updated) => {
        if (!updated?.id) return;
        setFamilydata((prev) => prev.map((f) => f.id === updated.id ? { ...f, ...updated } : f));
    };

    const handleFamilyAdded = (created) => {
        if (!created) return;
        setFamilydata((prev) => [created, ...prev]);
    };

    const fixBloodGroupName = (blood_group) => {
        if(blood_group === 'A_pos'){
            return 'A+'
        }else if(blood_group === 'A_neg'){
            return 'A-'
        }else if(blood_group === 'B_pos'){
            return 'B+'
        }else if(blood_group === 'B_neg'){
            return 'B-'
        }else if(blood_group === 'AB_pos'){
            return 'AB+'
        }else if(blood_group === 'AB_neg'){
            return 'AB-'
        }else if(blood_group === 'O_pos'){
            return 'O+'
        }else if(blood_group === 'O_neg'){
            return 'O-'
        }else{
            return ''
        }
    }

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
                        <p>{mainMemberName || 'Family Head'}</p>
                    </div>
                </div>

                <div className="viewmembersection">
                    <div className="searchbar-row" style={{justifyContent:'space-between'}}>
                        <div></div>
                        <div className="addmemberrightbtn" onClick={() => { setAddfamilypopup(true); }}>
                            <p>Add Family Member</p>
                        </div>
                    </div>
                    <div className="viewmembertitles forwhitebg">
                        <p className='viewmemberimg'>Family Member name</p>
                        <p className='viewheadname'>Relation</p>
                        <p className='viewfathername'>Blood Group</p>
                        <p className='viewgotra'>Education</p>
                        <p className='viewnum'>Occupation</p>
                        <p className='viewnum'>Contact No</p>
                        <p className='viewnum'>Edit</p>
                        <p className='viewnum'>Delete</p>
                    </div>

                    {loading ? (
                        <div className="loader-div">
                          <div className="loader"></div>
                        </div>
                    ) : (
                        familydata.map((item) => {
                            return (
                                <div className="viewmembertitles normalbg">
                                    <p className='viewmemberimg'>{item.name}</p>
                                    <p className='viewheadname'>{item.relation}</p>
                                    <p className='viewfathername'>{fixBloodGroupName(item.blood_group)}</p>
                                    <p className='viewgotra'>{item.education}</p>
                                    <p className='viewnum'>{item.occupation}</p>
                                    <p className='viewnum'>{item.phone}</p>
                                    <div className='viewnum'>
                                        <span className='editfamily' onClick={() => { setEditfamuser(true); setFamilyMemberID(item.id)}}>Edit</span>
                                    </div>
                                    <div className='viewnum'>
                                        <span className='deletefamily' onClick={() => { setFamdel(true); setFamilyMemberID(item.id)}}>Delete</span>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
                <FamilyDeletePopup famdel={famdel} setFamdel={setFamdel} familyMemberID={familyMemberID} onFamilyDeleted={handleFamilyDeleted} />
                <EditFamDetailsPop editfamuser={editfamuser} setEditfamuser={setEditfamuser} familyMemberID={familyMemberID} onFamilyUpdated={handleFamilyUpdated} />
                <AddFamilyPopup addfamilypopup={addfamilypopup} setAddfamilypopup={setAddfamilypopup} userId={user_id} onFamilyAdded={handleFamilyAdded} />
            </div>
        </>
    )
}

export default SingleFamilySection
