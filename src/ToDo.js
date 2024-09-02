import React, { useState, useEffect } from 'react';
import './App.css';

const ToDo = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [editingText, setEditingText] = useState('');

    // Load tasks from local storage
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    // Save tasks to local storage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, id: Date.now() }]);
            setNewTask('');
        }
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const startEditing = (id, text) => {
        setEditingTask(id);
        setEditingText(text);
    };

    const editTask = () => {
        setTasks(tasks.map(task => 
            task.id === editingTask ? { ...task, text: editingText } : task
        ));
        setEditingTask(null);
        setEditingText('');
    };

    return (
        <div className="todo-container">
            <h1 className="todo-header">My To-Do List</h1>
            <div className="todo-input">
                <input 
                    type="text" 
                    placeholder="Add a new task" 
                    value={newTask} 
                    onChange={(e) => setNewTask(e.target.value)} 
                />
                <button onClick={addTask}>Add</button>
            </div>
            <ul className="todo-list">
                {tasks.map(task => (
                    <li key={task.id} className="todo-item">
                        {editingTask === task.id ? (
                            <div>
                                <input 
                                    type="text" 
                                    value={editingText} 
                                    onChange={(e) => setEditingText(e.target.value)} 
                                />
                                <button onClick={editTask}>Update</button>
                            </div>
                        ) : (
                            <div>
                                <span>{task.text}</span>
                                <div className="todo-actions">
                                    <button onClick={() => startEditing(task.id, task.text)}>Edit</button>
                                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDo;
