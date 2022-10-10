import "./Notes.css";

import { useState } from "react";
import api from "../../services/api";

const Notes = ({id, title, notes, priority, deleteNote, handlePririty }) => {

  const [changedNote, setChangedNote] = useState("");
  const [estado, setEstado] = useState("");


  async function handleSave(e, notes){
    if(changedNote && changedNote != notes){
      await api.put(`/contents/${id}`, {
        notes: changedNote,
      })
    }
  }

  return (
    <>
      <li className={priority ? "notepadInfosPriority" : "notepadInfos"}>
        <div>
          <strong>{title}</strong>
          <div className="btnTrash" onClick={(e) => deleteNote(id)}>
            <i className="bi bi-trash-fill"></i>
          </div>
        </div>

        <textarea
          placeholder="Essa é sua anotação"
          defaultValue={notes}
          onChange={(e) => {
            setChangedNote(e.target.value) 
            setEstado("Editando...")}}

          onBlur={e => {
            handleSave(e.target, notes);
            setEstado("");
          }}
        ></textarea>
        <span onClick={(e) => {handlePririty(id)}}><i className="bi bi-exclamation-circle-fill"></i> {estado}</span>
      </li>
    </>
  );
};

export default Notes;
