import React, { useState, useEffect } from 'react';
import { TodoFormProps } from '../types/components';
import { TodoImportance } from '../types/Todo';

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd, categories, suggestCategory }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [importance, setImportance] = useState<TodoImportance>(TodoImportance.MEDIUM);
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const [suggestedCategory, setSuggestedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (text.trim() && suggestCategory) {
      // Определяем категорию по тексту
      const suggested = suggestCategory(text);
      setSuggestedCategory(suggested);
    } else {
      setSuggestedCategory(null);
    }
  }, [text, suggestCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (text.trim()) {
      // Если пользователь не выбрал категорию, используем предложенную или 'Общее'
      const finalCategory = category || suggestedCategory || 'Общее';
      
      onAdd(text, finalCategory, importance);
      
      // Сбрасываем форму
      setText('');
      setCategory('');
      setImportance(TodoImportance.MEDIUM);
      setShowCategorySelect(false);
    }
  };

  return (
    <form className="bg-white p-4 rounded-lg shadow-sm mb-6" onSubmit={handleSubmit}>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Что нужно сделать?"
          className="flex-1 py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          autoFocus
        />

        <button 
          type="button" 
          className="py-2 px-4 bg-gray-100 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 whitespace-nowrap"
          onClick={() => setShowCategorySelect(!showCategorySelect)}
        >
          {category || suggestedCategory || 'Категория'} ▼
        </button>

        <select
          value={importance}
          onChange={(e) => setImportance(e.target.value as TodoImportance)}
          className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value={TodoImportance.LOW}>Низкая</option>
          <option value={TodoImportance.MEDIUM}>Средняя</option>
          <option value={TodoImportance.HIGH}>Высокая</option>
        </select>

        <button 
          type="submit" 
          className="py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Добавить
        </button>
      </div>

      {showCategorySelect && (
        <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`px-3 py-1 text-sm rounded-md border ${
                category === cat 
                  ? 'bg-indigo-600 text-white border-indigo-600' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => {
                setCategory(cat);
                setShowCategorySelect(false);
              }}
            >
              {cat}
            </button>
          ))}
          <button
            type="button"
            className="px-3 py-1 text-sm rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            onClick={() => {
              setCategory('');
              setShowCategorySelect(false);
            }}
          >
            Сбросить
          </button>
        </div>
      )}

      {suggestedCategory && !category && !showCategorySelect && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md flex justify-between items-center text-sm text-blue-800">
          <span>Предлагаемая категория: <strong>{suggestedCategory}</strong></span>
          <button 
            type="button" 
            className="ml-2 px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700"
            onClick={() => setCategory(suggestedCategory)}
          >
            Принять
          </button>
        </div>
      )}
    </form>
  );
}; 