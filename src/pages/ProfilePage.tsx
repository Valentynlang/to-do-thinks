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
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Профиль пользователя</h2>
      
      {/* Аватар и базовая информация */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
            {/* Здесь будет аватар, пока просто буква U */}
            U
          </div>
          <h3 className="text-xl font-medium text-gray-800">Пользователь</h3>
          <p className="text-gray-500">Управление задачами</p>
        </div>
      </div>
      
      {/* Статистика */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Статистика</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-100 flex flex-col items-center">
              <div className="text-3xl font-bold text-green-600">{completedTasks}</div>
              <div className="text-sm text-green-600">Выполненные задачи</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100 flex flex-col items-center">
              <div className="text-3xl font-bold text-yellow-600">{activeTasks}</div>
              <div className="text-sm text-yellow-600">Активные задачи</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 border border-red-100 flex flex-col items-center">
              <div className="text-3xl font-bold text-red-600">{cancelledTasks}</div>
              <div className="text-sm text-red-600">Отмененные задачи</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Список задач с сортировкой */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-700">Ваши задачи</h3>
            
            <div className="flex items-center mt-2 sm:mt-0">
              <span className="text-sm text-gray-600 mr-2">Сортировать по:</span>
              <select 
                value={sortType} 
                onChange={(e) => setSortType(e.target.value as SortType)}
                className="border rounded py-1 px-2 text-sm"
              >
                <option value={SortType.DATE}>Дате</option>
                <option value={SortType.CATEGORY}>Категории</option>
                <option value={SortType.IMPORTANCE}>Важности</option>
                <option value={SortType.ALPHABETICAL}>Алфавиту</option>
              </select>
            </div>
          </div>
          
          <ul className="divide-y divide-gray-200">
            {sortedTodos.map(todo => (
              <li key={todo.id} className="py-3">
                <div className="flex items-start">
                  <div 
                    className={`w-2 h-2 mt-2 mr-2 rounded-full ${
                      todo.status === TodoStatus.COMPLETED 
                        ? 'bg-green-500' 
                        : todo.status === TodoStatus.CANCELLED 
                          ? 'bg-red-500' 
                          : 'bg-yellow-500'
                    }`}
                  />
                  <div>
                    <p className={`${todo.status === TodoStatus.COMPLETED ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                      {todo.text}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                        {todo.category}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {new Date(todo.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        todo.importance === TodoImportance.HIGH 
                          ? 'bg-red-100 text-red-800' 
                          : todo.importance === TodoImportance.MEDIUM 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
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