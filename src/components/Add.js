import React, { useState } from "react";
import { db, storage} from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import '../App.less';
import {ref, uploadBytes } from "firebase/storage";
import {v4} from "uuid";


import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [expiring, setStartDate] = useState(new Date());
  const day = Date.now() / 1000;




  const handleSubmit = async (e) => {
    const Mainid = v4();
    e.preventDefault(); //запрещаею перезагрузку
    if (title !== "") {  //проверка названия
      await addDoc(collection(db, "todos"), { //asytnc не должен прирывать !TODOS название коллекции БД
        uuid: Mainid,
        title, //название
        info,
        completed: false, //тестовое значение
        create: new Timestamp(day.toString().split(".")[0], day.toString().split(".")[1]),
        doneAt: new Timestamp(0, 0),
        expiring,
      });
      setTitle(""); //очищаю инпутs
      setInfo("");
      fileUpload(Mainid);
      setStartDate(new Date());
    }
  };

//загрузка
const [fileZ, setfileUpload] = useState([]);
const fileUpload = (uuid) => {
  if(fileZ == null) return;

  for (let i = 0; i<fileZ.length; i++) {
    const fileRef = ref(storage, `${uuid}/${fileZ[i].name}`);
    uploadBytes(fileRef, fileZ[i]).then(() => {
    })
  }
  alert("загружено");
};



  return (
    <form onSubmit={handleSubmit}>
      <div className="input_">
        <input
          type="text"
          placeholder="Новая задача... "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="описание"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />
        {/* //загрузка */}
        <input type="file" 
        onChange={(e) => setfileUpload(e.target.files)}
        multiple="true"
        />
        
        <DatePicker selected={expiring} dateFormat="yyyy/MM/dd" locale="ru-RU" showTimeInput onChange={(e) => setStartDate(e)} />
        
      </div>
      <div className="button">
        <button >Добавить</button>
      </div>
    </form>
  );
}