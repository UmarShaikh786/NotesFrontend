import React from 'react'
import '../App.css'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div>
    <footer className="footer">
        <div className="container d-flex justify-content-evenly">
            <p className="mb-0">Umar Shaikh</p>
            <p className="mb-0">Contact us: <span className='text-primary'>umarshaikh641@gmail.com</span></p>
            <div>
              
                <Link to="https://github.com/UmarShaikh786" target="_blank" className="text-white mx-2">
                <FaGithub />
                </Link>
                <Link to="https://www.linkedin.com/in/umar-shaikh-a51948243/" target="_blank" className="text-white mx-2"><FaLinkedin />

                </Link>
            </div>  
        </div>
    </footer>
    </div>
  )
}

export default Footer
