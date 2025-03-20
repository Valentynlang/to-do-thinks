import { Todo as TodoType } from '../App'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: TodoType[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No tasks yet. Add one above!
      </div>
    )
  }

  return (
    <ul className="divide-y divide-gray-200">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList 