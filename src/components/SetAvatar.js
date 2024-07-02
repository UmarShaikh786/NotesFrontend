import axios from 'axios';
import avatar1 from '../Images/avatar1.png';
import avatar2 from '../Images/avatar2.png';
import avatar3 from '../Images/avatar3.png';
import avatar4 from '../Images/avatar4.png';
import avatar5 from '../Images/avatar5.png';
import avatar6 from '../Images/avatar6.png';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function SetAvatar({selectedAvatar,setSelectedAvatar,editAvatar,seteditAvatar,userData,setUpdatedAvatar}) {
  axios.defaults.baseURL=process.env.REACT_APP_BASE_URL

  const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
  const DarkToggle = useSelector((state) => state.counter.mode);

  const [modeisEnable,setmodeisEnable]=useState()

  useEffect(()=>{
    const modeisEnable=localStorage.getItem("dark-mode");
    if(modeisEnable)
      {
        setmodeisEnable(true)
        document.body.style.backgroundColor = "black";
          document.body.style.color = "white";
      }
      else{
        setmodeisEnable(false)
        document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      }
  },[modeisEnable,DarkToggle])
  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
    
  };
const handleUpdate=async()=>{
  const res= await axios.put(`/editAvatar/${userData._id}`,{
    avatarImage:selectedAvatar
  })
  setUpdatedAvatar(res.data.updatedAvatar)
  localStorage.setItem("user-data",JSON.stringify(res.data.updatedAvatar))
  // seteditAvatar(false)
}
  
  return (
    <div className=''>
      

      <div className="modal fade" id="setAvatarModal" tabIndex="-1" role="dialog" aria-labelledby="setAvatarModalLabel" aria-hidden="true">
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className={`modal-header ${modeisEnable?'bg-black':''}`}>
              <h5 className="modal-title" id="exampleModalLabel">Select Avatar</h5>
              <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>
            <div className={`modal-body ${modeisEnable?'bg-black':''}`}>
              {avatarImages.map((avatar, index) => (
                <span key={index} style={{ cursor: 'pointer' }}>
                  <img
                    src={avatar}
                    alt={`avatar-${index}`}
                    className={`w-25 border rounded-circle m-2 ${selectedAvatar === avatar ? 'border-primary' : ''}`}
                    onClick={() => handleAvatarClick(avatar)}
                  />
                </span>
              ))}
            </div>
            <div className={`modal-footer ${modeisEnable?'bg-black':''}`}>
              {editAvatar===true && selectedAvatar?<button type="button" data-bs-dismiss="modal" className="btn btn-primary"onClick={handleUpdate} >Save changes</button>:<span data-bs-dismiss="modal" style={{cursor:'pointer'}}>&times;</span>
              }
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetAvatar;
