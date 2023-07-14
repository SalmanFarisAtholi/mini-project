import React, { useContext } from 'react'
import './Home.css'
import {useSelector} from 'react-redux'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'



function Home() {
    const {setLoginStatus}= useContext(AppContext)
    const navigate = useNavigate()
    const logout=()=>{
        localStorage.removeItem('token')
        setLoginStatus(false)
    }   
    const user = useSelector((state)=>state.user.value)
        const monthNames = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]
        const dayNames = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ]
        const date = new Date()
        let sufix = ''
        const hours = ('0' + date.getHours()).slice(-2)
        const minutes = ('0' + date.getMinutes()).slice(-2)
        const day = date.getDate()
        const month = monthNames[date.getMonth()]
        var weekday = dayNames[date.getDay()]
        if (day > 3 && day < 21) sufix = 'th'
        switch (day % 10) {
          case 1:
            sufix = 'st'
            break;
          case 2:
            sufix = 'nd'
            break;
          case 3:
            sufix = 'rd'
            break
          default:
            sufix = 'th'
            
        }
 
  return (
    <div className="logins">
      <div className="login">
        <h1>Hello , {user.username}.</h1>
        <label>Email : </label>
       <label> { user.email}</label>
        <br />
        <br />
        <span className="other"><button onClick={()=>{
            navigate('/profile')

        }} className='profbtn'>Go to Profile</button>  </span>
       
        <span><button onClick={logout} className='logoutbtn'>Logout?</button> </span>
        <div>
        
        </div>
      </div>
      <div id="time" className="time">
       
      {/* It's <span className='hour'>{hours} : {minutes} </span><br/><span className='date'> {month} {day} {sufix} ,{weekday} .</span> */}
      </div>
      <div id="weather"></div>
    </div>
  )
}

export default Home
