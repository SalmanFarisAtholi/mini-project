import './App.css';
import Signup from './pages/Signup';
import Login from './pages/login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Dashboard from './pages/admin/Dashboard';
import { AppContext } from './context/AppContext';
import { Routes,Route, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from './axios/axios';
import { login } from './redux/user';
import AdminLogin from './pages/admin/AdminLogin';
import { useDispatch } from 'react-redux';
import { adminlogin } from './redux/admin';
import Errorpage from './pages/Errorpage';


function App() {

  const [relogin, setRelogin]=useState(false)
  const [loginStatus, setLoginStatus]=useState(false)
  const [adminLoginStatus, setAdminLoginStatus]=useState(false)
  const dispatch = useDispatch(login)
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get('/isUserAuth',{
     headers:{"x-access-token":localStorage.getItem("token")}
    }).then((response)=>{
      console.log(response.data)
      if(!response.data.auth){
        
        setLoginStatus(false)
        // navigate('/')

      } else{
        setLoginStatus(true)
        dispatch(login(response.data))
      }
    })
  },[loginStatus])



  useEffect(() => {
    axios.get('/admin/isAdminAuth',{
      headers:{"x-access-admintoken":localStorage.getItem("admintoken")}
     }).then((response)=>{
       console.log(response.data)
       if(!response.data.auth){
         
         setAdminLoginStatus(false)

         // navigate('/')
 
       } else{
         setAdminLoginStatus(true)
         dispatch(adminlogin(response.data))
       }
     })
  
  
  }, [adminLoginStatus])
  



  return (
    
    <div>
       <AppContext.Provider value={{
        relogin:relogin,setRelogin:setRelogin,
        loginStatus:loginStatus,
        setLoginStatus:setLoginStatus,
        adminLoginStatus:adminLoginStatus,
        setAdminLoginStatus:setAdminLoginStatus
        }}>
      <Routes>
    {loginStatus && (
      <>
       <Route  path='/home' element={<Home />} ></Route>
       <Route  path='/profile' element={<Profile />} ></Route>
      </>
    )}
        <Route exact path='/' element={!loginStatus?<Signup />:<Home/>} ></Route>
        {!loginStatus &&
        (<Route path='/login' element={<Login />} ></Route>)}
        <Route path='*' element={<Errorpage/>}/>
        <Route  path='/admin' element={!adminLoginStatus?<AdminLogin />:<Dashboard />} ></Route>
       
      </Routes> 
      </AppContext.Provider>
    </div>
  
   
  );
}

export default App;
