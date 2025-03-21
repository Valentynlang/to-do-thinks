import TodoList from './TodoList';
import { TasksSectionProps } from '../types';
import TodoForm from './TodoForm';


const TasksSection: React.FC<TasksSectionProps> = ({
  todos,
  categories,
  onToggle,
  onDelete,
  onReorder,
  onChangeCategory,
  onAdd
}) => { 
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
        <TodoForm onAdd={onAdd} />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Ваши задачи</h2>
          <div className="text-sm text-gray-500">
            Всего: {todos.length} | Выполнено: {todos.filter(t => t.completed).length}
          </div>
        </div>
        
        <div className="mb-4 bg-blue-50 p-3 rounded text-sm text-blue-700">
          <p className="font-medium">Подсказка:</p>
          <ul className="list-disc list-inside mt-1">
            <li>Свайп вправо - отметить выполненной</li>
            <li>Свайп влево - удалить задачу</li>
            <li>Перетаскивайте задачи для изменения порядка</li>
          </ul>
        </div>
        
        <TodoList 
          todos={todos} 
          categories={categories}
          onToggle={onToggle} 
          onDelete={onDelete}
          onReorder={onReorder}
          onChangeCategory={onChangeCategory}
        />
      </div>
    </div>
  );
};

export default TasksSection; 