import React, { useState } from 'react';
import { Todo } from '../types/todo';
import { Trash2, Edit2, X, Save } from 'lucide-react';
import Checkbox from './Checkbox';

interface TodoItemProps {
  todo: Todo;
  index: number;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  onDragStart: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLLIElement>) => void;
  onDrop: (e: React.DragEvent<HTMLLIElement>) => void;
  darkMode: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  onDelete,
  onToggle,
  onEdit,
  onDragStart,
  onDragOver,
  onDrop,
  darkMode
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEditSubmit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText);
    }
    setIsEditing(false);
  };

  return (
    <li
      className={`
        group relative rounded-lg transition-all list-none
        ${todo.completed 
          ? darkMode ? 'bg-[#1e2030]' : 'bg-gray-50'
          : darkMode ? 'bg-[#1b1f2e]' : 'bg-white'
        }
        ${darkMode 
          ? 'border-gray-800 hover:border-blue-500' 
          : 'border-gray-200 hover:border-blue-300'
        }
        border shadow-sm hover:shadow
      `}
      draggable
      data-index={index}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="p-4 flex items-center gap-4">
        <Checkbox 
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          darkMode={darkMode}
        />
        
        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 px-3 py-1 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleEditSubmit}
                className="p-1 text-green-600 hover:text-green-700 rounded-full hover:bg-green-50 transition-colors"
              >
                <Save size={18} />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 text-red-600 hover:text-red-700 rounded-full hover:bg-red-50 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ) : (
          <span className={`
            flex-1 transition-all 
            ${todo.completed 
              ? darkMode 
                ? 'text-gray-500 line-through' 
                : 'text-gray-500 line-through'
              : darkMode 
                ? 'text-gray-200' 
                : 'text-gray-800'
            }
          `}>
            {todo.text}
          </span>
        )}

        {!isEditing && (
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50 transition-colors"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1 text-red-600 hover:text-red-700 rounded-full hover:bg-red-50 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default TodoItem;