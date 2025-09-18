import React from 'react'
import '../../admin/AddMemberPopup/AddMemberPopup.css'
import './EditFamDetailsPop.css'
import { X } from 'lucide-react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const EditFamDetailsPop = ({ editfamuser, setEditfamuser, familyMemberID, onFamilyUpdated }) => {
    const [formdata, setFormdata] = useState({
        name: '',
        gender: '',
        relation: '',
        blood_group: '',
        education: '',
        occupation: '',
        phone: '',
        email: '',
    })
    const [errors, setErrors] = useState('');

    const setFormdataHandler = (e) => {
        const { name, value } = e.target;
        setFormdata({
            ...formdata,
            [name]: value
        });
    };

    const fetchFamilyMemberData = async () => {
        try {
            const token = localStorage.getItem('token_admin');
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/family-members/single/${familyMemberID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setFormdata(response.data.data);
        } catch (error) {
            console.error('Error fetching family member data:', error);
            setErrors(error.message || 'Failed to fetch family member data');
        }
    };

    useEffect(() => {
        if (familyMemberID) {
            fetchFamilyMemberData();
        }
    }, [familyMemberID]);

    const updateFamilyMember = async () => {
        try {
            const token = localStorage.getItem('token_admin');
            console.log(formdata);
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/family-members/${familyMemberID}`,formdata,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            if(response.data.success){
                alert("Family member updated successfully ✅");
                setFormdata(response.data.data);
                setEditfamuser(false);
                onFamilyUpdated?.(response.data.data);
            }
        } catch (error) {
            alert("Failed to update family member ❌");
            console.error('Error fetching family member data:', error);
            setErrors(error.message || 'Failed to fetch family member data');
        }
    };

    return (
        <>
            <div className={`EditFamDetailsPop ${editfamuser ? 'EditFamDetailsPop-active' : ''}`} onClick={() => { setEditfamuser(false) }}>
                <div className="EditFamDetailsPopmain" onClick={(e) => { e.stopPropagation() }}>
                    <X className='editfmusercut' onClick={() => { setEditfamuser(false) }} />
                    <div className="addmemfulldiv">
                        <div className="addmemhalfdiv">
                            <p>Family Member name</p>
                            <input type="text" placeholder='Family Member name' name="name" value={formdata.name} onChange={setFormdataHandler} />
                        </div>
                        <div className="addmemhalfdiv">
                            <p>Gender</p>
                            <select className='admemselect' name="gender" value={formdata.gender} onChange={setFormdataHandler}>
                                <option value="">-- Select Gender --</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="addmemfulldiv">
                        <div className="addmemhalfdiv">
                            <p>Relation with Family Head</p>
                            <select className='admemselect' name="relation" value={formdata.relation} onChange={setFormdataHandler}>
                                <option value="">-- Select Relation --</option>
                                <option value="Son">Son</option>
                                <option value="Daughter">Daughter</option>
                                <option value="Wife">Wife</option>
                                <option value="Sister">Sister</option>
                                <option value="Brother">Brother</option>
                                <option value="Son_in_Law">Son-in-law</option>
                                <option value="Daughter_in_Law">Daughter-in-law</option>
                                <option value="Grand_Son">Grandson</option>
                                <option value="Grand_Daughter">Grand Daughter</option>
                            </select>
                        </div>
                        <div className="addmemhalfdiv">
                            <p>Blood Group</p>
                            <select className='admemselect' name="blood_group" value={formdata.blood_group} onChange={setFormdataHandler}>
                                <option value="">-- Select Blood Group --</option>
                                <option value="A_pos">A+</option>
                                <option value="B_pos">B+</option>
                                <option value="AB_pos">AB+</option>
                                <option value="O_pos">O+</option>
                                <option value="A_neg">A-</option>
                                <option value="B_neg">B-</option>
                                <option value="AB_neg">AB-</option>
                                <option value="O_neg">O-</option>
                            </select>
                        </div>

                    </div>


                    <div className="addmemfulldiv">
                        <div className="addmemhalfdiv">
                            <p>Education</p>
                            <input type="text" placeholder='Education' name="education" value={formdata.education} onChange={setFormdataHandler} />
                        </div>
                        <div className="addmemhalfdiv">
                            <p>Occupation</p>
                            <input type="text" placeholder='Occupation' name="occupation" value={formdata.occupation} onChange={setFormdataHandler} />
                        </div>
                    </div>

                    <div className="addmemfulldiv">
                        <div className="addmemhalfdiv">
                            <p>Contact Number</p>
                            <input type="text" placeholder='Contact Number' name="phone" value={formdata.phone} onChange={setFormdataHandler}/>
                        </div>
                        <div className="addmemhalfdiv">
                            <p>Email</p>
                            <input type="text" placeholder='Email' name="email" value={formdata.email} onChange={setFormdataHandler}/>
                        </div>
                    </div>

                    <div className="addnowmembtn" onClick={updateFamilyMember}>
                        <p>Update Family Detail</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditFamDetailsPop