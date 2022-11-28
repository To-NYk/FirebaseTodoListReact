import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import Generate from "./Generate";

export default function Todo({ todo, toggleComplete, handleDelete, handleEdit, }) {

  const [newTitle, setNewTitle] = useState(todo.title);
  const date = new Date(todo.doneAt.toDate()).toLocaleString();
  const expiring = new Date(todo.expiring.toDate());
  const zeroDate = new Date(new Timestamp(0, 0).toDate()).toLocaleString();

  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };



  const handleChange = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };


  return (
    <>
      <div className={expiring > Timestamp.now().toDate() ? 'todoAvailable' : 'todoUnavailable'}
      onClick={toggleClass}>
        <input
          style={{ textDecoration: todo.completed && "line-through"}}
          type="text"
          value={todo.title === "" ? newTitle : todo.title}
          className="list"
          onChange={handleChange} />

        <div className="time">
          {date == zeroDate ? null : `Завершено:  `+ date}
        </div >

        {/* <div className="info_spoiler">
          {todo.info}
        </div> */}

        <div className="button_toggle">
          <button hidden={todo.completed} className="button-complete" onClick={() => toggleComplete(todo)}>
            завершить
          </button>
          <button hidden={todo.completed} className="button-edit" onClick={() => handleEdit(todo, newTitle)}>
            Изменить
          </button>
          <button className="button-delete" onClick={() => handleDelete(todo.id, todo.uuid)}>
            Удалить
          </button>
        </div>

      </div>
      <div
        className={isActive ? 'showFileactive' : 'showFilecollapse'}>
       <span className={expiring < Timestamp.now().toDate() ? 'expired' : 'notexpired'}>
          {expiring < Timestamp.now().toDate() ? "Истекло: " + expiring.toLocaleString() : expiring.toLocaleString()}
        </span>
        
        <span className="info">
          {todo.info== "" ? 'описание' : todo.info}
        </span>
        <Generate name={todo.uuid} />
      </div>
    </>
  );
}