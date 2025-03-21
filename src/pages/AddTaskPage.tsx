import React, { useState } from 'react';
import { Todo, TaskClassifier } from '../types/Todo';
import { TodoForm } from '../components/TodoForm';

interface AddTaskPageProps {
  todos: Todo[];
  categories: string[];
  onAdd: (text: string, category: string, importance: any) => void;
  suggestCategory: TaskClassifier;
}

const AddTaskPage: React.FC<AddTaskPageProps> = ({ todos, categories, onAdd, suggestCategory }) => {
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
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Добавить новую задачу</h2>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <TodoForm 
            onAdd={onAdd} 
            categories={categories} 
            suggestCategory={suggestCategory} 
          />
          
          <div className="mt-6">
            <label htmlFor="searchText" className="block text-sm font-medium mb-2 text-gray-700">
              Поиск похожих задач
            </label>
            <input
              id="searchText"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-300 w-full py-2 px-4 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Введите текст для поиска..."
            />
          </div>
          
          {similarTasks.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-medium text-gray-700 mb-2">Похожие задачи:</h3>
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                <ul className="divide-y divide-yellow-200">
                  {similarTasks.map(task => (
                    <li key={task.id} className="py-2">
                      <span className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {task.text}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">({task.category})</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-yellow-600">
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