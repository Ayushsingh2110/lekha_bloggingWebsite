import React, { useState } from 'react'
import logo from '../imgs/logo.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [SearchBarVisible, setSearchBarVisible] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} className="flex-none w-10" />
      </Link>
      
      <div className={`absolute left-0 top-full mt-0.5 w-full border-b border-grey py-4 px-[5vw] 
      md:block md:relative md:border-0 md:inset-0 md:p-0 md:w-auto md:show ${SearchBarVisible ? `show` : `hide`}`
      }>
        <input
          placeholder="Search"
          className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey text-xl tracking-wide md:pl-[20%]"
        />
 
        <i className="fi fi-rr-search absolute right-[10%] md:left-5 md:pointer-events-none top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
      </div>

      <div className="flex items-center ml-auto">
        <button className="md:hidden bg-grey w-12 h-12 rounded-full
        flex items-center justify-center">
          <i className="fi fi-rr-search" onClick={() => setSearchBarVisible(current => !current)}></i>
        </button>
      </div>

      <Link to="/editor" className="hidden md:flex gap-2 link">
        <i class="fi fi-rr-file-edit"></i>
        <p>Write</p>
      </Link>

      <Link className="btn-dark py-2" to="/signin">Sign In</Link>
      <Link className="hidden md:block btn-light py-2" to="/signup">Sign Up</Link>
    </nav>
  );
}

export default Navbar

