import React from 'react'
import '../../admin/AddMemberPopup/AddMemberPopup.css'
import './EditMyDetails.css'
import { X, ImagePlus } from 'lucide-react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'



const EditMyDetails = ({ editmydet, setEditmydet }) => {
    const [filename, setFilename] = useState('')
    const [file, setfile] = useState(null)
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

    const handleFileChange = (e) => {
      const f = e.target.files[0];
      if (f) {
        setfile(f)
        setFilename(f.name);
      }
    };
    const main_member_id = localStorage.getItem("main_member_id");
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const data = new FormData()
        // for (const key in formdata) {
        //   const value = formdata[key];
        //   if (value && value.trim() !== "") {
        //     data.append(key, value);
        //   } else {
        //     data.append(key, ""); 
        //   }
        // }

        for (const key in formdata) {
          let value = formdata[key];
        
          // Handle boolean properly (if you have a "status" field or similar)
          if (typeof value === "boolean") {
            data.append(key, value ? "true" : "false"); // or "true"/"false"
            continue;
          }
        
          // Handle string values
          if (typeof value === "string") {
            if (value.trim() !== "") {
              data.append(key, value);
            } else {
              data.append(key, "");
            }
            continue;
          }
        
          // Handle other types (null, undefined, numbers)
          if (value !== undefined && value !== null) {
            data.append(key, String(value));
          } else {
            data.append(key, "");
          }
        }
        
        console.log("Data is: ", data)
        // debugger;
        if (file) {
          data.append("photo", file);
        }
        const token = localStorage.getItem("token_user");
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/main-members/${main_member_id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            },
          }
        );

        if (response.data.success) {
          console.log(response.data.member);
          setFormdata(response.data.member);
          alert("Member updated successfully ✅");
          setEditmydet(false);
        }
      } catch (error) {
        console.error(error);
        alert("Failed to update member ❌");
      }
    };
    useEffect(() => {
      const fetchMemberDetail = async () => {
        try {
          const token = localStorage.getItem('token_user');
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/main-members/${main_member_id}`,
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
    }, [main_member_id]);
    return (
      <>
        <div className={`editmydetails ${editmydet ? 'editmyfetails-active' : ''}`} onClick={() => { setEditmydet(false) }}>
          <div className="editmydetailsmain" onClick={(e) => { e.stopPropagation() }}>
            <X className='admecutmark' onClick={() => { setEditmydet(false) }} />
            <div className="addmemfulldiv">
              <div className="addmemhalfdiv">
                <p>Name of the Head of the Family</p>
                <input type="text" placeholder='Enter Name of the Head of the Family' name='head_name' value={formdata.head_name} onChange={handleFormChange} />
              </div>
              <div className="addmemhalfdiv">
                <p>Gender</p>
                <select className='admemselect' name="gender" value={formdata.gender} onChange={handleFormChange}>
                  <option value="">-- Gender --</option>
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
                <input type="text" placeholder='Father Name' name='father_name' value={formdata.father_name} onChange={handleFormChange} />
              </div>
            </div>

            <div className="addmemfulldiv">
              <div className="addmemhalfdiv">
                <p>Gotra</p>
                <input type="text" placeholder='Gotra' name='gotra' value={formdata.gotra} onChange={handleFormChange} />
              </div>
              <div className="addmemhalfdiv">
                <p>Address</p>
                <input type="text" placeholder='Address' name='address1' value={formdata.address1} onChange={handleFormChange} />
              </div>
            </div>


            <div className="addmemfulldiv">
              <div className="addmemhalfdiv">
                <p>Occupation</p>
                <input type="text" placeholder='Occupation' name='occupation' value={formdata.occupation} onChange={handleFormChange} />
              </div>
              <div className="addmemhalfdiv">
                <p>Occupation Address</p>
                <input type="text" placeholder='Occupation Address' name='business_address' value={formdata.business_address} onChange={handleFormChange} />
              </div>
            </div>

            <div className="addmemfulldiv">
              <div className="addmemhalfdiv">
                <p>Education</p>
                <input type="text" placeholder='Education' name='education' value={formdata.education} onChange={handleFormChange}/>
              </div>
              <div className="addmemhalfdiv">
                <p>Blood Group</p>
                <select className='admemselect' name="blood_group" value={formdata.blood_group} onChange={handleFormChange}>
                  <option value="">-- Blood Group --</option>
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
                <input type="text" placeholder='Contact Number' name='phone' value={formdata.phone} onChange={handleFormChange}/>
              </div>
              <div className="addmemhalfdiv">
                <p>Email</p>
                <input type="text" placeholder='Email' name='email' value={formdata.email} onChange={handleFormChange}/>
              </div>
            </div>
          
            <div className="addmemfulldiv">
            <div className="addmemhalfdiv forfwid">
              <p>Choose photo</p>
              <input type="file" id='file' accept="image/png, image/jpeg, image/jpg, image/jfif, image/webp" style={{ display: 'none' }} onChange={handleFileChange}  />
              <label htmlFor="file" className='choosephotolabel'>
                <ImagePlus />
                <div>Upload Now</div>
              </label>
              {filename && <p className="filename">Selected: {filename}</p>}
            </div>
          </div>

            <div className="addnowmembtn" onClick={handleSubmit}>
              <p>Update Detail</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  export default EditMyDetails
