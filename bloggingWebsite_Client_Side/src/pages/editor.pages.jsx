import React, { useState, useContext, useEffect, createContext } from 'react';
import BlogEditor from '../components/blog-editor.component';
import PublishForm from '../components/publish-form.component';

const blogSchema = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  des: "",
  author: {
    personal_info: {}
  }
}

export const EditorContext = createContext();

const Editor = () => {

  
  const [blog, setBlog] = useState(blogSchema);
  const [EditorState, setEditorState] = useState("editor");
  return (
    <>
    <EditorContext.Provider value={{blog, setBlog, EditorState, setEditorState}}>
      {
        EditorState == "editor" ? <BlogEditor /> :
        <PublishForm />
      }
    </EditorContext.Provider>
      
    </>
    
  )
}

export default Editor;