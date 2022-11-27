import React from "react";
// import './CreateForm.less';
import './CreateForm.css';

export default function CreateForm() {
    return (
        <>
        <form className="CreateForm">
            <h2>Добавить задачу</h2>
            <div>
                <input type="text" placeholder="Название задачи" name="taskTitle"/>
            </div>
            <div>
                <textarea name="taskDescription" placeholder="Описание задачи"/>
            </div>
            <div>
                <button type="button" className="blackBtn">Добавить</button>
            </div>
        </form>
        <div className="overlay"></div>
        </>
    );
};