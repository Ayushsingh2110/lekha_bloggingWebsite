import React, { useState, useContext, useEffect } from 'react';
import BlogEditor from '../components/blog-editor.component';
import PublishForm from '../components/publish-form.component';

const Editor = () => {
  const [EditorState, setEditorState] = useState("editor");
  return (
    <>
      {
        EditorState == "editor" ? <BlogEditor /> :
        <PublishForm />
      }
    </>
    
  )
}

export default Editor