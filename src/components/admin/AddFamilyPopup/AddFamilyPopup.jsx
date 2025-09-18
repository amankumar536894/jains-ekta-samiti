import React from 'react'
import '../AddMemberPopup/AddMemberPopup.css'
import './AddFamilyPopup.css'
import { Phone, X } from 'lucide-react'
import axios from 'axios'
import { useEffect, useState } from 'react'


const AddFamilyPopup = ({ addfamilypopup, setAddfamilypopup, userId, onFamilyAdded }) => {
    const [formdata, setFormdata] = useState({
        name: "",
        gender: "",
        relation: "",
        blood_group: "",
        education: "",
        occupation: "",
        phone: "",
        age: "",
        main_member_id: userId
    })

    useEffect(() => {
        if (userId) {
            console.log("User ID updated:", userId);
            setFormdata((prev) => ({
                ...prev,
                main_member_id: userId,
            }));
        }
    }, [userId]);

    const handleFormChange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/family-members`, formdata, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token_admin')}`
                }
            });
            if (response.data.success) {
                alert("Family member added successfully")
                console.log(response.data.data)
                setAddfamilypopup(false);
                onFamilyAdded?.(response.data.data);
                setFormdata({
                    name: "",
                    gender: "",
                    relation: "",
                    blood_group: "",
                    education: "",
                    occupation: "",
                    phone: "",
                    age: "",
                    main_member_id: userId
                })
            }
        } catch (error) {
            alert("Failed to add family member")
            console.log(error);
        }
    }
    return (
        <>
            <div className={`addfamilypopup ${addfamilypopup ? 'addfamilypopup-active' : ''}`} onClick={() => { setAddfamilypopup(false) }}>
                <div className="addmemberpopupmain" onClick={(e) => { e.stopPropagation() }}>
                    <X className='admecutmark' onClick={() => { setAddfamilypopup(false) }} />
                    <div className="addmemfulldiv">
                        <div className="addmemhalfdiv">
                            <p>Name of family Member *</p>
                            <input type="text" placeholder='Enter Name of family Member' name='name' value={formdata.name} onChange={handleFormChange} />
                        </div>
                        <div className="addmemhalfdiv">
                            <p>Gender</p>
                            <select className='admemselect' name='gender' value={formdata.gender} onChange={handleFormChange}>
                                <option value="">--Select Gender--</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="addmemfulldiv">
                        <div className="addmemhalfdiv">
                            <p>Relation with Family Head *</p>
                            <select className='admemselect' name='relation' value={formdata.relation} onChange={handleFormChange}>
                                <option value="">--Select Relation--</option>
                                <option value="Wife">Wife</option>
                                <option value="Sister">Sister</option>
                                <option value="Brother">Brother</option>
                                <option value="Daughter">Daughter</option>
                                <option value="Son">Son</option>
                                <option value="Son_in_Law">Son-in-law</option>
                                <option value="Daughter_in_Law">Daughter-in-law</option>
                                <option value="Grand_Son">Grand Son</option>
                                <option value="Grand_Daughter">Grand Daughter</option>
                                <option value="Father">Father</option>
                                <option value="Mother">Mother</option>
                            </select>
                        </div>
                        <div className="addmemhalfdiv">
                            <p>Blood Group</p>
                            <select className='admemselect' name='blood_group' value={formdata.blood_group} onChange={handleFormChange}>
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
                            <input type="text" placeholder='Education' name='education' value={formdata.education} onChange={handleFormChange} />
                        </div>
                        <div className="addmemhalfdiv">
                            <p>Occupation</p>
                            <input type="text" placeholder='Occupation' name='occupation' value={formdata.occupation} onChange={handleFormChange} />
                        </div>
                    </div>

                    <div className="addmemfulldiv">
                        <div className="addmemhalfdiv">
                            <p>Contact Number</p>
                            <input type="text" placeholder='Contact Number' name='phone' value={formdata.phone} onChange={handleFormChange} />
                        </div>
                        <div className="addmemhalfdiv">
                            <p>Age</p>
                            <input type="text" placeholder='Enter Age' name='age' value={formdata.age} onChange={handleFormChange} />
                        </div>
                    </div>
                    <div className="addmemfulldiv">
                        <div className="addmemhalfdiv">
                            <p>Email *</p>
                            <input type="email" placeholder='Email' name='email' value={formdata.email} onChange={handleFormChange} />
                        </div>
                    </div>


                    <div className="addnowmembtn" onClick={handleSubmit}>
                        <p>Add Family Member</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddFamilyPopup
