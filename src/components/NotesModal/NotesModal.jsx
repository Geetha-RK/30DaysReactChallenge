import React, { useState, useEffect } from "react";
import "./NotesModal.scss";

const NotesModal = ({ isOpen, onClose, onSubmit, note }) => {

    console.log(note);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");

  
  useEffect(() => {
    if (isOpen) {
      if (note) { 
        setNoteTitle(note.title || ""); 
        setNoteText(note.notes || ""); 
      } else {
        setNoteTitle("");
        setNoteText("");
      }
    }
  }, [note, isOpen]);

  const handleSubmit = () => {
    if (noteTitle.trim() && noteText.trim()) {
      onSubmit({ title: noteTitle, notes: noteText });
      setNoteTitle("");
      setNoteText("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">{note ? "Edit Note" : "Add a New Note" }</h2> 
        <input
          className="modal__input"
          type="text"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder="Note Title"
        />
        <textarea
          className="modal__textarea"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write your note here..."
          rows="4"
        />
        <div className="modal__actions">
          <button className="modal__button" onClick={handleSubmit}>
            {note ? "Update" : "Add Note"} 
          </button>
          <button className="modal__button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesModal;
