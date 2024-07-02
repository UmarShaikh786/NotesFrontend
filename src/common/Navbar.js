import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { darkmode } from '../components/TotalNote';

function Navbar() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [checkedDarkMode,setcheckedDarkMode]=useState()
  // const [isDarkMode,setIsDarkMode]=useState(false)
    const dispatch=useDispatch()
    const DarkToggle=useSelector((state)=>state.counter.mode)
    useEffect(()=>{

      const localDark=localStorage.getItem("dark-mode");
      setcheckedDarkMode(localDark)
    },[DarkToggle])
    const DarkModeEnable=()=>{
      if(DarkToggle===false)
        {
          localStorage.setItem("dark-mode",true)
          // setcheckedDarkMode(!checkedDarkMode)
          dispatch(darkmode(true));
        }
        else{
          localStorage.removeItem("dark-mode")
          // setcheckedDarkMode(!checkedDarkMode)

          dispatch(darkmode(false));
        }
    }

  const handleLinkClick = (path) => {
    setActive(path);
    
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MakeNotes</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${active === '/profile' ? 'active' : ''}`} aria-current="page" to="/profile" onClick={() => handleLinkClick('/profile')}>Profile</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${active === '/' ? 'active' : ''}`} to="/" onClick={() => handleLinkClick('/')}>Notes</Link>
            </li>
            
          </ul>
          <div className="form-check form-switch" >
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={checkedDarkMode} onClick={DarkModeEnable} style={{cursor:'pointer'}}/>
            <label className="form-check-label me-4 text-white" htmlFor="flexSwitchCheckDefault">{checkedDarkMode? 'Dark Mode' : 'Light Mode'}</label>

          </div>
         
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
