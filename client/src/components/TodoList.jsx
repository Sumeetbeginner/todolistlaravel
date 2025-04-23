import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import '../App.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });

  const API_URL = 'http://localhost:8000/api/todos';

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (!newTodo.title) return;
    
    try {
      const response = await axios.post(API_URL, newTodo);
      setTodos([...todos, response.data]);
      setNewTodo({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedTodo);
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Todo List</h1>
      </header>
      
      <form className="todo-form" onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
        <input
          type="text"
          value={newTodo.title}
          onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
          placeholder="Title"
          className="todo-input"
        />
        <input
          type="text"
          value={newTodo.description}
          onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
          placeholder="Description"
          className="todo-input"
        />
        <button type="submit" className="add-button">Add Todo</button>
      </form>
      
      <ul className="todo-list">
        {todos.length > 0 ? (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ))
        ) : (
          <div className="empty-state">
            <p>No todos found. Add one to get started!</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default TodoList;