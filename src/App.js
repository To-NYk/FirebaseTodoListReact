import React, { useState, useEffect } from "react";
// import './App.css'
import Title from "./components/Title";
import Add from "./components/Add";
import Todos from "./components/Todos";
// import CreateForm from "./components/CreateForm";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp
} from "firebase/firestore";
import { db, storage } from "./firebase";
import './App.css';
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";


function App() {

  const [todos, setTodos] = useState([]);

  const day = Date.now()/1000;
  
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed, doneAt: new Timestamp(day.toString().split(".")[0],day.toString().split(".")[1]) });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  return (
    <div className="App">
      <div>
        <Title />
      </div>
      <div>
        <Add />
      </div>

      {/* <CreateForm /> */}
      <div className="todo_container">
        {todos.map((todo) => (
          <>
          <Todos
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
