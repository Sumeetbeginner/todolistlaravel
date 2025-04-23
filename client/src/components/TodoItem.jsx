import React, { useState } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({ ...todo });

  const handleUpdate = () => {
    onUpdate(todo.id, editedTodo);
    setIsEditing(false);
  };

  const toggleComplete = () => {
    onUpdate(todo.id, { ...todo, completed: !todo.completed });
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form className="edit-form" onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          <input
            type="text"
            value={editedTodo.title}
            onChange={(e) => setEditedTodo({...editedTodo, title: e.target.value})}
            className="edit-input"
          />
          <input
            type="text"
            value={editedTodo.description}
            onChange={(e) => setEditedTodo({...editedTodo, description: e.target.value})}
            className="edit-input"
          />
          <div className="edit-form-actions">
            <button type="submit" className="save-button">Save</button>
            <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="todo-content-wrapper">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={toggleComplete}
            className="todo-checkbox"
          />
          <div className="todo-content">
            <h3 className="todo-title">{todo.title}</h3>
            {todo.description && <p className="todo-description">{todo.description}</p>}
          </div>
          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
            <button onClick={() => onDelete(todo.id)} className="delete-button">Delete</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;