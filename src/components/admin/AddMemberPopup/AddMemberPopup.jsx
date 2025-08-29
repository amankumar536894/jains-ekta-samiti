import React, { useState } from 'react'
import './AddMemberPopup.css'
import { X, ImagePlus } from 'lucide-react'
import axios from 'axios'


const AddMemberPopup = ({ addMemberPopup, setAddMemberPopup }) => {
  const [formdata, setFormdata] = useState({
    head_name: '',
    father_name: '',
    gotra: '',
    address1: '',
    address2: '',
    business_address: '',
    education: '',
    occupation: '',
    marital_status: '',
    phone: '',
    email: '',
    nearest_jinalaya: '',
    gender: 'Male',
    blood_group: '',
  })

  const [file, setfile] = useState(null)
  const [filename, setFilename] = useState('')

  const handleFormChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setfile(f)
      setFilename(f.name);
    }
  };

  const handleSubmit = async () => {
    try {
      // debugger;
      const data = new FormData()
      for (const key in formdata) {
        const value = formdata[key];
        if (value && value.trim() !== "") {
          data.append(key, value);
        } else {
          data.append(key, ""); // OR skip it entirely if backend defaults to null
        }
      }
      console.log("Data is: ", data)
      // debugger;
      if (file) {
        data.append("photo", file);
      }
      const token = localStorage.getItem('token_admin');
      if (data.get("email") === "") {
        alert("Email is required");
        return;
      }
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/main-members`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log("member added", response.data)
      alert("Member added successfully!");
      setAddMemberPopup(false);
    } catch (err) {
      console.error("Error while adding member:", err);
      alert("Failed to add member");
    }
  }

  return (
    <>
      <div className={`addmemberpopup ${addMemberPopup ? 'addmemberpopupactive' : ''}`} onClick={() => setAddMemberPopup(false)}>
        <div className="addmemberpopupmain" onClick={(e) => e.stopPropagation()}>
          <X className='admecutmark' onClick={() => setAddMemberPopup(false)} />
          <div className="addmemfulldiv">
            <div className="addmemhalfdiv">
              <p>Name of the Head of the Family</p>
              <input type="text" name='head_name' placeholder='Enter Name of the Head of the Family' onChange={handleFormChange} />
            </div>
            <div className="addmemhalfdiv">
              <p>Gender</p>
              <select className='admemselect' name='gender' onChange={handleFormChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="addmemfulldiv">
            <div className="addmemhalfdiv">
              <p>Marital Status</p>
              <select className='admemselect' name='marital_status' onChange={handleFormChange}>
                <option value="">-- Select Marital Status --</option>
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
                <option value="Widowed">Widowed</option>
                <option value="Divorced">Divorced</option>
                <option value="Renounced">Renounced</option>
              </select>
            </div>
            <div className="addmemhalfdiv">
              <p>Father name</p>
              <input type="text" name='father_name' placeholder='Father Name' onChange={handleFormChange} />
            </div>
          </div>

          <div className="addmemfulldiv">
            <div className="addmemhalfdiv">
              <p>Gotra</p>
              <input type="text" name='gotra' placeholder='Gotra' onChange={handleFormChange} />
            </div>
            <div className="addmemhalfdiv">
              <p>Address</p>
              <input type="text" name='address1' placeholder='Address' onChange={handleFormChange} />
            </div>
          </div>


          <div className="addmemfulldiv">
            <div className="addmemhalfdiv">
              <p>Occupation</p>
              <input type="text" name='occupation' placeholder='Occupation' onChange={handleFormChange} />
            </div>
            <div className="addmemhalfdiv">
              <p>Occupation Address</p>
              <input type="text" name='business_address' placeholder='Occupation Address' onChange={handleFormChange} />
            </div>
          </div>

          <div className="addmemfulldiv">
            <div className="addmemhalfdiv">
              <p>Education</p>
              <input type="text" name='education' placeholder='Education' onChange={handleFormChange} />
            </div>
            <div className="addmemhalfdiv">
              <p>Blood Group</p>
              <select className='admemselect' name='blood_group' onChange={handleFormChange}>
                <option value="">-- Select Blood Group --</option>
                <option value="A_pos">A+</option>
                <option value="A_neg">A-</option>
                <option value="B_pos">B+</option>
                <option value="B_neg">B-</option>
                <option value="AB_pos">AB+</option>
                <option value="AB_neg">AB-</option>
                <option value="O_pos">O+</option>
                <option value="O_neg">O-</option>
              </select>
            </div>
          </div>

          <div className="addmemfulldiv">
            <div className="addmemhalfdiv">
              <p>Contact Number</p>
              <input type="text" name='phone' placeholder='Contact Number(10 digits on)' onChange={handleFormChange} />
            </div>
            <div className="addmemhalfdiv">
              <p>Email</p>
              <input type="text" name='email' placeholder='Email' onChange={handleFormChange} />
            </div>
          </div>

          <div className="addmemfulldiv">
            <div className="addmemhalfdiv forfwid">
              <p>Choose photo</p>
              <input type="file" id='file' accept="image/png, image/jpeg, image/jpg, image/jfif, image/webp" style={{ display: 'none' }} onChange={handleFileChange} />
              <label htmlFor="file" className='choosephotolabel'>
                <ImagePlus />
                <div>Upload Now</div>
              </label>
              {filename && <p className="filename">Selected: {filename}</p>}
            </div>
          </div>

          <button className="addnowmembtn" onClick={handleSubmit}>
            <p>Add Member</p>
          </button>
        </div>
      </div>
    </>
  )
}

export default AddMemberPopup
