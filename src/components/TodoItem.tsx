import React from 'react';
import { TodoItemProps } from '../types/components';
import { TodoStatus, TodoImportance } from '../types/Todo';

export const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onToggle, 
  onDelete,
  onCancel,
  onChangeImportance 
}) => {
  const getStatusClass = () => {
    switch (todo.status) {
      case TodoStatus.COMPLETED:
        return 'line-through text-gray-400 bg-gray-50';
      case TodoStatus.CANCELLED:
        return 'line-through text-gray-400 bg-gray-100 opacity-70';
      default:
        return '';
    }
  };

  const getImportanceClass = () => {
    switch (todo.importance) {
      case TodoImportance.LOW:
        return 'border-l-4 border-emerald-500';
      case TodoImportance.MEDIUM:
        return 'border-l-4 border-amber-500';
      case TodoImportance.HIGH:
        return 'border-l-4 border-red-500';
      default:
        return '';
    }
  };

  const handleImportanceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const importanceValue = e.target.value;
    let importance: TodoImportance;
    
    switch(importanceValue) {
      case 'low':
        importance = TodoImportance.LOW;
        break;
      case 'medium':
        importance = TodoImportance.MEDIUM;
        break;
      case 'high':
        importance = TodoImportance.HIGH;
        break;
      default:
        importance = TodoImportance.MEDIUM;
    }
    
    onChangeImportance(todo.id, importance);
  };

  return (
    <div 
      className={`flex justify-between items-center p-3 bg-white border-b ${getStatusClass()} ${getImportanceClass()}`} 
      data-id={todo.id}
    >
      <div className="flex items-center flex-1">
        <input 
          type="checkbox" 
          checked={todo.status === TodoStatus.COMPLETED} 
          onChange={() => onToggle(todo.id)} 
          disabled={todo.status === TodoStatus.CANCELLED}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <span className="ml-3 text-gray-700">{todo.text}</span>
        <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{todo.category}</span>
      </div>
      <div className="flex items-center gap-2">
        <select 
          value={todo.importance} 
          onChange={handleImportanceChange}
          disabled={todo.status === TodoStatus.CANCELLED}
          className="text-sm border border-gray-300 rounded p-1"
        >
          <option value={TodoImportance.LOW}>Низкая</option>
          <option value={TodoImportance.MEDIUM}>Средняя</option>
          <option value={TodoImportance.HIGH}>Высокая</option>
        </select>
        
        {todo.status !== TodoStatus.COMPLETED && todo.status !== TodoStatus.CANCELLED && (
          <button 
            className="text-gray-500 hover:bg-gray-100 p-1 rounded" 
            onClick={() => onCancel(todo.id)}
            title="Отменить задачу"
          >
            ✕
          </button>
        )}
        
        <button 
          className="text-red-500 hover:bg-red-50 p-1 rounded" 
          onClick={() => onDelete(todo.id)}
          title="Удалить задачу"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}; 