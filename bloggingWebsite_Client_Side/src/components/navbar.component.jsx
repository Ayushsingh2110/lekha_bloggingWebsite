import React, { useState, useContext, useRef, useEffect } from "react";
import logo from "../imgs/logo.png";
import { Link, Outlet } from "react-router-dom";
import UserNavigationPanel from "../components/user-navigation.component.jsx";
import { UserContext } from "../App";

const Navbar = () => {
  const [SearchBarVisible, setSearchBarVisible] = useState(false);
  const [UserNavPanelVisible, setUserNavPanelVisible] = useState(false);

  const { UserAuth: { access_token, image_url, username }} = useContext(UserContext);

  const profileImgRef = useRef();

  useEffect(() => {
    const handleUserNavToggle = (event) => {
      if(profileImgRef.current && !profileImgRef.current.contains(event.target)){
        setUserNavPanelVisible(false);
      }
    } 

    document.addEventListener("mousedown", handleUserNavToggle);
    return () => {
      document.removeEventListener("mousedown", handleUserNavToggle);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <img src={logo} className="flex-none w-10" />
        </Link>

        <div
          className={`absolute left-0 top-full mt-0.5 w-full border-b border-grey py-4 px-[5vw] 
      md:block md:relative md:border-0 md:inset-0 md:p-0 md:w-auto md:show ${
        SearchBarVisible ? `show` : `hide`
      }`}
        >
          <input
            placeholder="Search"
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey text-xl tracking-wide md:pl-[20%]"
          />

          <i className="fi fi-rr-search absolute right-[10%] md:left-5 md:pointer-events-none top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
        </div>

        <div className="flex items-center ml-auto">
          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full
        flex items-center justify-center"
          >
            <i
              className="fi fi-rr-search"
              onClick={() => setSearchBarVisible((current) => !current)}
            ></i>
          </button>
        </div>

        <Link to="/editor" className="hidden md:flex gap-2 link">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>

        {
          access_token ? 
          <>
            <Link to="/dashboard/notification">
              <button className="w-12 h-12 bg-grey relative hover:bg-black/10">
                <i className="fi fi-rr-bell text-2xl block mt-1">
                </i>
              </button>
            </Link>
            <div className="relative"
                onClick={() => setUserNavPanelVisible(currentVal => !currentVal)}
                ref={profileImgRef}
            >
              <button className="w-12 h-12 mt-1">
                {
                  image_url ? 
                  <img src={image_url} className="w-full h-full object-cover rounded-full"/>
                  :
                  <p className="w-full h-full rounded-full text-center bg-dark-grey text-white text-[2rem]">{username.trim().slice(0, 1).toUpperCase()}</p>
                }
                
              </button>

              {
                UserNavPanelVisible ? <UserNavigationPanel /> : ""
              }
              
            </div>
          </>
          :
          <>
            <Link className="btn-dark py-2" to="/signin">
             Sign In
            </Link>
            <Link className="hidden md:block btn-light py-2" to="/signup">
             Sign Up
            </Link>
          </>
        }
        
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
