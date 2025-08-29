import React from 'react'
import './AddBlogPopup.css'
import { X } from 'lucide-react'

const AddBlogPopup = ({popupon, setPopupon}) => {
    return (
        <>
        <div className={`addblogpopup ${popupon ? 'addblogpopup-active' : ''}`} onClick={()=>{setPopupon(false)}}>

            <div className="writeblogsection" onClick={(e)=>{e.stopPropagation()}}>
                <X className='cutmark' onClick={()=>{setPopupon(false)}} />
                <div className='writeblogeverybox'>
                    <p>Write Title</p>
                    <input className='writebloginput' type='text' placeholder='Enter Blog Title' />
                </div>
                <div className='writeblogeverybox'>
                    <p>Write Blog</p>
                    <textarea rows={20} className='writebloginputfull' type='text' placeholder='Enter Blog content' />
                </div>
                <div className='blogsubmitbtn'> Submit</div>
            </div>
        </div>
        </>
    )
}

export default AddBlogPopup
