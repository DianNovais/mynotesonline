// CSS
import "./App.css";

// Components
import Notes from "./components/Notes/Notes";

// Hooks
import { useEffect, useState } from "react";

import api from "./services/api";
import RadioContent from "./components/Radio/Radio";

function App() {
  const [menuActive, setMenuActive] = useState(false);

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [allNotes, setAllNotes] = useState([]);

  const [typed, setTyped] = useState(1);

  const menuOpenAndClose = () => {
    if (menuActive) {
      setMenuActive(false);
    } else {
      setMenuActive(true);
    }
  };

  useEffect(() => {
    GetAllNotes();
  }, []);

  async function GetAllNotes() {
    const request = await api.get("notes");

    setAllNotes(request.data);
  }

  async function handlePririty(id) {
    const altered = await api.put(`/priority/${id}`);

    if (altered) {
      GetAllNotes();
    }
  }

  async function loadPriority(option) {
    const response = await api.get(`/priority?priority=${option}`);

    if (response) {
      setAllNotes(response.data.priorityNotes);
    }
  }

  useEffect(() => {
    function changedNote() {
      if (typed === 1) {
        GetAllNotes();
      }
      if (typed === 2) {
        loadPriority(true);
        console.log("foi");
      }
      if (typed === 3) {
        loadPriority(false);
        console.log("foi");
      }
    }

    changedNote();
  }, [typed]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = await api.post("/notes", {
      title,
      notes,
      priority: false,
    });

    const array = request.data[0];

    setAllNotes([...allNotes, array.annotationCreate]);

    setTitle("");
    setNotes("");
  };

  const deleteNote = async (id) => {
    const request = await api.delete(`/notes/${id}`);

    if (request) {
      setAllNotes(allNotes.filter((note) => note._id != id));
    }
  };

  return (
    <div className="App">
      <div className="asideContainer">
        <aside>
          <strong>Caderno de Notas</strong>
          <form onSubmit={handleSubmit}>
            <div className="inputBlock">
              <label htmlFor="title">Título da anotação</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                maxLength="25"
                required
              />
            </div>
            <div className="inputBlock">
              <label htmlFor="note">Escreva sua anotação</label>
              <textarea
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
                required
              ></textarea>
            </div>
            {title.length > 3 && notes ? (
              <input
                className="btnBookActiv"
                type="submit"
                value="Salvar"
              ></input>
            ) : (
              <input
                className="btnBookDisable"
                type="submit"
                value="Salvar"
                disabled
              ></input>
            )}
          </form>
          <RadioContent setTyped={setTyped} />
        </aside>
      </div>
      <main className={menuActive ? "containerVisible" : "containerHidden"}>
        <ul className="notesContainer">
          {allNotes.map((data) => (
            <div key={data._id}>
              <Notes
                id={data._id}
                title={data.title}
                notes={data.notes}
                priority={data.priority}
                deleteNote={deleteNote}
                handlePririty={handlePririty}
              />
            </div>
          ))}
        </ul>
      </main>
      <button
        onClick={menuOpenAndClose}
        className={menuActive ? "btnOpen" : "btnClosed"}
      >
        <i className="bi bi-arrow-down-circle-fill"></i>
      </button>
    </div>
  );
}

export default App;
