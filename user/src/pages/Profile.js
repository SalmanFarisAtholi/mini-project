import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from '../axios/axios'
import { login } from '../redux/user';
import { useDispatch } from 'react-redux';

import { Button,Modal,Form } from 'react-bootstrap';
import swal from 'sweetalert';

function Profile() {
    const [show, setShow] = useState(false)
    let [username, setUsername] = useState('')
    let [email, setEmail] =useState('')
    let [image, setImage] = useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch(login)
    const {setLoginStatus}= useContext(AppContext)
    const user = useSelector((state)=>state.user.value)
    const handleClose = () =>setShow(false)
    const handleShow =()=> setShow(true)
    const toBase64 = image => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    }).catch((err)=>{
      console.log(err)
    })
    const editHandler =async (e)=>{
        e.preventDefault();
       
        const imgBase = await toBase64(image)
        axios.post('/user_edit',{
            username:username || user.username,
            email:email || user.email,
            image:imgBase
           
        },{
            headers:{"x-access-token":localStorage.getItem("token")}
        }).then((response)=>{
        
            if(response.data.status==='failed'){
                setLoginStatus(false);
                swal('session expired pease login')
                
               
            }else{
              console.log(response.data.result)
              dispatch(login(response.data.result))
              handleClose();
               
            }
        })
       
    }
    useEffect(()=>{
      user && setEmail(user.email)
      user && setUsername(user.username)
    },[user])
    
  return (
    <div className='center'>
        <div className="card">
    <div className="img">
      <img src={user.image?user.image:''} alt='img' />
    </div>
    <div className="infos">
      <div className="name">
        <h2>{user.username}</h2>
        <h4>{user.email}</h4>
      </div>
      <div className="links">
        <button onClick={()=>navigate('/')} className="follow">Back</button>
        <button className="view" onClick={handleShow}>Edit Profile</button>
      </div>
    </div>
  </div>
  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Form onSubmit={editHandler}>
        <Modal.Body>
        <img src={image ? URL.createObjectURL(image) : user.image}
          alt="Posts" 
          width="200px"
          height="200px" 
           >

           </img>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>upload profile</Form.Label>
              
              <Form.Control
                type="file"
                accept="image/*"
    
    
                onChange={(e)=>setImage(e.target.files[0])}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>

              <Form.Control
                type="text"
                placeholder="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="john@example.com"
                value={ email  }
                onChange={(e)=>setEmail(e.target.value)}
                autoFocus
              />
            </Form.Group>
           
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type='submit' variant="primary" >
            Save Changes
          </Button>
         
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default Profile