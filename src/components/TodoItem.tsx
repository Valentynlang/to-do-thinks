import React, { useState, useRef, useEffect } from 'react';
import { TodoItemProps } from '../types/components';
import { TodoStatus, TodoImportance } from '../types/Todo';

export const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onToggle, 
  onDelete,
  onCancel,
  onChangeImportance 
}) => {
  const [showImportanceSelect, setShowImportanceSelect] = useState(false);
  const importanceRef = useRef<HTMLDivElement>(null);

  // Закрыть выпадающее меню при клике вне него
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (importanceRef.current && !importanceRef.current.contains(event.target as Node)) {
        setShowImportanceSelect(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getStatusClass = () => {
    switch (todo.status) {
      case TodoStatus.COMPLETED:
        return 'line-through text-gray-400 bg-gray-50';
      case TodoStatus.CANCELLED:
        return 'line-through text-gray-400 bg-gray-50 opacity-70';
      default:
        return '';
    }
  };

  const getImportanceClass = () => {
    switch (todo.importance) {
      case TodoImportance.LOW:
        return 'border-l-3 border-blue-500';
      case TodoImportance.MEDIUM:
        return 'border-l-3 border-yellow-500';
      case TodoImportance.HIGH:
        return 'border-l-3 border-red-500';
      default:
        return '';
    }
  };

  // Получить текстовое представление важности
  const getImportanceText = (imp: TodoImportance) => {
    switch (imp) {
      case TodoImportance.LOW:
        return 'Низкая';
      case TodoImportance.MEDIUM:
        return 'Средняя';
      case TodoImportance.HIGH:
        return 'Высокая';
      default:
        return 'Средняя';
    }
  };

  // Получить цвет для каждого уровня важности
  const getImportanceColor = (imp: TodoImportance) => {
    switch (imp) {
      case TodoImportance.LOW:
        return 'bg-blue-600 border-blue-600';
      case TodoImportance.MEDIUM:
        return 'bg-yellow-600 border-yellow-600';
      case TodoImportance.HIGH:
        return 'bg-red-600 border-red-600';
      default:
        return 'bg-yellow-600 border-yellow-600';
    }
  };

  const handleImportanceChange = (importance: TodoImportance) => {
    onChangeImportance(todo.id, importance);
    // Не закрываем меню после выбора
    // setShowImportanceSelect(false);
  };

  return (
    <div 
      className={`flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-white border-b border-gray-100 ${getStatusClass()} ${getImportanceClass()}`} 
      data-id={todo.id}
    >
      <div className="flex items-center flex-1 mb-2 sm:mb-0">
        <input 
          type="checkbox" 
          checked={todo.status === TodoStatus.COMPLETED} 
          onChange={() => onToggle(todo.id)} 
          disabled={todo.status === TodoStatus.CANCELLED}
          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
        />
        <span className="ml-3 text-gray-700 truncate">{todo.text}</span>
        <span className="ml-2 text-xs tag">{todo.category}</span>
      </div>
      <div className="flex items-center gap-3 justify-end sm:justify-start">
        <div ref={importanceRef} className="relative">
          <button 
            type="button" 
            className="px-2 py-1.5 text-sm rounded border bg-white hover:bg-gray-50 transition-colors"
            onClick={() => setShowImportanceSelect(!showImportanceSelect)}
            disabled={todo.status === TodoStatus.CANCELLED}
          >
            {getImportanceText(todo.importance)} {showImportanceSelect ? '▲' : '▼'}
          </button>
          
          {showImportanceSelect && (
            <div className="absolute right-0 z-10 mt-1 w-36 p-2 bg-gray-50 rounded-lg border border-gray-100 flex flex-col gap-1">
              {Object.values(TodoImportance).map((imp) => (
                <button
                  key={imp}
                  type="button"
                  className={`px-2 py-1.5 text-sm text-left rounded border ${
                    todo.importance === imp 
                      ? `${getImportanceColor(imp)} text-white` 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => handleImportanceChange(imp)}
                >
                  {getImportanceText(imp)}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {todo.status !== TodoStatus.COMPLETED && todo.status !== TodoStatus.CANCELLED && (
          <button 
            className="btn-icon text-gray-500 hover:bg-gray-50" 
            onClick={() => onCancel(todo.id)}
            title="Отменить задачу"
          >
            ✕
          </button>
        )}
        
        <button 
          className="btn-icon text-gray-400 hover:bg-gray-50 hover:text-gray-600" 
          onClick={() => onDelete(todo.id)}
          title="Удалить задачу"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}; 