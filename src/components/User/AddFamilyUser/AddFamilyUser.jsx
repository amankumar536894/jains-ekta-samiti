import React, {useState} from 'react'
import '../../admin/AddMemberPopup/AddMemberPopup.css'
import './AddFamilyUser.css'
import { X } from 'lucide-react'
import axios from 'axios'   

const AddFamilyUser = ({ adfams, setAdfams }) => {
    const main_member_id = localStorage.getItem('main_member_id')
    const [formdata, setFormdata] = useState({
        name: "",
        gender: "",
        relation: "",
        blood_group: "",
        education: "",
        occupation: "",
        phone: "",
        age: "",
        email: "",
        main_member_id: main_member_id
    })

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
                    Authorization: `Bearer ${localStorage.getItem('token_user')}`
                }
            });
            if (response.data.success) {
                alert("Family member added successfully")
                console.log(response.data.data)
                setAdfams(false);
                setFormdata({
                    name: "",
                    gender: "",
                    relation: "",
                    blood_group: "",
                    education: "",
                    occupation: "",
                    phone: "",
                    age: "",
                    email: "",
                    main_member_id: main_member_id
                })
            }
        } catch (error) {
            alert("Failed to add family member")
            console.log(error);
        }
    }

    return (
        <>
            <div className={`AddFamilyUser ${adfams ? 'AddFamilyUseractive' : ''}`} onClick={() => { setAdfams(false) }}>
                <div className="AddFamilyUsermain" onClick={(e) => { e.stopPropagation() }}>
                    <X className='adfmcut' onClick={() => { setAdfams(false) }} />
                    <div className="addmemfulldiv">
                        <div className="addmemhalfdiv">
                            <p>Name of family Member</p>
                            <input type="text" placeholder='Enter Name of family Member' name='name' onChange={handleFormChange} />
                        </div>
                        <div className="addmemhalfdiv">
                            <p>Gender</p>
                            <select className='admemselect' name='gender' onChange={handleFormChange}>
                                <option value="">--Select Gender--</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="addmemfulldiv">
                        <div className="addmemhalfdiv">
                            <p>Relation with Family Head</p>
                            <select className='admemselect' name='relation' onChange={handleFormChange}>
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
                            <select className='admemselect' name='blood_group' onChange={handleFormChange}>
                                <option value="">--Select Blood Group--</option>
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
                            <input type="text" placeholder='Education' name='education' onChange={handleFormChange} />
                        </div>
                        <div className="addmemhalfdiv">
                            <p>Occupation</p>
                            <input type="text" placeholder='Occupation' name='occupation' onChange={handleFormChange} />
                        </div>
                    </div>

                    <div className="addmemfulldiv">
                        <div className="addmemhalfdiv">
                            <p>Contact Number</p>
                            <input type="text" placeholder='Contact Number' name='phone' onChange={handleFormChange} />
                        </div>
                        <div className="addmemhalfdiv">
                            <p>Age</p>
                            <input type="text" placeholder='Enter Age' name='age' onChange={handleFormChange} />
                        </div>
                    </div>

                    <div className="addmemfulldiv">
                        <div className="addmemhalfdiv">
                            <p>Email *</p>
                            <input type="text" placeholder='Enter Email' name='email' onChange={handleFormChange} />
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

export default AddFamilyUser
