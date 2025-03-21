import React, { useState } from 'react';
import { TodoListProps } from '../types/components';
import { TodoItem } from './TodoItem';
import { TodoStatus } from '../types/Todo';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';

export const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  categories, 
  onToggle, 
  onDelete, 
  onCancel,
  onReorder,
  onChangeCategory,
  onChangeImportance,
  onAddCategory
}) => {
  // Состояние для отслеживания раскрытых категорий
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    categories.reduce((acc, category) => ({...acc, [category]: true}), {})
  );
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Функция для переключения видимости категории
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Получение задач по категории, исключая отмененные задачи
  const getTodosByCategory = (categoryName: string) => {
    return todos.filter(todo => 
      todo.category === categoryName && 
      todo.status !== TodoStatus.CANCELLED
    );
  };

  // Обработчик перетаскивания задач
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    
    // Если перетаскивание отменено или место назначения отсутствует
    if (!destination) {
      return;
    }

    // Если перетаскивание происходит в той же категории
    if (source.droppableId === destination.droppableId) {
      onReorder(source.index, destination.index, source.droppableId);
    } 
    // Если перетаскивание между разными категориями
    else {
      const todoId = parseInt(result.draggableId);
      onChangeCategory(todoId, destination.droppableId);
    }
  };

  // Обработчик добавления новой категории
  const handleAddNewCategory = () => {
    const trimmedName = newCategoryName.trim();
    if (trimmedName && !categories.includes(trimmedName)) {
      if (onAddCategory && onAddCategory(trimmedName)) {
        // Если категория успешно добавлена, обновляем состояние
        setExpandedCategories(prev => ({
          ...prev,
          [trimmedName]: true
        }));
        // Сбрасываем поле ввода, но не скрываем форму
        setNewCategoryName('');
        // Не скрываем форму после добавления
        // setShowNewCategoryInput(false);
      }
    }
  };

  // Фильтрация активных задач
  const activeTodos = todos.filter(todo => todo.status !== TodoStatus.CANCELLED);

  // Вычисляем категории, которые имеют хотя бы одну активную задачу
  const activeCategories = categories.filter(cat => 
    getTodosByCategory(cat).length > 0
  );

  if (activeTodos.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-200 rounded-xl text-gray-500">
        Нет активных задач. Добавьте новую задачу!
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="space-y-4 mt-4">
        {categories.map(category => {
          const categoryTodos = getTodosByCategory(category);
          if (categoryTodos.length === 0) return null;
          
          return (
            <div key={category} className="card overflow-hidden">
              <div 
                className="category-header"
                onClick={() => toggleCategory(category)}
              >
                <h3 className="font-medium text-gray-600">
                  <span className={`inline-block w-2 h-2 mr-2 rounded-full ${
                    categoryTodos.length > 0 ? 'bg-green-500' : 'bg-gray-300'
                  }`}></span>
                  {category} <span className="text-sm text-gray-400">({categoryTodos.length})</span>
                </h3>
                <span className="text-gray-400 text-sm">
                  {expandedCategories[category] ? '▼' : '►'}
                </span>
              </div>
              
              {expandedCategories[category] && (
                <Droppable droppableId={category}>
                  {(provided: DroppableProvided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="divide-y divide-gray-100"
                    >
                      {categoryTodos.map((todo, index) => (
                        <Draggable 
                          key={todo.id.toString()} 
                          draggableId={todo.id.toString()} 
                          index={index}
                        >
                          {(provided: DraggableProvided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="cursor-move"
                            >
                              <TodoItem 
                                todo={todo} 
                                onToggle={onToggle} 
                                onDelete={onDelete}
                                onCancel={onCancel}
                                onChangeImportance={onChangeImportance}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
            </div>
          );
        })}

        {onAddCategory && (
          <div className="mt-4">
            <div className="card">
              <div className="p-4">
                <h3 className="font-medium text-gray-600 mb-3">Управление категориями</h3>
                
                {!showNewCategoryInput ? (
                  <button
                    type="button"
                    className="px-4 py-2 w-full text-center rounded border border-green-200 text-green-600 hover:bg-green-50 transition-colors"
                    onClick={() => setShowNewCategoryInput(true)}
                  >
                    + Добавить новую категорию
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Название категории"
                        className="input flex-1 py-2"
                        autoFocus
                      />
                      <button
                        type="button"
                        className="btn-primary h-full py-2 px-4"
                        onClick={handleAddNewCategory}
                      >
                        Добавить
                      </button>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">
                        {activeCategories.length > 0 ? 
                          `Активные категории: ${activeCategories.length}` : 
                          'Нет активных категорий'
                        }
                      </div>
                      <button
                        type="button"
                        className="text-sm text-gray-500 underline hover:text-gray-700"
                        onClick={() => {
                          setNewCategoryName('');
                          setShowNewCategoryInput(false);
                        }}
                      >
                        Скрыть форму
                      </button>
                    </div>
                    
                    <div className="text-xs text-gray-400 mt-1">
                      * Пустые категории не отображаются в списке до добавления задач
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DragDropContext>
  );
}; 