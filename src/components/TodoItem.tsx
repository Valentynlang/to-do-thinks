import { useSwipeable } from 'react-swipeable'
import { useState } from 'react'
import { TodoItemProps } from '../types'

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset the swipe state after animation completes
  const handleTransitionEnd = () => {
    if (isDeleting) {
      onDelete(todo.id);
    }
  };

  // Setup swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setIsDeleting(true);
    },
    onSwipedRight: () => {
      onToggle(todo.id);
    },
    trackMouse: true
  });

  return (
    <div 
      {...swipeHandlers} 
      className={`relative transition-transform duration-300 ${isDeleting ? 'translate-x-[-100%]' : ''}`}
      onTransitionEnd={handleTransitionEnd}
    >
      {/* Main content */}
      <div className="py-4 px-4 bg-white flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <div className="ml-3">
            <span 
              className={`${
                todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
              }`}
            >
              {todo.text}
            </span>
            <p className="text-xs text-gray-500 mt-1">
              {todo.category}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsDeleting(true)}
          className="text-red-500 hover:text-red-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      

    </div>
  )
}

export default TodoItem 