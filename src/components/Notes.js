import React, { useEffect, useState } from 'react';
import Navbar from '../common/Navbar';
import NoteForm from './NoteForm';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { incrementByAmount } from './TotalNote';
import book from '../Images/Book.gif';
import { GoTrash, GoPencil, GoBookmarkFill, GoBookmark, GoCopy } from "react-icons/go";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

function Notes() {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  const [showModal, setShowModal] = useState(false);
  const [EditshowModal, setEditShowModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userNotes, setUserNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [savedNotes, setSavedNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editNotes, setEditNotes] = useState();
  const [isSaved, setIsSaved] = useState();
  const [isBtnSaved, setIsBtnSaved] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [addedNote,setAddedNote]=useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const subjects = ["Education", "General", "Religion", "Work", "Others"];
  const modeIsEnable = useSelector((state) => state.counter.mode);

  if (modeIsEnable) {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
  } else {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  }

  useEffect(() => {
    document.getElementById('title').textContent = "Make-Notes " + location.pathname.split("/")[1];

    const storedUserData = localStorage.getItem('user-data');
    if (storedUserData) {
      const userDetail = JSON.parse(storedUserData);
      setUserData(userDetail);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (userData) {
      getData();
    }
  }, [userData,addedNote]);

  useEffect(() => {
    if (userNotes.length > 0) {
      dispatch(incrementByAmount(userNotes.length));
    }
  }, [userNotes, dispatch]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleOpenEditModal = (note) => {
    setEditNotes(note);
    setEditShowModal(true);
  };

  const handleCloseModal = () => {
    setEditShowModal(false);
    setShowModal(false);
  };

  const getData = async () => {
    if (userData && userData._id) {
      try {
        setIsLoading(true);
        const res = await axios.get(`/getnotes/${userData._id}`);
        if (res.data.status) {
          setUserNotes(res.data.noteData);
          setFilteredNotes(res.data.noteData);
          setAddedNote(false)
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
        setIsLoading(false);
      }
    }
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`/deletenote/${id}`);
    if (res.data.status) {
      toast.success("Note Deleted");
      const newNotes = userNotes.filter((note) => note._id !== id);
      setUserNotes(newNotes);
      setFilteredNotes(newNotes);
    } else {
      toast.error("Failed to delete note");
    }
  };

  // const handleSave = async (id) => {
  //   const sameIdNote = userNotes.find((note) => note._id === id);
  //   setIsSaved(sameIdNote._id);
  //   setIsBtnSaved(!isBtnSaved);
  //   if (isBtnSaved === false) {
  //     const saved = "saved";
  //     const res = await axios.put(`/savingnote/${id}`, { saved });
  //     if (res.data.status) {
  //       toast.error("This feature is not working currently...");
  //       setSavedNotes((prev) => [...prev, sameIdNote]);
  //     }
  //   } else {
  //     const res = await axios.put(`/savingnote/${id}`);
  //     if (res.data.status) {
  //       toast.error("This feature is not working currently...");
  //       setSavedNotes((prev) => prev.filter((note) => note._id !== id));
  //     }
  //   }
  // };

  // const saveNotesDetails = () => {
  //   setFilteredNotes(savedNotes);
  // };

  const copyNote = (id) => {
    const sameIdNote = userNotes.find((note) => note._id === id);
    const subject = sameIdNote.subject;
    const note = sameIdNote.note;
    const fullCopyNote = "Subject: " + subject + "\n Note: " + note;
    navigator.clipboard.writeText(fullCopyNote);
    toast.success("Note Copied...");
  };

  const filteredNotesBySubject = (subject) => {
    const filtered = userNotes.filter((note) => note.subject === subject);
    setFilteredNotes(filtered);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    const filtered = userNotes.filter((note) =>
      note.subject.toLowerCase().includes(value.toLowerCase()) ||
      note.note.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  return (
    <>
      <Navbar searchInput={searchInput} setSearchInput={setSearchInput} />
      <div className='container mt-4'>
        <div className='d-flex justify-content-between mb-3'>
          <div className="dropdown">
            <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              Filter Notes
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {subjects.map((subject) => (
                <li key={subject}>
                  <span className="dropdown-item" style={{ cursor: 'pointer' }} onClick={() => filteredNotesBySubject(subject)}>
                    {subject}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <button className='btn btn-success' onClick={handleOpenModal}>Add Note</button>
          {/* <button className='btn btn-success' onClick={saveNotesDetails}>Saved Notes</button> */}
        </div>
        Search <input
          type="text"
          value={searchInput}
          onChange={handleSearch}
          placeholder="Search notes"
          className={`form-control mb-4 ${modeIsEnable ? 'bg-black text-white' : ''}`}
        />
        <ToastContainer />
        {showModal && (
          <NoteForm handleCloseModal={handleCloseModal} userData={userData} setUserNotes={setUserNotes} subjects={subjects} setAddedNote={setAddedNote} />
        )}
        {EditshowModal && (
          <NoteForm handleCloseModal={handleCloseModal} userData={userData} userNotes={editNotes} setUserNotes={setUserNotes} subjects={subjects} setAddedNote={setAddedNote} />
        )}
        {isLoading ? (
          <div className='container d-flex justify-content-center'>
            <img src={book} alt='loading...' className=' ' width={50} height={60} />
          </div>
        ) : (
          <div className='row'>
            {filteredNotes.map((note) => (
              <div className='col-lg-6 mb-3' key={note._id}>
                <div className={`card ${modeIsEnable ? 'bg-black text-white border border-white' : ''}`}>
                  <div className={`card-header d-flex justify-content-between ${modeIsEnable ? 'border border-white' : ''}`}>
                    <span style={{ cursor: 'pointer' }} onClick={() => handleOpenEditModal(note)}><GoPencil color={`${modeIsEnable ? 'white' : 'blue'}`} /></span>
                    <span style={{ cursor: 'pointer' }} onClick={() => handleDelete(note._id)}><GoTrash color={`${modeIsEnable ? 'white' : 'red'}`} /></span>
                  </div>
                  <div className='card-body'>
                    <h5 className='card-title'>{note.subject}</h5>
                    <p className='card-text'>{note.note}</p>
                    <p className='card-text'></p>
                    <div className='d-flex justify-content-between'>
                      {/* <button onClick={() => handleSave(note._id)} className='btn btn-secondary' style={{ cursor: 'pointer' }} name={note._id}>
                        {isSaved === note._id && isBtnSaved && note.saved === true ? <GoBookmarkFill /> : <GoBookmark />}
                      </button> */}
                      <span className='text-success'>Created: {note.createdAt.split("T")[0]}</span>
                      <button className='btn btn-warning' onClick={() => copyNote(note._id)} style={{ cursor: 'pointer' }}><GoCopy /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
      </div>
    </>
  );
}

export default Notes;
