import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { GoArrowRight, GoArrowLeft, GoSignOut, GoPencil } from "react-icons/go";
import "../App.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import SetAvatar from "./SetAvatar";
import EditProfile from "./EditProfile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { incrementByAmount } from './TotalNote';


function Profile() {
  const count = useSelector((state) => state.counter.value);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [userNotes, setUserNotes] = useState([]);
  const [editAvatar, setEditAvatar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState();
  const [updatedAvatar, setUpdatedAvatar] = useState('');
  const [userUpdateData, setUserUpdateData] = useState();
  const navigate = useNavigate();
  const modeisEnable = useSelector((state) => state.counter.mode);
  const location=useLocation()
  const dispatch=useDispatch()
  useEffect(() => {
    // document.body.title.="new"+location.pathname
    document.getElementById('title').textContent="Make-Notes "+location.pathname.split("/")[1]
    // console.log(location.pathname)
    if (modeisEnable) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
    if (userUpdateData !== undefined) {
      localStorage.setItem("user-data", JSON.stringify(userUpdateData));
      toast.success("Profile Updated..");
    }

    const userDataString = localStorage.getItem("user-data");
    if (userDataString) {
      const userdata = JSON.parse(userDataString);
      setUserData(userdata);
    } else {
      navigate("/login");
    }
  }, [navigate, userUpdateData, modeisEnable]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
 
  useEffect(() => {
    const getData = async () => {
      if (userData && userData._id) {
        try {
          const res = await axios.get(`/getnotes/${userData._id}`);
          if (res.data.status) {
            setUserNotes(res.data.noteData);
            console.log('Fetched notes:', res.data.noteData);
          }
        } catch (error) {
          console.error('Failed to fetch notes:', error);
        }
      }
    };
    getData();
  }, [userData, dispatch]); // Removed userNotes from dependencies

  useEffect(() => {
    console.log('User notes:', userNotes);
    if (userNotes.length > 0) {
      dispatch(incrementByAmount(userNotes.length));
    }
  }, [userNotes, dispatch]);

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-between align-items-center mt-4 px-3">
        <button className="btn btn-secondary d-lg-none" onClick={toggleSidebar}>
          {isOpen ? <GoArrowLeft /> : <GoArrowRight />}
        </button>
      </div>
      <div className="d-flex gap-2 gap-sm-3">
        <div>
          <div
            className={`d-flex flex-column flex-shrink-0 p-3 ${modeisEnable ? 'bg-black' : 'bg-white'} ${isOpen ? "d-block" : "d-none"} d-lg-flex`}
            style={{
              minHeight: "100vh",
              width: "280px",
              transition: "width 0.3s",
            }}
          >
            <div className={`d-flex align-items-center justify-content-between mb-3 mb-md-0 link-dark text-decoration-none ${modeisEnable ? 'bg-black text-white' : ''}`}>
              <span className="fs-4">Profile</span>
              <span
                className="fs-4"
                style={{ cursor: "pointer" }}
                onClick={logout}
              >
                <GoSignOut />
              </span>
            </div>
            <hr />
            {userData && (
              <ul className={`nav nav-pills flex-column mb-auto ${modeisEnable ? 'bg-black text-white' : ''}`}>
                <li className="nav-item d-flex flex-column align-items-center mb-3">
                  <div className="d-flex position-relative">
                    <img
                      src={updatedAvatar ? updatedAvatar.avatar : userData.avatar}
                      alt=""
                      width="82"
                      height="82"
                      className="rounded-circle me-2"
                    />
                    <span className="position-absolute avatar-edit-icon" data-bs-toggle="modal" data-bs-target="#setAvatarModal" style={{cursor:'pointer'}}onClick={() => setEditAvatar(true)}>
                      <GoPencil fill={`${modeisEnable?'white':'black'}`} />
                    </span>
                  </div>
                  <strong>{userData.name}</strong>
                </li>
                <li className="nav-item">
                  <b>Email:</b> {userData.email}
                </li>
                <div className="d-flex justify-content-center my-3">
                  <EditProfile userData={userData} setUserUpdateData={setUserUpdateData} userUpdateData={userUpdateData} />
                </div>
              </ul>
            )}
          </div>
        </div>
        {editAvatar && (
          <SetAvatar
            selectedAvatar={selectedAvatar}
            setSelectedAvatar={setSelectedAvatar}
            editAvatar={editAvatar}
            setEditAvatar={setEditAvatar}
            userData={userData}
            setUpdatedAvatar={setUpdatedAvatar}
          />
        )}
        <ToastContainer />
        <div className="container mt-5">
          <div className="row gap-2">
            <div className="col-md-6 col-lg-4">
              <div className={`card ${modeisEnable ? 'bg-black text-white border border-white' : ''}`} style={{ width: "14rem" }}>
                <div className="card-body firstcard">
                  <h5 className="card-title">Total Notes</h5>
                  <p className="card-text">{count}</p>
                  <Link to="/" className="btn btn-primary">
                    See Notes
                  </Link>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6 col-lg-4">
              <div className={`card ${modeisEnable ? 'bg-black text-white border border-white' : ''}`} style={{ width: "14rem" }}>
                <div className="card-body secondcard">
                  <h5 className="card-title">Saved Notes</h5>
                  <p className="card-text">0</p>
                  <Link to="/" className="btn btn-primary">
                    See Notes
                  </Link>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
