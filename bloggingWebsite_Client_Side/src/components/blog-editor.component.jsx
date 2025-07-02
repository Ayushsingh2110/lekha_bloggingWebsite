import React from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation.jsx";

const BlogEditor = () => {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} />
        </Link>
        <p className="text-black max-sm:hidden">New Blog</p>
        <div className="flex gap-3 ml-auto">
          <button
            className="py-2 px-4 rounded-[2rem] bg-black text-grey 
        hover:scale-110 active:scale-95"
          >
            Publish
          </button>
          <button
            className="py-2 px-4 rounded-[2rem] bg-grey text-black
        hover:scale-110 active:scale-95"
          >
            Save Draft
          </button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <div className="mx-auto">

          </div>
        </section>
      </AnimationWrapper>
      
    </>
  );
};

export default BlogEditor;
