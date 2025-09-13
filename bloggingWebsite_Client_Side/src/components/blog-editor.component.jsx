import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation.jsx";
import defaultBanner from "../imgs/blog banner.png"
import { EditorContext } from "../pages/editor.pages";

const BlogEditor = () => {

  const { blog , blog: { title, banner, content, tags, des }, setBlog} = useContext(EditorContext);
  const handleBannerUpload = (e) => {
    let file = e.target.files[0];

    console.log(file);
  }

  const handleTitleKeydown = (e) => {
    if(e.keyCode == 13){
      e.preventDefault();
    }
  }

  const handleTitleChange = (e) => {
    console.log(e)
    setBlog({...blog, title: e.target.value});
  }

  const handleBannerError = (e) => {
    const bannerElement = e.target;
    bannerElement.src = defaultBanner;
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} />
        </Link>
        <p className="text-black max-sm:hidden">
          {title.length > 0 ? title : "New Blog"}
        </p>
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
            <div className="relative bg-white aspect-video border-4 border-grey lg:min-w-[40vw] md:min-w-[60vw] min-w-[80vw]">
              <label htmlFor="uploadBanner">
                <img src={banner} onError={handleBannerError}/>
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
            onChange={handleTitleChange}
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
