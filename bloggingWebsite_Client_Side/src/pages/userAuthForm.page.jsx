import React from "react";
import InputBox from "../components/input.component";
import googleImg from "../imgs/google.png";
import { Link } from "react-router-dom";

const UserAuthForm = ({ type }) => {
  return (
    <section className="h-cover flex items-center justify-center">
      <form className="w-[80%] max-w-[400px]">
        <h1 className="text-4xl font-gelasio text-center capitalize mb-24">
          {type == "signin" ? "Welcome back" : "Join us today"}
        </h1>

        {type != "signin" ? (
          <InputBox
            name="fullName"
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

        <button className="btn-dark center mt-14" type="submit">
          {type == "signin" ? "Sign In" : "Sign Up"}
        </button>

        <div className="relative w-full text-center flex gap-2 mt-5 opacity-20 text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>or</p>
          <hr className="w-1/2 border-black" />
        </div>

        <button
          className="btn-light normal-case w-[90%] mx-auto mt-5 transition border border-solid flex gap-2
                justify-center border-transparent hover:bg-transparent hover:border-black"
        >
          <img src={googleImg} className="w-5" />
          Continue with Google
        </button>

        {
            type == "signin" ? (
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
            )
        }

      </form>
    </section>
  );
};
export default UserAuthForm;
