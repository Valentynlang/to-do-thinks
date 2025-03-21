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
  onChangeImportance
}) => {
  // Состояние для отслеживания раскрытых категорий
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    categories.reduce((acc, category) => ({...acc, [category]: true}), {})
  );

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

  // Фильтрация активных задач
  const activeTodos = todos.filter(todo => todo.status !== TodoStatus.CANCELLED);

  if (activeTodos.length === 0) {
    return (
      <div className="text-center py-6 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-gray-500">
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
            <div key={category} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div 
                className="bg-gray-100 px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                <h3 className="font-medium text-gray-700">{category} ({categoryTodos.length})</h3>
                <span className="text-gray-500 text-xs">
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
      </div>
    </DragDropContext>
  );
}; 