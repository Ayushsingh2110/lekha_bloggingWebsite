import React, { useContext } from 'react'
import { EditorContext } from '../pages/editor.pages';

const Tag = ({tag, key}) => {
  
  let {blog:{tags}, setBlog} = useContext(EditorContext)
  const handleTagDelete = (e) => {
    e.preventDefault();
    tags = tags.filter(t => t != tag)
    setBlog(prev => {return {...prev, tags}});
  }
  return (
    <div className="bg-white py-2 px-4 rounded-full flex items-center">
      {tag}
      <button className="ml-1 inline-flex items-center" onClick={handleTagDelete}> <i className="fi fi-rr-cross-circle inline-flex items-center"></i></button>
    </div>
  )
}

export default Tag;
