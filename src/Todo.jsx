import React, { useState, useEffect } from "react";
import "./Todo.css";

const Todo = () => {
    const [Todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    // Load Todos from localStorage when the component mounts
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    // Save Todos to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(Todos));
    }, [Todos]);

    const addTodo = () => {
        if (inputValue.trim() === '') return;

        const newTodo = {
            id: new Date().getTime(),
            text: inputValue,
        };
        setTodos([...Todos, newTodo]);
        setInputValue("");
    };

    const deleteTodo = (id) => {
        const updatedTodos = Todos.filter((Todo) => Todo.id !== id);
        setTodos(updatedTodos);
    };

    const enterEditMode = (id, text) => {
        setEditMode(true);
        setEditId(id);
        setEditText(text);
    };

    const updateTodo = () => {
        const updatedList = Todos.map((Todo) => {
            if (Todo.id === editId) {
                return { ...Todo, text: editText };
            }
            return Todo;
        });

        setTodos(updatedList);
        setEditMode(false);
        setEditId(null);
        setEditText("");
    };

    return (
        <div className="todo-container">
            <h1>To-Do List</h1>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            {!editMode && <button onClick={addTodo}>Add</button>}

            {editMode && (
                <div>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={updateTodo}>Update</button>
                </div>
            )}

            <ul>
                {Todos.map((Todo) => (
                    <li key={Todo.id}>
                        {Todo.text}
                        <button onClick={() => deleteTodo(Todo.id)}>Delete</button>
                        <button onClick={() => enterEditMode(Todo.id, Todo.text)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
