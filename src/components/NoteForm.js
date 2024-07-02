import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function NoteForm({ handleCloseModal, userData, userNotes,setUserNotes,subjects,setAddedNote }) {
  const navigate = useNavigate();
  const DarkToggle=useSelector((state)=>state.counter.mode)
console.log(userNotes)
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  const [notedata, setnotedata] = useState({
    subject: userNotes?.subject || '',
    note: userNotes?.note || ''
  });
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
  const handleOnChange = (e) => {
    setnotedata({ ...notedata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (userNotes && userNotes.subject) {
      // Update code
      const res = await axios.put(`/updatenote/${userNotes._id}`, notedata);
      console.log(res.data);
      setUserNotes(res.data)
      setAddedNote(true)
    } else {
     const res= await axios.post("/addnote", { ...notedata, userId: userData._id });
      setUserNotes(res.data)
      setAddedNote(true)
    }
    navigate("/");
    handleCloseModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog " role="document">
          <div className={`modal-content ${modeisEnable?'bg-black':''}`}>
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title" id="exampleModalLabel">
                {userNotes?.subject ? 'Edit Notes' : 'Add Notes'}
              </h5>
              <button
              style={{color:'white',backgroundColor:'red'}}
                type="button"
                className="close"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                <span aria-hidden="true" >&times;</span>
              </button>
            </div>
            <div className="modal-body ">
              <div className="form-group">
                <label htmlFor="inputState">Subject</label>
                <select
                  id="inputState"
                  className={`w-75 h-50 m-2 ${modeisEnable?'bg-black text-white':''}`}
                  name="subject"
                  onChange={handleOnChange}
                  value={notedata.subject}
                  required
                >
                  <option value="" disabled>
                    {userNotes?.subject || 'Choose..'}
                  </option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Note</label>
                <textarea
                  className={`form-control ${modeisEnable?'bg-black text-white':''}`}
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Write note here.."
                  name="note"
                  value={notedata.note}
                  onChange={handleOnChange}
                  required
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {userNotes?.subject ? 'Update changes' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default NoteForm;
  