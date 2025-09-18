import { X } from 'lucide-react'
import React from 'react'
import './FamilyDeletePopup.css'
import axios from 'axios';


const FamilyDeletePopup = ({famdel, setFamdel, familyMemberID, onFamilyDeleted}) => {
  const deleteFamilyMember = async () => {
    try {
      const token = localStorage.getItem('token_admin');
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/family-members/${familyMemberID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      if (response.data.success) {
        alert("Family member deleted successfully ✅");
        setFamdel(false);
        onFamilyDeleted?.(familyMemberID);
      }
    } catch (error) {
      alert("Failed to delete family member ❌");
      console.error('Error deleting family member:', error);
    }
  };
  return (
    <>
      <div className={`familydeletepopup ${famdel ? 'familydeletepopup-active' : ''}`}  onClick={()=>{setFamdel(false)}}>
        <div className="familydeletepopupmain" onClick={(e)=>{e.stopPropagation()}}>
            <X className='famdcut' onClick={()=>{setFamdel(false)}}/>
            <p className='delpoptext'>Are you sure you want to Delete Family member ?</p>
            <div className='delpopfbtns'>
                <p onClick={()=>{setFamdel(false)}} className='delpopfbtnscancel'>Cancel</p>
                <p onClick={deleteFamilyMember} className='delpopfbtnsdelete'>Delete</p>
            </div>
        </div>
      </div>
    </>
  )
}

export default FamilyDeletePopup
