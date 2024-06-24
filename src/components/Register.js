import React, { useState } from 'react';
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import SetAvatar from './SetAvatar';
import avatar1 from '../Images/avatar1.png'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate=useNavigate()
  axios.defaults.baseURL=process.env.REACT_APP_BASE_URL
  const [formData, setFormData] = useState({
    avatarImage:'',
    name: '',
    email: '',
    password: '',
    confirmpassword:''
  });
  const [eyebutton,setEyebutton]=useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    // Logic to save the selectedAvatar to the database
    if (selectedAvatar) {
      fetch('/api/save-avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatarUrl: selectedAvatar }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          // Additional logic on success, like closing the modal
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission
      if(formData.password!==formData.confirmpassword){
        toast.error("Password and ConfirmPassword should be same")
      }
      else{

        const res= await axios.post('/register', {
          avatarImage:selectedAvatar,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
        console.log(formData);
        if(res.data.status===true)
          {
            toast.success("Registered Success...")
            setTimeout(()=>{
              navigate("/login")
            },2000)
          }
          else if(res.data.status===false)
          {
            toast.error("Email has Already in Database...")
          }
      }
  };

  return (
    <div className="container mt-5">
      <ToastContainer/>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Register</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
              <div className="mb-3 d-flex flex-column align-item-cener justify-content-center gap-3">
               { selectedAvatar && <img src={selectedAvatar?selectedAvatar:''} alt='selectedAvatar' width={80} className='border rounded-circle border-dark'/>}
                  
               <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#setAvatarModal">
        Select Avatar
      </button>
                <SetAvatar selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar}/>
                  
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <div className='d-flex justify-content-between'><label htmlFor="password" className="form-label">Password</label>
                 { eyebutton===false?<span style={{cursor:'pointer'}}><GoEye  onClick={()=>setEyebutton(!eyebutton)}/></span>:<span style={{cursor:'pointer'}}><GoEyeClosed  onClick={()=>setEyebutton(!eyebutton)}/></span>}

                  </div>
                  <input
                    type={`${eyebutton==false?'password':'text'}`}
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
              
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmpassword"
                    name="confirmpassword"
                    value={formData.confirmpassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </form>
              <Link to='/login'><span className='d-flex justify-content-center my-3' style={{cursor:'pointer'}}>Already Registered?</span></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
