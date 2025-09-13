import React from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation.jsx";
import blogBanner from "../imgs/blog banner.png"

const BlogEditor = () => {

  const handleBannerUpload = (e) => {
    let file = e.target.files[0];

    console.log(file);
  }

  const handleTitleKeydown = (e) => {
    if(e.keyCode == 13){
      e.preventDefault();
    }
  }

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
          <div className="mx-auto max-w-[720px] w-full grid justify-center">
            <div className="relative bg-white aspect-video border-4 border-grey">
              <label htmlFor="uploadBanner">
                <img src={blogBanner}/>
                <input id="uploadBanner" type="file" accept=".png, .jpg, .jpeg" hidden
                onChange={handleBannerUpload}
                >
                </input>
              </label>
            </div>

            <textarea
            placeholder="Blog title"
            className="text-2xl font-[500] mt-3 w-full outline-none resize-none leading-tight text-start p-1"
            style={{fontFamily: 'cursive'}}
            onKeyDown={handleTitleKeydown}
            >

            </textarea>

            <textarea
            placeholder="write here..."
            className="p-1 mt-3 w-full outline-none resize-none "
            >

            </textarea>
          </div>
        </section>
      </AnimationWrapper>
      
    </>
  );
};

export default BlogEditor;
