import Navbar from "./components/navbar.component";
import { Routes, Route } from "react-router-dom";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useState, useEffect } from "react";
import { lookInSession } from "./common/session.jsx";
import Editor from "./pages/editor.pages";
import AuthGuardRoute from "./common/route-guards/auth-guard";

export const UserContext = createContext();
const App = () => {

  const [UserAuth, setUserAuth] = useState({ access_token : undefined });

  useEffect(() => {
    const userInSession = lookInSession("user");
    if(userInSession) setUserAuth(JSON.parse(userInSession));
  }, []);
  
  return (
    <UserContext.Provider value={{UserAuth, setUserAuth}}>
      <Routes>
        <Route path="/editor" element={
          <AuthGuardRoute>
            <Editor /> 
          </AuthGuardRoute>
        } 
        />
        <Route path="/" element={<Navbar />}>
          <Route path="/signin" element={<UserAuthForm type="signin" />} />
          <Route path="/signup" element={<UserAuthForm type="signup" />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
