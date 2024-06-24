import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function EditProfile({ userData, setUserUpdateData,userUpdateData }) {
  const [editUserData, setEditUserData] = useState({ username: '', email: '' });
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  const modeisEnable = useSelector((state) => state.counter.mode);

  useEffect(() => {
    if (userData) {
      setEditUserData({
        username: userData.name,
        email: userData.email,
      });
    }
  }, [userData]);

  const updateUserProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/edituserdata/${userData._id}`, editUserData);
      // console.log(res.data.updatedUser);
      console.log(res.data.updatedUser)
      setUserUpdateData(res.data.updatedUser);
      // Close the modal programmatically
      document.getElementById("closeModalButton").click();
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEditUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <button type="button" className="btn btn-secondary w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Edit Profile
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className={`modal-header d-flex justify-content-between ${modeisEnable ? 'bg-black' : ''}`}>
              <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
              <button type="button" className={`close ${modeisEnable ? 'bg-black text-white' : ''}`} data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className={`modal-body ${modeisEnable ? 'bg-black' : ''}`}>
              <form onSubmit={updateUserProfile}>
                <div className="form-group">
                  <label htmlFor="username">User Name</label>
                  <input
                    type="text"
                    className={`form-control ${modeisEnable ? 'bg-black text-white' : ''}`}
                    id="username"
                    placeholder="username"
                    name="username"
                    onChange={handleOnChange}
                    value={editUserData.username}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className={`form-control ${modeisEnable ? 'bg-black text-white' : ''}`}
                    id="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleOnChange}
                    value={editUserData.email}
                    required
                  />
                </div>
                <div className={`modal-footer ${modeisEnable ? 'bg-black' : ''}`}>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Save changes</button>
                  {/* Hidden button to close modal programmatically */}
                  <button type="button" id="closeModalButton" className="d-none" data-bs-dismiss="modal"></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
