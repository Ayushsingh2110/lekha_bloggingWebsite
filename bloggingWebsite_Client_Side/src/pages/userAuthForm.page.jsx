import React, { useRef, useContext } from "react";
import { Navigate } from "react-router-dom";
import InputBox from "../components/input.component";
import googleImg from "../imgs/google.png";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import dotenv from "dotenv";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { storeInSession, lookInSession } from "../common/session.jsx";
import { UserContext } from "../App";
import { authWithGoogle } from "../common/firebase";

const UserAuthForm = ({ type }) => {
  const authForm = useRef();
  const emailRegex =
    /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,20}$/;

  let {
    UserAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  async function userAuth(serverRoute, formData) {
    try {
      axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
        .then(({ data }) => {
          storeInSession("user", JSON.stringify(data));

          setUserAuth(data);
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    } catch (err) {
      console.log(err);
    }
  }

  function handleFormSubmit(e) {
    try {
      e.preventDefault();
      let serverRoute = type == "signin" ? "/auth/login" : "/auth/register";

      let form = new FormData(authForm.current);

      let formData = {};

      const { fullname, email, password } = Object.fromEntries(form);

      if (type != "signin") {
        if (fullname && fullname.length < 3) {
          return console.log({
            error: "Fullname at least must be 3 letters long",
          });
        }

        if (!email.length) {
          return console.log({ error: "Enter email." });
        }

        if (!emailRegex.test(email)) {
          return console.log({ error: "Email is not valid." });
        }

        if (!passwordRegex.test(password)) {
          return console.log({
            error:
              "Password must be 6 to 20 characters long with atleast 1 lowercase, 1 uppercase, 1 number and 1 special character.",
          });
        }
      } else {
        if (email.length == 0 || password.length == 0) {
          return toast.error("Please enter login credentials.");
        }
      }

      formData = {
        fullname,
        email,
        password,
      };
      userAuth(serverRoute, formData);
    } catch (err) {
      console.log(err);
    }
  }

  function serverAuthWithGoogle(serverRoute, formData) {
    const requestPath = import.meta.env.VITE_SERVER_DOMAIN + serverRoute;
    axios
      .post(requestPath, formData)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));
        setUserAuth(data);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        console.log("Axios Error in severAuthWithGoogle", err)
      });
  }

  async function handleGoogleLogin(e) {
    e.preventDefault();
    authWithGoogle()
      .then((user) => {
        let formData = {
          access_token: user.accessToken,
        };
        serverAuthWithGoogle("/auth/google", formData);
      })
      .catch((err) => {
        console.log("Error in authWithGoogle", err);
      });
  }

  return access_token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form ref={authForm} className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio text-center capitalize mb-24">
            {type == "signin" ? "Welcome back" : "Join us today"}
          </h1>

          {type != "signin" ? (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full Name"
              icon="fi-rr-user"
            />
          ) : (
            ""
          )}

          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-rr-envelope"
          />

          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-key"
          />

          <button
            className="btn-dark center mt-14"
            type="submit"
            onClick={handleFormSubmit}
          >
            {type == "signin" ? "Sign In" : "Sign Up"}
          </button>

          <div className="relative w-full text-center flex gap-2 mt-5 opacity-20 text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button
            className="btn-light normal-case w-[90%] mx-auto mt-5 transition duration-300 ease-in border border-solid flex gap-2
                justify-center border-transparent hover:bg-transparent hover:border-black"
            onClick={handleGoogleLogin}
          >
            <img src={googleImg} className="w-5" />
            Continue with Google
          </button>

          {type == "signin" ? (
            <p className="mt-6 text-dark-grey text-xla text-center">
              Not joined yet? &nbsp;
              <Link to="/signup" className="underline">
                CLick here to join us today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xla text-center">
              Already a member? &nbsp;
              <Link to="/signin" className="underline">
                Click here to sign in
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};
export default UserAuthForm;
