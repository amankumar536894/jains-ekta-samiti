import React from 'react'
import '../AddMemberPopup/AddMemberPopup.css'
import './EditMemberPopup.css'
import { X } from 'lucide-react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const EditMemberPopup = ({ editmemberpopup, setEditmemberpopup, userId }) => {
    const [formdata, setFormdata] = useState({
        head_name: "",
        father_name: "",
        gotra: "",
        address1: "",
        business_address: "",
        education: "",
        occupation: "",
        phone: "",
        email: "",
        gender: "",
        marital_status: "",
        blood_group: "",
    })
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormdata({
            ...formdata,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token_admin");
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/main-members/${userId}`,
                formdata,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                alert("Member updated successfully ✅");
                setEditmemberpopup(false);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to update member ❌");
        }
    };
    useEffect(() => {
        const fetchMemberDetail = async () => {
            try {
                const token = localStorage.getItem('token_admin');
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/main-members/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if (response.data.success) {
                    setFormdata(response.data.member);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchMemberDetail();
    }, [userId]);
    return (
        <>
            <div className={`editmemberpopup ${editmemberpopup ? 'editmemberpopup-active' : ''}`} onClick={() => { setEditmemberpopup(false) }}>
                <div className="editmemberpopupmain" onClick={(e) => { e.stopPropagation() }}>
                    <X className='admecutmark' onClick={() => { setEditmemberpopup(false) }} />
                    <div className="addmemfulldiv">
                        <div className="addmemhalfdiv">
                            <p>Name of the Head of the Family</p>
                            <input type="text" name="head_name" placeholder='Enter Name of the Head of the Family' value={formdata.head_name} onChange={handleFormChange} />
                        </div>
                        <div className="addmemhalfdiv">
                            <p>Gender</p>
                            <select className='admemselect' name="gender" value={formdata.gender} onChange={handleFormChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="addmemfulldiv">
                        <div className="addmemhalfdiv">
                            <p>Marital Status</p>
                            <select className='admemselect' name="marital_status" value={formdata.marital_status} onChange={handleFormChange}>
                                <option value="">-- Marital Status --</option>
                                <option value="Married">Married</option>
                                <option value="Unmarried">Unmarried</option>
                                <option value="Widowed">Widowed</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Renounced">Renounced</option>
                            </select>
                        </div>
                        <div className="addmemhalfdiv">
                            <p>Father name</p>
                            <input type="text" name="father_name" placeholder='Father Name' value={formdata.father_name} onChange={handleFormChange} />
                        </div>
                    </div>

                    <div className="addmemfulldiv">
                        <div className="addmemhalfdiv">
                            <p>Gotra</p>
                            <input type="text" name="gotra" placeholder='Gotra' value={formdata.gotra} onChange={handleFormChange} />
                        </div>
                        <div className="addmemhalfdiv">
                            <p>Address</p>
                            <input type="text" name="address1" placeholder='Address' value={formdata.address1} onChange={handleFormChange} />
                        </div>
                    </div>


                    <div className="addmemfulldiv">
                        <div className="addmemhalfdiv">
                            <p>Occupation</p>
                            <input type="text" name="occupation" placeholder='Occupation' value={formdata.occupation} onChange={handleFormChange} />
                        </div>
                        <div className="addmemhalfdiv">
                            <p>Occupation Address</p>
                            <input type="text" name="business_address" placeholder='Occupation Address' value={formdata.business_address} onChange={handleFormChange} />
                        </div>
                    </div>

                    <div className="addmemfulldiv">
                        <div className="addmemhalfdiv">
                            <p>Education</p>
                            <input type="text" name="education" placeholder='Education' value={formdata.education} onChange={handleFormChange} />
                        </div>
                        <div className="addmemhalfdiv">
                            <p>Blood Group</p>
                            <select className='admemselect' name="blood_group" value={formdata.blood_group} onChange={handleFormChange}>
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
                            <p>Contact Number</p>
                            <input type="text" name="phone" placeholder='Contact Number' value={formdata.phone} onChange={handleFormChange} />
                        </div>
                        <div className="addmemhalfdiv">
                            <p>Email</p>
                            <input type="text" name="email" placeholder='Email' value={formdata.email} onChange={handleFormChange} />
                        </div>
                    </div>

                    <div className="addnowmembtn" onClick={handleSubmit}>
                        <p>Update Member Detail</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditMemberPopup
