import React, {useState} from 'react'
import './WriteBlogSection.css'
import "../DashSection/DashSection.css";
import { Menu, Plus  } from 'lucide-react'
import profilepic from "../../../assets/images/profilepic.png";
import AddBlogPopup from '../AddBlogPopup/AddBlogPopup';
import EditBlogPopup from '../EditBlogPopup/EditBlogPopup';

const WriteBlogSection = () => {
    const [popupon, setPopupon] = useState(false)
    const [editpopupon, setEditpopupon] = useState(false)

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
                    <p className="welcometext">View Blogs</p>
                    <div className="addblogbtn" onClick={()=>{setPopupon(true)}}>
                        <Plus size={20} className="rightarrow" />
                        <p>Write Blog</p>
                    </div>
                </div>
                <div className="showallblogsbox">
                    <div className="showperblogstitle forboldblogtitle">
                        <p className='blogtitleheaad'>Title</p>
                        <p className='blogeditdate'>Date</p>
                        <p className='blogeditbtn'>Edit</p>
                        <p className='blogdeletebtn'>Delete</p>
                    </div>                    
                    <div className="showperblogstitle">
                        <p className='blogtitleheaad'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ipsa voluptat....</p>
                        <p className='blogeditdate'>22/12/2001</p>
                        <div className='blogeditbtn'>
                            <span onClick={()=>{setEditpopupon(true)}} className='originaledit'>Edit</span>
                        </div>
                        <div className='blogdeletebtn'>
                            <span className='originaldelete'>Delete</span>
                        </div>
                    </div>
                </div>
                <AddBlogPopup popupon={popupon} setPopupon={setPopupon} />
                <EditBlogPopup editpopupon={editpopupon} setEditpopupon={setEditpopupon} />
            </div>
        </>
    )
}

export default WriteBlogSection
