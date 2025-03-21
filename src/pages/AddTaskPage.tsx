import React, { useState } from 'react';
import { Todo, TaskClassifier, TodoStatus, TodoImportance } from '../types/Todo';
import { TodoForm } from '../components/TodoForm';

interface AddTaskPageProps {
  todos: Todo[];
  categories: string[];
  onAdd: (text: string, category: string, importance: TodoImportance) => void;
  suggestCategory: TaskClassifier;
  onAddCategory?: (newCategory: string) => boolean;
}

const AddTaskPage: React.FC<AddTaskPageProps> = ({ 
  todos, 
  categories, 
  onAdd, 
  suggestCategory,
  onAddCategory 
}) => {
  const [searchText, setSearchText] = useState('');
  
  // Находим похожие задачи на основе введенного текста
  const findSimilarTasks = (text: string): Todo[] => {
    if (!text.trim()) return [];
    
    const lowerText = text.toLowerCase();
    return todos.filter(todo => 
      todo.text.toLowerCase().includes(lowerText) ||
      lowerText.includes(todo.text.toLowerCase())
    ).slice(0, 5); // Показываем максимум 5 похожих задач
  };
  
  const similarTasks = findSimilarTasks(searchText);
  
  return (
    <div className="space-y-8">
      <h2 className="heading-lg">Добавить новую задачу</h2>
      
      <div className="card h-screen">
        <div className="p-6 sm:p-8">
          <TodoForm 
            onAdd={onAdd} 
            categories={categories} 
            suggestCategory={suggestCategory}
            onAddCategory={onAddCategory}
          />
          
          <div className="mt-8">
            <label htmlFor="searchText" className="block text-sm font-medium mb-2 text-gray-600">
              Поиск похожих задач
            </label>
            <input
              id="searchText"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="input w-full bg-gray-50"
              placeholder="Введите текст для поиска..."
            />
          </div>
          
          {similarTasks.length > 0 && (
            <div className="mt-6">
              <h3 className="heading-md mb-3 text-md">Похожие задачи:</h3>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <ul className="divide-y divide-gray-100">
                  {similarTasks.map(task => (
                    <li key={task.id} className="py-3">
                      <div className="flex items-start">
                        <div 
                          className={`w-2 h-2 mt-2 mr-3 rounded-full ${
                            task.status === TodoStatus.COMPLETED 
                              ? 'bg-green-400' 
                              : task.status === TodoStatus.CANCELLED 
                                ? 'bg-gray-400' 
                                : 'bg-gray-500'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <span className={`${task.status === TodoStatus.COMPLETED ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                            {task.text}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">({task.category})</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-gray-500">
                  * Возможно, эти задачи уже существуют в вашем списке
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTaskPage; 