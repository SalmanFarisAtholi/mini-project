import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppContext } from '../../context/AppContext'
import axios from '../../axios/axios'
function Navbars(props) {  

    
    const admin = useSelector((state)=>state.admin.value)
     const {setAdminLoginStatus} = useContext(AppContext)
    const logout=()=>{
        localStorage.removeItem('admintoken')
        setAdminLoginStatus(false)
    }   
  const showHome =()=>{
    props.dash(true)
    props.user(false)
  }
  const showUser =()=>{
    props.dash(false)
    props.user(true)
    axios.get('/admin/getUsers',{
        headers:{"x-access-admintoken":localStorage.getItem("admintoken")}
      }).then((response)=>{
        props.setUsers(response.data.result)
       
      
      }).catch((error)=>{
        console.log(error)
      })
  
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-prime">
  <a className="navbar-brand ms-2" href="#">Admin</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav" style={{"cursor":"pointer"}}>
      <a className={`nav-item nav-link ${props.dash?'active':''}`} onClick={showHome}>Home <span className="sr-only"></span></a>
      <a className={`nav-item nav-link ${props.user?'active':''}`} onClick={showUser}>Users</a>
      <a className={`nav-item nav-link `} onClick={logout}>Logout</a>
      <a className="nav-item nav-link " onClick={()=>console.log()}>{admin.result.email}</a>
      
    </div>
  </div>
</nav>
  )
}

export default Navbars