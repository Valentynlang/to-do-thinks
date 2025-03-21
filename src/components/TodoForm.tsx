import React, { useState, useEffect, useRef } from 'react';
import { TodoFormProps } from '../types/components';
import { TodoImportance } from '../types/Todo';

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd, categories, suggestCategory, onAddCategory }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [importance, setImportance] = useState<TodoImportance>(TodoImportance.MEDIUM);
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const [showImportanceSelect, setShowImportanceSelect] = useState(false);
  const [suggestedCategory, setSuggestedCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  
  const categoryRef = useRef<HTMLDivElement>(null);
  const importanceRef = useRef<HTMLDivElement>(null);

  // Закрыть выпадающие меню при клике вне них
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategorySelect(false);
      }
      if (importanceRef.current && !importanceRef.current.contains(event.target as Node)) {
        setShowImportanceSelect(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      // Оставляем выбранную категорию для удобства добавления нескольких задач одной категории
      // setCategory('');
      setImportance(TodoImportance.MEDIUM);
      // Не закрываем меню после добавления
      // setShowCategorySelect(false);
      setShowImportanceSelect(false);
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

  // Обработчик добавления новой категории
  const handleAddNewCategory = () => {
    const trimmedName = newCategoryName.trim();
    if (trimmedName !== '' && !categories.includes(trimmedName)) {
      // Проверка на пустую строку и дубликаты
      
        // Вызываем функцию для добавления новой категории из родительского компонента
        if (onAddCategory && onAddCategory(trimmedName)) {
          // Если категория успешно добавлена, устанавливаем её как выбранную
          setCategory(trimmedName);
          
          // Сбрасываем состояние
          setNewCategoryName('');
          setShowNewCategoryInput(false);
        }
      
    }
  };

  const handleSelectCategory = (cat: string) => {
    setCategory(cat);
    // Не закрываем меню после выбора
    // setShowCategorySelect(false);
  };

  return (
    <form className="bg-white rounded-lg mb-6" onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Что нужно сделать?"
          className="input flex-1"
          autoFocus
        />

        <div className="flex flex-row gap-2">
          <button 
            type="submit" 
            className="btn-primary flex-1 sm:flex-none"
          >
            Добавить
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-3">
        <div ref={categoryRef} className="relative flex-1">
          <button 
            type="button" 
            className="btn-secondary whitespace-nowrap w-full"
            onClick={() => {
              setShowCategorySelect(!showCategorySelect);
              setShowImportanceSelect(false);
            }}
          >
            {category || suggestedCategory || 'Выберите категорию'} {showCategorySelect ? '▲' : '▼'}
          </button>
          
          {showCategorySelect && (
            <div className="absolute top-full left-0 right-0 mt-1 p-4 bg-gray-50 rounded-lg border border-gray-100 flex flex-col gap-2 z-10 max-h-72 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`px-3 py-2 text-sm text-left rounded border ${
                      category === cat 
                        ? 'bg-green-600 text-white border-green-600' 
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                    onClick={() => handleSelectCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              {!showNewCategoryInput ? (
                <div className="flex justify-between mt-2">
                  <button
                    type="button"
                    className="px-3 py-1.5 text-sm rounded bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                    onClick={() => {
                      setCategory('');
                    }}
                  >
                    Сбросить
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 text-sm rounded bg-white text-green-600 border border-green-200 hover:bg-green-50"
                    onClick={() => setShowNewCategoryInput(true)}
                  >
                    + Новая категория
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Название категории"
                    className="input flex-1 text-sm py-1.5"
                    autoFocus
                  />
                  <button
                    type="button"
                    className="px-3 py-1.5 text-sm rounded bg-green-600 text-white hover:bg-green-700"
                    onClick={handleAddNewCategory}
                  >
                    Добавить
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 text-sm rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
                    onClick={() => {
                      setNewCategoryName('');
                      setShowNewCategoryInput(false);
                    }}
                  >
                    Отмена
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div ref={importanceRef} className="relative flex-1">
          <button 
            type="button" 
            className="btn-secondary whitespace-nowrap w-full"
            onClick={() => {
              setShowImportanceSelect(!showImportanceSelect);
              setShowCategorySelect(false);
            }}
          >
            {getImportanceText(importance)} {showImportanceSelect ? '▲' : '▼'}
          </button>
          
          {showImportanceSelect && (
            <div className="absolute top-full left-0 right-0 mt-1 p-4 bg-gray-50 rounded-lg border border-gray-100 flex flex-col gap-2 z-10">
              {Object.values(TodoImportance).map((imp) => (
                <button
                  key={imp}
                  type="button"
                  className={`px-3 py-2 text-sm text-left rounded border ${
                    importance === imp 
                      ? `${getImportanceColor(imp)} text-white` 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setImportance(imp);
                    // Не закрываем меню
                    // setShowImportanceSelect(false);
                  }}
                >
                  {getImportanceText(imp)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {suggestedCategory && !category && !showCategorySelect && (
        <div className="mt-3 p-4 bg-gray-50 border border-gray-100 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-600">
          <span>Предлагаемая категория: <strong>{suggestedCategory}</strong></span>
          <button 
            type="button" 
            className="mt-2 sm:mt-0 px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
            onClick={() => setCategory(suggestedCategory)}
          >
            Принять
          </button>
        </div>
      )}
    </form>
  );
}; 