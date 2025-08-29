import React from 'react'
import './UserLoggin.css'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserLoggin = () => {
    const [number, setNumber] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleLoggin = async () => {
        try {
            const data = {
                phone: number,
                password: password,
            }
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/main-members/login`, data)
            if (response.data.success) {
                localStorage.setItem('token_user', response.data.token)
                localStorage.setItem('main_member_id', response.data.member.user_id)
                navigate('/')
            }
        } catch (err) {
            if (err.response.data.success === false) {
                setError(err.response.data.error)
                console.log("Error from backend is: ", err.response.data.error)
            }
        }
    }
    return (
        <>
            {error ? 
            <div style={{width:"100vw", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center", fontSize:"3.2rem"}}>
                {error === "Invalid phone Number" ? (<>
                <div style={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}} >
                    <p style={{color:"red", backgroundColor:"gray", padding:"0.5rem 1rem", borderRadius:"6px"}}>Invalid phone Number</p>
                </div>
                </>)
                : error === "Invalid password" ? (<>
                <div style={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <p style={{color:"red", backgroundColor:"gray", padding:"0.5rem 1rem", borderRadius:"6px"}}>Invalid password please try our default password: abcd1234</p>
                </div>
                </>)
                : null}
            </div> :
                <div className="userloggin">
                    <div className="userlogginmain">
                        <p className='logginpagetitle'>Jain Ekta Samiti</p>
                        <input className='inputtypelog' type='text' value={number} placeholder='Enter number' onChange={(e) => setNumber(e.target.value)} />
                        <input className='inputtypelog' type='password' value={password} placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
                        <p className='forg'>Forget Password ?</p>
                        <p className='logbtnpg' onClick={handleLoggin}>Log In</p>
                    </div>
                </div>
            }
        </>
    )
}

export default UserLoggin
