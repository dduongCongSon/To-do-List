import React, { useState, useEffect, useRef } from 'react';
import { TodoService } from '../services/TodoService';
import { Todo } from '../types/todo';
import { Search, Plus, Moon, Sun } from 'lucide-react';
import TodoItem from './TodoItem';
import Button from './Button';
import '../styles/Background.css';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const todoService = useRef(new TodoService());

  useEffect(() => {
    setTodos(todoService.current.getTodos());
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos(todoService.current.addTodo(todos, newTodo));
      setNewTodo('');
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    const index = Number(e.currentTarget.dataset.index);
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    const dropIndex = Number(e.currentTarget.dataset.index);
    
    if (draggedItem === null || draggedItem === dropIndex) return;

    const newTodos = [...filteredTodos];
    const [draggedTodo] = newTodos.splice(draggedItem, 1);
    newTodos.splice(dropIndex, 0, draggedTodo);
    
    setTodos(newTodos);
    todoService.current.reorderTodos(newTodos);
    setDraggedItem(null);
  };

  const handleEdit = (id: number, newText: string) => {
    setTodos(todoService.current.editTodo(todos, id, newText));
  };

  const handleDelete = (id: number) => {
    setTodos(todoService.current.deleteTodo(todos, id));
  };

  const handleToggle = (id: number) => {
    setTodos(todoService.current.toggleTodo(todos, id));
  };

  const filteredTodos = todos.filter(todo => 
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-colors duration-200 pattern-background ${
      darkMode ? 'dark' : 'light'
    }`}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Todo List
            </h1>
            <p className={`${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Organize your tasks efficiently
            </p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              darkMode 
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* Add Todo Form */}
        <div className={`mb-6 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-xl shadow-lg p-6`}>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                  : 'bg-gray-50 text-gray-800 border-gray-200'
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <Button
              type="submit"
              icon={<Plus size={20} />}
              text="Add Task"
              darkMode={darkMode}
            />
          </form>
        </div>

        {/* Search Bar */}
        <div className={`relative mb-8 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-xl shadow-lg p-4`}>
          <Search className={`absolute left-6 top-1/2 transform -translate-y-1/2 ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`} size={20} />
          <input
            type="text"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-lg transition-colors ${
              darkMode 
                ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                : 'bg-gray-50 text-gray-800 border-gray-200'
            } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        {/* Todo List */}
        <div className={`${
          darkMode ? 'bg-[#1b1f2e]' : 'bg-white'
        } rounded-xl shadow-lg p-6`}>
          <h2 className={`text-xl font-semibold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Active Tasks ({filteredTodos.length})
          </h2>
          
          <div className="space-y-3">
            {filteredTodos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                darkMode={darkMode}
                onDelete={handleDelete}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            ))}
            
            {filteredTodos.length === 0 && (
              <div className={`text-center py-8 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                No tasks found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;