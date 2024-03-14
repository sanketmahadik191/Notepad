import "./Main.css";
import { useState } from 'react';
import ReactMarkdown  from "react-markdown";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Main= ({activeNote ,onUpdateNote}) => {
    
    const [isVisible, setIsVisible] = useState(true);
    const [btnText, setBtnText] = useState("Preview");
  
    const toggleDivs = () => {
      setIsVisible(!isVisible);
      setBtnText(isVisible ? "Edit":"Preview" );
    };

    const onEditField = (key,value)=>{
       onUpdateNote({
        ...activeNote,
        [key]:value,
        lastModified: Date.now()
       })
    };
    
    if(!activeNote)
    return <div className="no-active-note">No note selected</div>;
    return (
     <div className="app-main">
        <button onClick={toggleDivs} type="button" class="btn btn-secondary">{btnText}</button>
       <div  style={{ display: isVisible ? 'block' : 'none' }} className="app-main-note-edit">
          <input 
             type="text" 
             id="title" 
             value={activeNote.title} 
             onChange={(e) => onEditField("title",e.target.value)}
             autoFocus
             />
          <textarea 
              id="body" 
              value={activeNote.body} 
              onChange={(e) => onEditField("body",e.target.value)}
              placeholder="Write note here" 
          />
       </div>
       <div  style={{ display: isVisible ? 'none' : 'block' }} className="app-main-note-preview">
           <h1 className="preview-title">{activeNote.title}</h1>
           <ReactMarkdown className="markdown-preview">{activeNote.body}</ReactMarkdown>
       </div>
     </div>
    )
}
