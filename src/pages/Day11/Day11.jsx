import React, { useState, useEffect } from "react";
import "./Day11.scss";
import { Link } from "react-router-dom";
import NotesModal from "../../components/NotesModal/NotesModal";
import { day11img } from '../../assets';

const Day11 = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([
    {
      title: "Title",
      notes: "Your Notes",
    },
  ]);
  const [editIndex, setEditIndex] = useState(null); 

  // Update date and time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const dateString = currentDate.toLocaleDateString();
  const timeString = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleAddNote = (noteText) => {
    if (editIndex !== null) {
      const updatedNotes = notes.map((note, index) =>
        index === editIndex ? noteText : note
      );
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      setNotes([...notes, noteText]);
    }
    setIsModalOpen(false);
  };

  const handleEditNote = (index) => {
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="notes">
      <div className="todo__box1">
        <p className="todo__title">
          <Link to="/">Back</Link>
        </p>
        <div className="todo__title">Notes Taker</div>
      </div>
      <div className="notes__container">
        <div className="notes__dashboard">
          <div className="notes__box">
            
            <p className="notes__count">{notes.length}</p>
            <p className="notes__count">Total Notes</p>
          </div>
          <div className="notes__box notes__new ">
          
            <button
              className="notes__count notes__button"
              onClick={() => {
                setEditIndex(null);
                setIsModalOpen(true);
              }}
            >
              Add a new Note +
            </button>
          </div>
          <div className="notes__box ">
            
            <p className="notes__count">{dateString}</p>
            <p className="notes__count">{timeString}</p>
          </div>
        </div>
        <hr className="notes__border" />
        <div className="notes__container2">
          {notes.map((note, index) => (
            <div key={index} className="notes__stickey">
              <div className="notes__t1">
                <p className="notes__count">{note.title}</p>
               
                <div>
                  <img
                    className="trash__icon"
                    src={day11img.edit}
                    alt="edit icon"
                    onClick={() => handleEditNote(index)} 
                  />
                  &nbsp;
                  <img
                    className="trash__icon"
                    src={day11img.trash}
                    alt="trash icon"
                    onClick={() => handleDeleteNote(index)}
                  />
                </div>

              </div>
              <hr  />
              <p className="notes__count notes__notestext">{note.notes}</p>
            </div>
          ))}
        </div>
      </div>
      <NotesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddNote}
        note={editIndex !== null ? notes[editIndex] : null}
      />
    </div>
  );
};

export default Day11;
