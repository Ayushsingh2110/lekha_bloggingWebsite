import React, { useContext } from "react";
import AnimationWrapper from "../common/page-animation.jsx";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import defaultBanner from "../imgs/blog banner.png";
import Tag from "./tags.component.jsx";

const TAG_LIMIT = 10;
const PublishForm = () => {
  let {
    setEditorState,
    blog,
    setBlog,
    blog: { banner, title, des, tags },
  } = useContext(EditorContext);

  const desCharLimit = 200;
  const handleCloseEvent = () => {
    setEditorState("editor");
  };

  const handleBannerError = (e) => {
    const bannerElement = e.target;
    bannerElement.src = defaultBanner;
  };

  const handleTitleChange = (e) => {
    setBlog({ ...blog, title: e.target.value });
  };

  const handleDesChange = (e) => {
    setBlog({ ...blog, des: e.target.value });
  };

  const handleAddingTag = (e) => {
    if (e.keyCode == 13 || e.keyCode == 188) {
      e.preventDefault();

      if(tags.length < 10){
        if (!tags.includes(e.target.value) && e.target.value.length) {
          tags.push(e.target.value);
          setBlog({ ...blog, tags });
        }
      }else{
        toast.error(`You cannot add more than ${TAG_LIMIT} tags`)
      }
      
      e.target.value = "";
    }
  };

  return (
    <AnimationWrapper>
      <section className="relative w-screen min-h-screen grid lg:grid-cols-2 items-center">
        <Toaster />

        <div
          className="w-16 h-16 m-1 absolute top-[3vh] left-[3vw] lg:top-[5vh] lg:left-[5vw] cursor-pointer"
          onClick={handleCloseEvent}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="46"
            height="46"
          >
            <path d="M10,22.03c-.77,0-1.51-.3-2.09-.88L1.18,14.82c-1.57-1.57-1.57-4.09-.02-5.64,0,0,.01-.01,.02-.02L7.93,2.81c.84-.85,2.09-1.1,3.22-.63s1.84,1.52,1.85,2.74v2.06h7.03c2.19,0,3.97,1.8,3.97,4.01v1.98c0,2.21-1.78,4.01-3.97,4.01h-7.03v2.06c0,1.23-.71,2.28-1.85,2.75-.38,.16-.77,.23-1.15,.23ZM2.57,10.61c-.76,.77-.75,2.01,.01,2.78l6.72,6.33c.45,.45,.95,.29,1.09,.24,.14-.06,.61-.3,.61-.9v-3.05c0-.55,.45-1,1-1h8.03c1.09,0,1.97-.9,1.97-2.01v-1.98c0-1.11-.89-2.01-1.97-2.01H12c-.55,0-1-.45-1-1v-3.06c0-.6-.47-.84-.61-.9-.14-.06-.64-.22-1.07,.21L2.57,10.61Z" />
          </svg>
        </div>

        <div className="max-w-[550px] w-full center">
          <p className="">Preview</p>
          <div className="w-full aspect-video overflow-hidden rounded-lg bg-grey mt-4">
            <img src={banner} onError={handleBannerError} alt="banner" />
          </div>

          <h2
            className="text-2xl font-[500] mt-3 w-full outline-none resize-none leading-tight text-start p-1"
            style={{ fontFamily: "cursive", width: "inherit" }}
          >
            {title}
          </h2>

          <p className="w-full line-clamp-2 leading-7 font-gelasio text-xl mt-4">
            {des}
          </p>
        </div>

        <div className="max-w-[550px] w-full">
          <p className="text-dark-grey mb-2 mt-9">Blog title</p>
          <input
            defaultValue={title}
            className="input-box pl-4"
            onChange={handleTitleChange}
          />

          <p className="text-dark-grey mb-2 mt-9">Blog description</p>
          <textarea
            maxLength={desCharLimit}
            defaultValue={des}
            className="input-box pl-4"
            onChange={handleDesChange}
          ></textarea>
          <p className="text-right text-sm text-dark-grey">
            {desCharLimit - des.length} characters left
          </p>

          <p className="mt-4">Add tags to help find your post easily</p>
          <div className="input-box pl-2 py-2 pb-2">
            <input
              className="bg-white p-2 w-full rounded-sm"
              placeholder="#movie, #travel, #food ..."
              onKeyDown={handleAddingTag}
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((t) => {
                return <Tag tag={t} />;
              })}
            </div>
            <p className="text-right">{TAG_LIMIT - tags.length} {TAG_LIMIT - tags.length == 1 ? 'tag' : 'tags'} left</p>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
