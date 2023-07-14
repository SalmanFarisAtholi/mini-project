import axios from '../../axios/axios'
import React, { useState } from 'react'
import swal from 'sweetalert';
import './userdetails.css'
function UserDetails(props) {
 
  
    const deleteUser=(id)=>{

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.post('/admin/delete_user',{id},{headers:{"x-access-admintoken":localStorage.getItem("admintoken")}}).then((response)=>{
                    console.log(response.data)
                    props.setUsers(response.data.result)
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                      });
                }).catch((err)=>{
                    swal(err.message)
                })
                
           
            } else {
              swal("Your file is safe!");
            }
          });
   
  }
    const [serachTerm,setSearchTerm] = useState('')
  return (
      
    <div className='container-fluid  mt-5' >  
      <input className="search" placeholder="Search....." onChange={(event) => {
        setSearchTerm(event.target.value)}} />
        <span className='text-white'> <h4>User Details </h4></span>
        <table className="table table-light ">
  <thead>
    
    <tr>
      <th scope="col">No</th>
      <th scope="col">Image</th>
      <th scope="col">username</th>
      <th scope="col">email</th>
      <th scope="col">Actions</th>
      
    </tr>
  </thead>
  <tbody>
   
 {
   props.users.filter((val) => {
     if (serachTerm == ''||/^\s*$/.test(serachTerm)) {
       return val
     } else if(val.username.toLowerCase().includes(serachTerm.toLowerCase())){
       return val
     }else if(val.email.toLowerCase().includes(serachTerm.toLowerCase())){
      return val
     } 
   }).map((e,index)=>{
       return (
       <tr key={index}>
      <th scope="row">{index+1}</th>
      <td><img src={e.image} alt="No image"  height='50px'/></td>
      <td>{e.username}</td>
      <td>{e.email}</td>
      <td>
        {/* <button className='btn btn-primary' onClick={()=>{blockUser(e._id)}}>Block</button>  */}
        <button  className="btn btn-danger" onClick={()=>{deleteUser(e._id)}}>Delete</button></td>
    </tr>) 

   })
    
    
}

   
  </tbody>
</table>
    </div>
  )
}

export default UserDetails