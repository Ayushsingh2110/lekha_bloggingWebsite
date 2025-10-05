import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation.jsx";
import defaultBanner from "../imgs/blog banner.png"
import { EditorContext } from "../pages/editor.pages";
import EditorJS from "@editorjs/editorjs";
import { tool } from "./tools.component";
import { Toaster, toast } from "react-hot-toast";

const BlogEditor = () => {

  let { blog , blog: { title, banner, content, tags, des }, setBlog, 
  textEditor, setTextEditor, EditorState, setEditorState} = useContext(EditorContext);
  
  //later - upload to aws e3
  const handleBannerUpload = (e) => {
    return toast.error("Image upload is not possible right now");
  }

  const handleTitleKeydown = (e) => {
    if(e.keyCode == 13){
      e.preventDefault();
    }
  }

  const handleTitleChange = (e) => {
    setBlog({...blog, title: e.target.value});
  }

  const handleBannerError = (e) => {
    const bannerElement = e.target;
    bannerElement.src = defaultBanner;
  }

  useEffect(() => {
      setTextEditor(new EditorJS({
        holder: "textEditor",
        data: content,
        tools: tool,
        placeholder: "write your mind here...",
      }));
  }, []);

  function handlePublishEvent(){
    if(!title.length){
      return toast.error("Write blog title to publish it.");
    }

    if(textEditor.isReady){
      textEditor.save().then(data => {
        if(data.blocks.length){
            console.log(data);
            setBlog({...blog, content: data});
            setEditorState("publish");
        }else{
          return toast.error("Write something in your blog to publish it.");
        }
      })
    }
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
        onClick={handlePublishEvent}
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
      <Toaster />
      <AnimationWrapper>
        <section>
          
          <div className="mx-auto max-w-[720px] w-[80vw] grid justify-center lg:w-[40vw] md:w-[60vw]">
            <div className="relative bg-white aspect-video border-4 border-grey " style={{width: 'inherit'}}>
              <label htmlFor="uploadBanner">
                <img src={banner} onError={handleBannerError}/>
                <input id="uploadBanner" type="file" accept=".png, .jpg, .jpeg" hidden
                onChange={handleBannerUpload}
                >
                </input>
              </label>
            </div>

            <textarea
            defaultValue={title}
            placeholder="Blog title"
            className="text-2xl font-[500] mt-3 w-full outline-none resize-none leading-tight text-start p-1"
            style={{fontFamily: 'cursive', width: 'inherit'}}
            onKeyDown={handleTitleKeydown}
            onChange={handleTitleChange}
            >
            </textarea>

            <hr className="w-full mb-3 mt-1 border-dark-grey"></hr>

            <div id="textEditor" className="p-1 mt-3" style={{fontFamily: 'cursive', width: 'inherit'}}></div>
          </div>
        </section>
      </AnimationWrapper>
      
    </>
  );
};

export default BlogEditor;
