import React from 'react';
import { Todo, TodoStatus, TodoImportance } from '../types/Todo';
import { TodoList } from '../components/TodoList';
import { TodoForm } from '../components/TodoForm';

interface HomePageProps {
  todos: Todo[];
  categories: string[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onCancel: (id: number) => void;
  onReorder: (sourceIndex: number, destinationIndex: number, categoryName: string) => void;
  onChangeCategory: (id: number, newCategory: string) => void;
  onChangeImportance: (id: number, importance: TodoImportance) => void;
  onAdd: (text: string, category: string, importance: TodoImportance) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  todos,
  categories,
  onToggle,
  onDelete,
  onCancel,
  onReorder,
  onChangeCategory,
  onChangeImportance,
  onAdd
}) => {
  // Счетчики для статистики
  const completedCount = todos.filter(t => t.status === TodoStatus.COMPLETED).length;
  const activeCount = todos.filter(t => t.status === TodoStatus.ACTIVE).length;
  const cancelledCount = todos.filter(t => t.status === TodoStatus.CANCELLED).length;
  
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Быстрое добавление</h2>
        <TodoForm 
          onAdd={onAdd} 
          categories={categories} 
        />
      </section>
      
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Все задачи</h2>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-700">Ваши задачи</h3>
              <div className="text-sm text-gray-500">
                Всего: {todos.length} | Выполнено: {completedCount}
              </div>
            </div>
            
            <TodoList 
              todos={todos} 
              categories={categories}
              onToggle={onToggle} 
              onDelete={onDelete}
              onCancel={onCancel}
              onReorder={onReorder}
              onChangeCategory={onChangeCategory}
              onChangeImportance={onChangeImportance}
            />
          </div>
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Быстрая статистика</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-100 flex flex-col items-center">
            <div className="text-3xl font-bold text-green-600">
              {completedCount}
            </div>
            <div className="text-sm text-green-600">Выполненные задачи</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100 flex flex-col items-center">
            <div className="text-3xl font-bold text-yellow-600">
              {activeCount}
            </div>
            <div className="text-sm text-yellow-600">Активные задачи</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-100 flex flex-col items-center">
            <div className="text-3xl font-bold text-red-600">
              {cancelledCount}
            </div>
            <div className="text-sm text-red-600">Отмененные задачи</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 