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
import { useTheme } from './hooks/useTheme';
//del
import { ref, deleteObject, listAll } from "firebase/storage";

function App() {

  const { theme, setTheme } = useTheme();

  const handleLightThemeClick = () => {
    setTheme('light')
  };
  const handleDarkThemeClick = () => {
    setTheme('dark')
  };


  const [todos, setTodos] = useState([]);
  const day = Date.now() / 1000;

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
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed, doneAt: new Timestamp(day.toString().split(".")[0], day.toString().split(".")[1]) });
  };
  const handleDelete = async (id, uuid) => {
    const folderRef = ref(storage, uuid + `/`)
    await deleteDoc(doc(db, "todos", id));
    
    listAll(folderRef).then((response) => {
      console.log(response.items)
      response.items.forEach((item) => { 
        const storageRef = ref(storage, uuid + `/` +item.name);
    // Delete the file
     deleteObject(storageRef).then(() => {
      // File deleted successfully
      console.log("Файлы удалены!");
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
  })})
  };
  return (
    <div className="App">
      <div className="btn-theme">
        <button className="switchbtn" onClick={handleLightThemeClick}>Light</button>
        <button className="switchbtn" onClick={handleDarkThemeClick}>Dark</button>
      </div>
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
