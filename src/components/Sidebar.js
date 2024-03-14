import "./Sidebar.css"

export const Sidebar= ({notes ,onAddNote ,onDeleteNote ,activeNote ,setActiveNote}) => {
   //chat sorted array by date and time
    const sortedNotes = notes.sort ((a,b) => b.lastModified-a.lastModified)
    return (
        <div className="app-sidebar">
            <div className="app-sidebar-header">
                <h1>Notes</h1>
                <button class="btn btn-primary" onClick={onAddNote}>Add</button>
            </div>
            <div className="app-sidebar-notes" >
                {sortedNotes.map((note) => (
                <div key={note.id}className={`app-sidebar-note ${note.id===activeNote && "active"}`}
                onClick={() =>setActiveNote(note.id)}
                >
                    <div className="sidebar-note-title">
                        <strong>{note.title}</strong>
                        <button class="btn btn-danger" onClick={()=> onDeleteNote(note.id)}>X</button>
                    </div>
                    {/* to hide extra */}
                    <p>{ note.body && note.body.substr(0,100) +"..."}</p>
                    

                    {/* last modied and current date code */}
                    <small className="note-meta">{new Date(note.lastModified).toLocaleDateString("en-GB",{
                       hour:"2-digit",
                       minute:"2-digit"
                    })}</small>
                </div>
                ))}
            </div>
        </div>
     )
}