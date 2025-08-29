import React, { useState } from 'react';
import './EditBlogPopup.css';
import { X } from 'lucide-react';

const EditBlogPopup = ({ editpopupon, setEditpopupon }) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');



  const handleSave = () => {
    console.log("Title:", title);
    console.log("Blog Content:", content);
    setEditpopupon(false);
  };

  return (
    <div
      className={`editblogpopup ${editpopupon ? 'editblogpopup-active' : ''}`}
      onClick={() => setEditpopupon(false)}
    >
      <div className="editblogpopupmain" onClick={(e) => e.stopPropagation()}>
        <X className="cutbtn" onClick={() => setEditpopupon(false)} />

        {/* Title Input */}
        <div className="eacheditblog">
          <p>Edit Title</p>
          <input
            className="inputeditfield"
            type="text"
            placeholder="Write title of blog"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Blog Content Editor */}
        <div className="eacheditblog">
          <p>Edit Blog</p>
          <textarea
            className="inputeditfield"
            rows={15}
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <button className="savebtn" onClick={handleSave}>
          Save Blog
        </button>
      </div>
    </div>
  );
};

export default EditBlogPopup;
