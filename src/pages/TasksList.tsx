import React from 'react';
import { Todo, TodoStatus, TodoImportance } from '../types/Todo';
import { TodoList } from '../components/TodoList';
import { TodoForm } from '../components/TodoForm';

interface TasksListProps {
  todos: Todo[];
  categories: string[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onCancel: (id: number) => void;
  onReorder: (sourceIndex: number, destinationIndex: number, categoryName: string) => void;
  onChangeCategory: (id: number, newCategory: string) => void;
  onChangeImportance: (id: number, importance: TodoImportance) => void;
  onAdd: (text: string, category: string, importance: TodoImportance) => void;
  onAddCategory?: (newCategory: string) => boolean;
}

const TasksList: React.FC<TasksListProps> = ({
  todos,
  categories,
  onToggle,
  onDelete,
  onCancel,
  onReorder,
  onChangeCategory,
  onChangeImportance,
  onAdd,
  onAddCategory
}) => {
  // Счетчики для статистики
  const completedCount = todos.filter(t => t.status === TodoStatus.COMPLETED).length;
  const activeCount = todos.filter(t => t.status === TodoStatus.ACTIVE).length;
  const cancelledCount = todos.filter(t => t.status === TodoStatus.CANCELLED).length;
  
  return (
    <div className="space-y-8">
      <section>
        <h2 className="heading-md">Новая задача</h2>
        <TodoForm 
          onAdd={onAdd} 
          categories={categories} 
          onAddCategory={onAddCategory}
        />
      </section>
      
      <section className="pt-4">
        <h2 className="heading-lg">Текущие задачи</h2>
        
        <div className="card">
          <div className="card-content">
            <div className="card-header">
              <h3 className="heading-md mb-0">Все задачи</h3>
              <div className="text-secondary">
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
              onAddCategory={onAddCategory}
            />
          </div>
        </div>
      </section>
      
      <section className="pt-2">
        <h3 className="heading-md">Общая статистика</h3>
        <div className="responsive-grid">
          <div className="card p-5 flex flex-col items-center">
            <div className="text-3xl font-normal text-green-600 mb-1">
              {completedCount}
            </div>
            <div className="text-secondary">Выполненные задачи</div>
          </div>
          <div className="card p-5 flex flex-col items-center">
            <div className="text-3xl font-normal text-gray-600 mb-1">
              {activeCount}
            </div>
            <div className="text-secondary">Активные задачи</div>
          </div>
          <div className="card p-5 flex flex-col items-center">
            <div className="text-3xl font-normal text-gray-500 mb-1">
              {cancelledCount}
            </div>
            <div className="text-secondary">Отмененные задачи</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TasksList; 