import React, { useState } from 'react';
import { Todo, TodoStatus, TodoImportance } from '../types/Todo';

interface ProfilePageProps {
  todos: Todo[];
}

// Типы сортировки
enum SortType {
  CATEGORY = 'category',
  DATE = 'date',
  IMPORTANCE = 'importance',
  ALPHABETICAL = 'alphabetical'
}

const ProfilePage: React.FC<ProfilePageProps> = ({ todos }) => {
  const [sortType, setSortType] = useState<SortType>(SortType.DATE);
  
  // Статистика
  const completedTasks = todos.filter(t => t.status === TodoStatus.COMPLETED).length;
  const cancelledTasks = todos.filter(t => t.status === TodoStatus.CANCELLED).length;
  const activeTasks = todos.filter(t => t.status === TodoStatus.ACTIVE).length;
  
  // Сортировка задач
  const getSortedTodos = (): Todo[] => {
    return [...todos].sort((a, b) => {
      switch (sortType) {
        case SortType.CATEGORY:
          return a.category.localeCompare(b.category);
        case SortType.DATE:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case SortType.IMPORTANCE:
          const importanceOrder = { 
            [TodoImportance.HIGH]: 0, 
            [TodoImportance.MEDIUM]: 1, 
            [TodoImportance.LOW]: 2 
          };
          return importanceOrder[a.importance] - importanceOrder[b.importance];
        case SortType.ALPHABETICAL:
          return a.text.localeCompare(b.text);
        default:
          return 0;
      }
    });
  };
  
  const sortedTodos = getSortedTodos();
  
  return (
    <div className="space-y-8">
      <h2 className="heading-lg">Профиль пользователя</h2>
      
      {/* Аватар и базовая информация */}
      <div className="card">
        <div className="p-8 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-3xl font-normal mb-4">
            U
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-1">Пользователь</h3>
          <p className="text-secondary">Управление задачами</p>
        </div>
      </div>
      
      {/* Статистика */}
      <div className="card">
        <div className="card-content">
          <h3 className="heading-md mb-5">Статистика</h3>
          
          <div className="responsive-grid">
            <div className="bg-gray-50 rounded-xl p-5 flex flex-col items-center">
              <div className="text-3xl font-normal text-green-600 mb-1">{completedTasks}</div>
              <div className="text-secondary">Выполненные задачи</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 flex flex-col items-center">
              <div className="text-3xl font-normal text-gray-600 mb-1">{activeTasks}</div>
              <div className="text-secondary">Активные задачи</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 flex flex-col items-center">
              <div className="text-3xl font-normal text-gray-500 mb-1">{cancelledTasks}</div>
              <div className="text-secondary">Отмененные задачи</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Список задач с сортировкой */}
      <div className="card">
        <div className="card-content">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
            <h3 className="heading-md mb-2 sm:mb-0">История задач</h3>
            
            <div className="flex items-center w-full sm:w-auto">
              <span className="text-secondary mr-2">Сортировать по:</span>
              <select 
                value={sortType} 
                onChange={(e) => setSortType(e.target.value as SortType)}
                className="select text-sm w-full sm:w-auto"
              >
                <option value={SortType.DATE}>Дате</option>
                <option value={SortType.CATEGORY}>Категории</option>
                <option value={SortType.IMPORTANCE}>Важности</option>
                <option value={SortType.ALPHABETICAL}>Алфавиту</option>
              </select>
            </div>
          </div>
          
          <ul className="divide-y divide-gray-100">
            {sortedTodos.map(todo => (
              <li key={todo.id} className="py-4">
                <div className="flex items-start">
                  <div 
                    className={`w-2 h-2 mt-2 mr-3 rounded-full ${
                      todo.status === TodoStatus.COMPLETED 
                        ? 'bg-green-400' 
                        : todo.status === TodoStatus.CANCELLED 
                          ? 'bg-gray-400' 
                          : 'bg-gray-500'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-base ${todo.status === TodoStatus.COMPLETED ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                      {todo.text}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="tag text-gray-600">
                        {todo.category}
                      </span>
                      <span className="tag text-gray-600">
                        {new Date(todo.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`tag ${
                        todo.importance === TodoImportance.HIGH 
                          ? 'bg-gray-200 text-gray-700' 
                          : todo.importance === TodoImportance.MEDIUM 
                            ? 'bg-gray-100 text-gray-600' 
                            : 'bg-gray-50 text-gray-500'
                      }`}>
                        {todo.importance === TodoImportance.HIGH 
                          ? 'Высокий' 
                          : todo.importance === TodoImportance.MEDIUM 
                            ? 'Средний' 
                            : 'Низкий'} приоритет
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 