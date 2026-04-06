import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  // Helper to get token safely
  const getToken = () => localStorage.getItem("token");

  // Get all notes
  const getNotes = async () => {
    try {
      const token = getToken();
      if (!token) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "auth-token": token },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const json = await response.json();
      setNotes(Array.isArray(json) ? json : json.notes || []);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setNotes([]);
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const token = getToken();
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "auth-token": token },
        body: JSON.stringify({ title, description, tag }),
      });
      const note = await response.json();
      if (note && note._id) setNotes((prev) => [...prev, note]);
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const token = getToken();
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "auth-token": token },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const token = getToken();
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "auth-token": token },
        body: JSON.stringify({ title, description, tag }),
      });

      setNotes(notes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      ));
    } catch (error) {
      console.error("Failed to edit note:", error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;