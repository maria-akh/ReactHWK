import React, { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setTodoInput(e.target.value);
    setError('');
  };

  const handleAddTodo = () => {
    if (todoInput.trim() === '') {
      setError(<span style={{ fontWeight: 'bold' }}>No item has been entered.</span>);
      return;
    }

    if (todoInput.length > 255) {
      setError(<span style={{ fontWeight: 'bold' }}>Input has exceeded the 255 character limit. Please try again.</span>);
      return;
    }

    if (todos.includes(todoInput)) {
      setError(<span style={{ fontWeight: 'bold' }}>This item already exists in the list.</span>);
      return;
    }

    setTodos([...todos, todoInput]);
    setTodoInput('');
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="container mx-auto mt-8 text-center" style={{ backgroundColor: 'pink' }}>
      <h1 className="text-3xl font-bold mb-4">To Do List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={todoInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter an item to add to the To Do List"
          className="px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
          style={{ width: '300px' }}
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
        >
          Add
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className="flex justify-between items-center py-4">
            <span className="flex-grow text-center">{todo}</span>
            <button
              onClick={() => handleDeleteTodo(index)}
              className="text-red-600"
              style={{ marginLeft: '10px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;




