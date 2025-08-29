import React, { useEffect, useState } from 'react'
import './HomePage.css'
import { House, Users, Dna, Heart, Phone, ShoppingBag, SquarePen } from 'lucide-react'
import AddFamilyUser from '../../../components/User/AddFamilyUser/AddFamilyUser'
import EditMyDetails from '../../../components/User/EditMyDetails/EditMyDetails'
import FamilyDeletePopup from '../../../components/User/FamilyDeletePopup/FamilyDeletePopup'
import EditFamDetailsPop from '../../../components/User/EditFamDetailsPop/EditFamDetailsPop'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate();
    const [adfams, setAdfams] = useState(false)
    const [editmydet, setEditmydet] = useState(false)
    const [famdel, setFamdel] = useState(false)
    const [editfamuser, setEditfamuser] = useState(false)
    const [mainMemberData, setMainMemberData] = useState(null)
    const [familyMemberData, setFamilyMemberData] = useState([])
    const [familyMemberID, setFamilyMemberID] = useState(null);

    const fetchMainMemberData = async () => {
        try {
            const token = localStorage.getItem('token_user');
            const main_member_id = localStorage.getItem('main_member_id');
            if (!token || !main_member_id) {
                localStorage.removeItem('token_user');
                localStorage.removeItem('main_member_id');
                navigate('/user/loggin');
                return;
            }
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/main-members/${main_member_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMainMemberData(response.data.member);
        } catch (err) {
            if(err.response.data.success === false){
                console.log(err.response.data);
                localStorage.removeItem('token_user');
                localStorage.removeItem('main_member_id');
                navigate('/user/loggin');
                return;
            }
            console.log(err);
        }
    };

    const fetchFamilyMemberData = async () => {
        try {
            const token = localStorage.getItem('token_user');
            if (!token) {
                navigate('/user/loggin');
                return;
            }
            const main_member_id = localStorage.getItem('main_member_id');
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/family-members/${main_member_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.data);
            setFamilyMemberData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getProperFormatBloodGroup = (blood_group) => {
        if (blood_group === 'A_pos') {
            return 'A+';
        } else if (blood_group === 'A_neg') {
            return 'A-';
        } else if (blood_group === 'B_pos') {
            return 'B+';
        } else if (blood_group === 'B_neg') {
            return 'B-';
        } else if (blood_group === 'AB_pos') {
            return 'AB+';
        } else if (blood_group === 'AB_neg') {
            return 'AB-';
        } else if (blood_group === 'O_pos') {
            return 'O+';
        } else if (blood_group === 'O_neg') {
            return 'O-';
        } else {
            return '';
        }
    }

    useEffect(() => {
        fetchMainMemberData();
        fetchFamilyMemberData();
    }, []);

    return (
        <>
            <div className="homepage">
                <div className="header">
                    <div className="headerleft">
                        <p>Jain Ekta Samiti</p>
                    </div>
                    <div className="headerright">
                        <p onClick={() => { setAdfams(true) }}>Add Family Member</p>
                    </div>
                </div>
                <div className="forpersonal">
                    <div className="personalintroleft">
                        <p className='intro'>{mainMemberData?.head_name}</p>
                        <div className='perintro'>
                            <House />
                            <p>Lives in {mainMemberData?.address1}</p>
                        </div>
                        <div className='perintro'>
                            <Users />
                            <p>Fathers Name is {mainMemberData?.father_name}</p>
                        </div>
                        <div className='perintro'>
                            <Dna />
                            <p>Belongs to {mainMemberData?.gotra}</p>
                        </div>
                        <div className='perintro'>
                            <Heart />
                            <p>{mainMemberData?.marital_status}</p>
                        </div>
                        <div className='perintro'>
                            <ShoppingBag />
                            <p>Works as {mainMemberData?.occupation}</p>
                        </div>

                        <div className='perintro'>
                            <Phone />
                            <p>{mainMemberData?.phone}</p>
                        </div>
                        <div className='editbtndetails' onClick={() => { setEditmydet(true) }}>
                            <SquarePen />
                            <p>Edit Details</p>
                        </div>
                    </div>
                    <div className="personalintroright">
                        <img src={`${import.meta.env.VITE_BACKEND_URL}/public${mainMemberData?.photo}`}/>
                    </div>
                </div>
                <div className="allfamilycontainer">
                    <div className="headertitlecontainer titlepro">
                        <p className='memtits'>Member name</p>
                        <p className='reltitl'>Relation with Family Head</p>
                        <p className='bloodtits'>Blood Group</p>
                        <p className='edutits'>Education</p>
                        <p className='ocutits'>Occupation</p>
                        <p className='contits'>Contact No</p>
                        <p className='edetits'>Edit</p>
                        <p className='edetits'>Delete</p>
                    </div>
                    {familyMemberData.map((item) => {
                        return (

                            <div className="headertitlecontainer">
                                <p className='memtits'>{item.name}</p>
                                <p className='reltitl'>{item.relation}</p>
                                <p className='bloodtits'>{getProperFormatBloodGroup(item.blood_group)}</p>
                                <p className='edutits'>{item.education}</p>
                                <p className='ocutits'>{item.occupation}</p>
                                <p className='contits'>{item.phone}</p>
                                <div className='edetits'>
                                    <span className='edetitsbtn justtits' onClick={() => { setEditfamuser(true); setFamilyMemberID(item.id) }}>Edit</span>
                                </div>
                                <div className='edetits'>
                                    <span className='edetitsbtn' onClick={() => { setFamdel(true); setFamilyMemberID(item.id) }} >Delete</span>
                                </div>
                            </div>
                        )
                    })}

                </div>
                <AddFamilyUser adfams={adfams} setAdfams={setAdfams} />
                <EditMyDetails editmydet={editmydet} setEditmydet={setEditmydet} />
                <FamilyDeletePopup famdel={famdel} setFamdel={setFamdel} familyMemberID={familyMemberID} />
                <EditFamDetailsPop editfamuser={editfamuser} setEditfamuser={setEditfamuser} familyMemberID={familyMemberID} />
            </div>
        </>
    )
}

export default HomePage