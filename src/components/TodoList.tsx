import { Todo as TodoType } from '../App'
import TodoItem from './TodoItem'
import { useState } from 'react'

interface TodoListProps {
  todos: TodoType[]
  categories: string[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onReorder: (sourceIndex: number, destinationIndex: number, categoryName: string) => void
  onChangeCategory: (id: number, newCategory: string) => void
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  categories,
  onToggle, 
  onDelete,
  onReorder,
  onChangeCategory
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    categories.reduce((acc, category) => ({ ...acc, [category]: true }), {})
  );
  
  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category]
    });
  };
  
  // Helper function to get todos for a specific category
  const getTodosByCategory = (category: string) => {
    return todos.filter(todo => todo.category === category);
  };
  
  // Function to handle drag start
  const handleDragStart = (e: React.DragEvent, todoId: number, category: string, index: number) => {
    e.dataTransfer.setData('todoId', todoId.toString());
    e.dataTransfer.setData('sourceCategory', category);
    e.dataTransfer.setData('sourceIndex', index.toString());
  };
  
  // Function to handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  // Function to handle drop
  const handleDrop = (e: React.DragEvent, targetCategory: string, targetIndex: number) => {
    e.preventDefault();
    const todoId = parseInt(e.dataTransfer.getData('todoId'));
    const sourceCategory = e.dataTransfer.getData('sourceCategory');
    const sourceIndex = parseInt(e.dataTransfer.getData('sourceIndex'));
    
    // If dropping in the same category, reorder
    if (sourceCategory === targetCategory) {
      onReorder(sourceIndex, targetIndex, targetCategory);
    } else {
      // If dropping in a different category, change category
      onChangeCategory(todoId, targetCategory);
    }
  };

  if (todos.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        Задач пока нет. Добавьте что-нибудь выше!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {categories.map(category => {
        const categoryTodos = getTodosByCategory(category);
        if (categoryTodos.length === 0) return null;
        
        return (
          <div key={category} className="border rounded-lg overflow-hidden">
            <div 
              className="bg-indigo-50 px-4 py-2 flex justify-between items-center cursor-pointer"
              onClick={() => toggleCategory(category)}
            >
              <h3 className="font-medium text-indigo-700">{category}</h3>
              <span className="text-indigo-700">
                {expandedCategories[category] ? '▼' : '►'}
              </span>
            </div>
            
            {expandedCategories[category] && (
              <ul className="divide-y divide-gray-200">
                {categoryTodos.map((todo, index) => (
                  <li 
                    key={todo.id}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, todo.id, category, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, category, index)}
                    className="cursor-move"
                  >
                    <TodoItem
                      todo={todo}
                      onToggle={onToggle}
                      onDelete={onDelete}
                    />
                  </li>
                ))}
                <li 
                  className="h-8 bg-gray-50 opacity-50 flex items-center justify-center text-sm text-gray-400"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, category, categoryTodos.length)}
                >
                  Перетащите сюда
                </li>
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TodoList 