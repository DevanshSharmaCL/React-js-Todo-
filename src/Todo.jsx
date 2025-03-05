import React, { useState } from "react";

const Todo = () => {
    const (todos, setTodos) = useState([]);
    const [inputValue, setInputValue] = useState("");

    const addTodo = () => {
        if(inputValue.trim()===''){
            const newTodo = {
                id:new Date().getTime(),
            }
            setTodos([...todos, newTodo]);
            setInputValue("");
        }
    }


    return (
        <div className="todo-container">
            <h1>To-Do-List</h1>
            <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}></input>
            <button onClick={addTodo}>Add</button>
        </div>

    );
};

export default Todo;
