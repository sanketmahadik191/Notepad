
import { useEffect, useState } from 'react';
import './App.css';
import { Main } from './components/Main';
import { Sidebar } from './components/Sidebar';
import uuid from 'react-uuid';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
   
  // to store notes
   const [notes ,setNotes] = useState(JSON.parse(localStorage.notes) || []);

   const [activeNote ,setActiveNote] = useState (false);

   useEffect( () => {
    localStorage.setItem("notes", JSON.stringify(notes));
   }, [notes] ) ;



   // to add note in sidebar function
   const onAddNote = () => {
     const newNode = 
     {
         id: uuid(),
         title:"Untitled",
         body:"",
         lastModified: Date.now()
     }
    setNotes([newNode,...notes]);
   }

   // to delete particular node with help of id
   const onDeleteNote = (idDelete) => {
    setNotes(notes.filter((note) => note.id !== idDelete));
   }

   const onUpdateNote = (updatedNote) => {
    const updateNotesArray = notes.map ((note) =>{
      if(note.id===activeNote){
        return (
          updatedNote
        )
      }
      return note;
    });
    setNotes(updateNotesArray);
   }
  
   // paas certain node to main
   const getActiveNote = () => {
    return notes.find((note)=> note.id === activeNote);
   }


  return (
    <div className='App'>
      <Sidebar 
        notes={notes} 
        onAddNote={onAddNote} 
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        ></Sidebar>

      <Main activeNote={getActiveNote()}
      onUpdateNote={onUpdateNote}
      />
    </div>
  );
}

export default App;
