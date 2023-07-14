import React, {  useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import AdminContents from '../../components/AdminContents/AdminContents'
import UserDetails from '../../components/AdminContents/UserDetails'

function Dashboard() {
    const [dashContent, setDashContent] = useState(true)
    const [userContent, setUserContent] = useState(false)
    const [users, setUsers] = useState([])
   
  

  return (
    <div>
        <Navbar dash={setDashContent} user={setUserContent} setUsers={setUsers}/>
        {dashContent && <AdminContents />}
        {userContent && <UserDetails users={users} setUsers={setUsers}/>}
  
    </div>
  )
}

export default Dashboard