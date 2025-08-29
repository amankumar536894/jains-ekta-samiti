import React from 'react'
import './AdminNavbaar.css'
import {LayoutDashboard, Plus, Users, SquarePen, Scroll } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const AdminNavbaar = () => {
  return (
    <>
      <div className="adminNavbaar">
        <p className='logotext'>Jain Ekta Samiti</p>
        <div className="adminnavbox">
            <NavLink to='/dashboard' className="adminnavs">
                <LayoutDashboard className='dashicon' />
                <p>Dashboard</p>
            </NavLink>
            <NavLink to='/add-members' className="adminnavs">
                <Plus className='dashicon' />
                <p>Add Members</p>
            </NavLink>
            <NavLink to='/view-members' className="adminnavs">
                <Users className='dashicon'/>
                <p>View Members</p>
            </NavLink>
            <NavLink to='/blog' className="adminnavs">
                <SquarePen className='dashicon' />
                <p>Blog</p>
            </NavLink>
        </div>
      </div>
    </>
  )
}

export default AdminNavbaar
