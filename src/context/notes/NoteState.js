import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000" 
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

      // Get all Notes
      const getNotes = async() => {
        // TODO : API Call
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          }
        });

        const json = await response.json();
        // console.log(json);
        setNotes(json);
      }


      // Add a Note
      const addNote = async(title, description, tag) => {
        // TODO : API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });

        const note = await response.json();
        setNotes(notes.concat(note));
      }

      // Delete a Note
      const deleteNote = async (id) => {
        // TODO : API Call
        const newNotes = notes.filter((note)=>{return note._id !== id});
        setNotes(newNotes);
        // console.log("Deleting Note with id : "+id);

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify() // body data type must match "Content-Type" header
        });
        const json =  response.json();
        // console.log(json);
      }

      // Edit a Note
      const editNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const json =  await response.json(); // parses JSON response into native JavaScript objects
        // console.log(json);

      let newNotes = JSON.parse(JSON.stringify(notes));
      
      // Logic to edit in Client Server
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
    setNotes(newNotes);
    }
    

    return(
        <NoteContext.Provider value={{notes, getNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;