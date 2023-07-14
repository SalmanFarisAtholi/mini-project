import React, { useContext, useState } from 'react'
import './AdminLogin.css'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios/axios'
import swal from 'sweetalert'
import { adminlogin} from '../../redux/admin';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { AppContext } from '../../context/AppContext'


function AdminLogin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {adminLoginStatus,setAdminLoginStatus} = useContext(AppContext)
    const dispatch = useDispatch(adminlogin)
    const admin = useSelector((state)=>state.admin.value)


    const loginHandler = (e)=>{
       
        e.preventDefault();

    
        axios.post('/admin',{email,password}).then((response)=>{
            console.log(admin)
            if(!response.data.auth){
                swal(response.data.message)
            }else{
                dispatch(adminlogin(response.data))
                localStorage.setItem("admintoken",response.data.token)
                swal('success',response.data.message,'success')
                
                setAdminLoginStatus(true)
                
                
            }
        }).catch((err)=>{
            swal('sorry',err.message,'error')
        })
       
    }
 
  return (
    <div><div className="wrappers">
    <div className="containers">
      <div className="col-right">
        <div style={{paddingLeft:'9rem'}} className="login-form">
          <h2 style={{textAlign:'center'}}>Admin Login</h2>
          <form onSubmit={loginHandler}>
            <p>
              <label style={{color:'black'}}>Username or email address<span>*</span></label>
              <input
               type="email"
               value={email}
               onChange={(e)=>setEmail(e.target.value)}
               placeholder="Email" required />
            </p>
            <p>
              <label style={{color:'black'}}>Password<span>*</span></label>
              <input
               type="password"
               value={password}
               onChange={(e)=>setPassword(e.target.value)}
               placeholder="Password"
               required />
            </p>
            <p>
              <input type="submit" value="Sign In" />
            </p>
            {/* <p>
              <a href="">Forget Password?</a>
            </p> */}
          </form>
        </div>
      </div>
    </div>
  
  </div>
  </div>
  )
}

export default AdminLogin