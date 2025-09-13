import React, { useContext } from 'react';
import { UserContext } from '../../App';
import Loader from '../../components/loader.component';
import { Navigate } from "react-router-dom";

const AuthGuardRoute = ({children}) => {
  
  const { UserAuth: {access_token}} = useContext(UserContext);

  if(access_token === undefined || access_token === null) return <Navigate to="/signin" />
  
  return children;
}

export default AuthGuardRoute;