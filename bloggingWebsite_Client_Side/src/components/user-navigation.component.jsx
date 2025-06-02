import React, { useContext } from 'react'
import AnimationWrapper from "../common/page-animation.jsx";
import { UserContext } from '../App.jsx';
import { removeFromSession } from '../common/session.jsx';
import { Link } from "react-router-dom";

const UserNavigationPanel = () => {

  const { UserAuth : { username }, setUserAuth} = useContext(UserContext);
  function userLogout(){
    removeFromSession("user");
    setUserAuth({ access_token : null });
  }
  return (
    <AnimationWrapper
    className="absolute right-0 z-50"
    transition={{ duration: 0.2 }}
    >
      <div className="bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200">
        <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
        <i className="fi fi-rr-file-edit"></i>
        <p>write</p>
        </Link>

        <Link to={`/user/${username}`} className="pl-8 py-4 link">
        Profile
        </Link>
        <Link to="/user/dashboard/blogs" className="pl-8 py-4 link">
        Dashboard
        </Link>
        <Link to="/settings/edit-profile" className="pl-8 py-4 link">
        Settings
        </Link>
        
        <span className="absolute border-t w-[100%] border-grey"></span>

        <button className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
        onClick={userLogout}
        >
          <h1 className="font-bold text-xl mg-1">
            Logout
          </h1>
          <p className="text-dark-grey">@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  )
}

export default UserNavigationPanel;