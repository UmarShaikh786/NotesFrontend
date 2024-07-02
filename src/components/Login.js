// src/Login.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Set the Axios base URL once, outside of the component
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('user-data')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("login")
      const response = await axios.post('/login', {
        email:email,
        password:password,
      });
      console.log(response.data);
      if (response.data.status) {
        localStorage.setItem('user-data', JSON.stringify(response.data.user));
        navigate('/');
      } else {
        toast.error('Invalid Email and Password....');
      }
    } catch (error) {
      console.error('There was an error!', error);
      toast.error('An error occurred while logging in.');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="row w-100">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center">Login</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block mt-3">
                    Submit
                  </button>
                </form>
                <Link to="/register">
                  <span className="d-flex justify-content-center text-primary" style={{ cursor: 'pointer' }}>
                    Don't have an account?
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
